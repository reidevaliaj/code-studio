"""Isolated receptionists with private call history and optional local audio recording."""

import asyncio
import contextlib
import json
import logging
import os
import time
from pathlib import Path

import httpx
from livekit.agents import Agent, AgentServer, AgentSession, AutoSubscribe, JobContext, cli
from livekit.plugins import openai, silero
from openai.types.realtime import AudioTranscription, RealtimeReasoning

from call_lifecycle import CallLifecycle
from greetings import greeting_audio
from recording import start_recording

API_URL = os.getenv("DEMO_INTERNAL_URL", "http://127.0.0.1:8011")
server = AgentServer(
    host="127.0.0.1",
    port=int(os.getenv("DEMO_WORKER_PORT", "8091")),
    num_idle_processes=1,
    load_threshold=0.8,
    job_memory_warn_mb=350,
    job_memory_limit_mb=600,
    log_level="WARN",
    shutdown_process_timeout=40,
    session_end_timeout=30,
)


def prewarm(proc):
    proc.userdata["vad"] = silero.VAD.load(
        activation_threshold=0.65,
        min_speech_duration=0.12,
        min_silence_duration=0.6,
        prefix_padding_duration=0.3,
    )


server.setup_fnc = prewarm


async def call(action, data):
    async with httpx.AsyncClient(timeout=10) as client:
        result = await client.post(
            API_URL + "/internal/" + action,
            json=data,
            headers={"Authorization": "Bearer " + os.environ["DEMO_WORKER_KEY"]},
        )
        result.raise_for_status()
        return result.json()


async def on_session_end(ctx):
    runtime = ctx.proc.userdata.pop("codst_call", None)
    if runtime:
        await runtime.finalize()


@server.rtc_session(
    agent_name=os.getenv("DEMO_AGENT_NAME", "codst-demo-agent"), on_session_end=on_session_end
)
async def demo(ctx: JobContext):
    session_id = ""
    session = None
    monitor = None
    runtime = None

    async def cleanup():
        if session_id:
            with contextlib.suppress(Exception):
                await call(
                    "end",
                    {"id": session_id, "reason": runtime.reason if runtime else "connection_error"},
                )

    ctx.add_shutdown_callback(cleanup)
    try:
        metadata = json.loads(ctx.job.metadata or "{}")
        session_id = metadata.get("session_id", "")
        await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)
        participant = await asyncio.wait_for(ctx.wait_for_participant(), timeout=30)
        if metadata.get("transport") == "sip":
            session_id = participant.attributes.get("demo.session", "")
        config = await call("claim", {"id": session_id, "room": ctx.room.name})
        llm = openai.realtime.RealtimeModel(
            model="gpt-realtime-2.1-mini",
            voice="marin",
            input_audio_transcription=AudioTranscription(model="gpt-transcribe", language="de")
            if config.get("transcripts_enabled", True)
            else None,
            tracing=None,
            max_session_duration=180,
            reasoning=RealtimeReasoning(effort="low"),
            # Provider-side turn detection bypasses the SDK's interruption
            # duration gate. Let local speech detection own both boundaries.
            turn_detection=None,
        )
        session = AgentSession(
            llm=llm,
            vad=ctx.proc.userdata["vad"],
            # The browser already enables echo cancellation. The SDK's default
            # 3-second warmup otherwise drops the start of an early correction.
            aec_warmup_duration=0.75,
            session_close_transcript_timeout=3.0,
            turn_handling={
                "turn_detection": "vad",
                "endpointing": {"min_delay": 0.6, "max_delay": 3.0},
                "interruption": {
                    "enabled": True,
                    "mode": "vad",
                    "min_duration": 0.65,
                    "resume_false_interruption": True,
                    "false_interruption_timeout": 2.0,
                },
                "preemptive_generation": {"enabled": False},
            },
        )
        directory = os.getenv(
            "DEMO_DATA_DIR",
            str(Path(os.getenv("DEMO_DATABASE", "/home/rei/apps/codst-demo/data/queue.db")).parent),
        )
        runtime = CallLifecycle(
            session_id, session, call, directory, config.get("transcripts_enabled", True)
        )
        ctx.proc.userdata["codst_call"] = runtime
        ended = asyncio.Event()

        @session.on("conversation_item_added")
        def conversation_item(_event):
            runtime.checkpoint()

        @session.on("close")
        def closed(_event):
            ended.set()

        @session.on("error")
        def error(event):
            logging.getLogger("codst.demo").warning(
                "Demo model error: %s", type(event.error).__name__
            )
            if not getattr(event.error, "recoverable", False):
                runtime.reason = "connection_error"
                ended.set()

        if os.getenv("DEMO_TEST_DIAGNOSTICS") == "1":

            @session.on("user_state_changed")
            def user_state(event):
                logging.getLogger("codst.demo").warning(
                    "Synthetic test caller state: %s", event.new_state
                )

            @session.on("agent_state_changed")
            def agent_state(event):
                logging.getLogger("codst.demo").warning(
                    "Synthetic test assistant state: %s", event.new_state
                )

        @ctx.room.on("participant_disconnected")
        def disconnected(p):
            if p.identity == participant.identity:
                runtime.reason = "visitor_disconnected"
                ended.set()

        async def watchdog():
            deadline = config["deadline"]
            last_ping = time.monotonic()
            while time.time() < deadline:
                await asyncio.sleep(min(1, max(0, deadline - time.time())))
                if time.monotonic() - last_ping >= 10:
                    try:
                        await asyncio.wait_for(
                            call("ping", {"id": session_id}),
                            timeout=min(5, max(0.1, deadline - time.time())),
                        )
                        last_ping = time.monotonic()
                    except Exception:  # noqa: BLE001 - fail closed if the admission lease cannot be renewed
                        runtime.reason = "worker_timeout"
                        ended.set()
                        return
            runtime.reason = "duration_limit"
            ended.set()

        await session.start(
            room=ctx.room, agent=Agent(instructions=config["instructions"]), record=False
        )
        try:
            runtime.recorder = await start_recording(
                session, session_id, directory, config.get("record_audio", False)
            )
        except Exception:  # noqa: BLE001 - recording failure is reported without disrupting the conversation
            runtime.recording_failed = True
            logging.getLogger("codst.demo").warning("Private audio recording could not start")
        monitor = asyncio.create_task(watchdog())
        session.say(
            config["greeting"], audio=greeting_audio(config["profile"]), allow_interruptions=True
        )
        await ended.wait()
    except Exception as exc:  # noqa: BLE001 - contain all failures within the isolated demo job
        logging.getLogger("codst.demo").warning("Demo session failed: %s", type(exc).__name__)
    finally:
        if monitor:
            monitor.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await monitor
        if session:
            with contextlib.suppress(Exception):
                await session.aclose()
        await cleanup()
        ctx.shutdown(reason="demo ended")


if __name__ == "__main__":
    cli.run_app(server)
