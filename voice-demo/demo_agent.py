"""Dedicated public-demo worker. No business-action tools, recordings, or transcript storage."""

import asyncio
import contextlib
import json
import logging
import os

import httpx
from livekit.agents import Agent, AgentServer, AgentSession, AutoSubscribe, JobContext, cli
from livekit.plugins import openai
from openai.types.realtime import RealtimeReasoning
from openai.types.realtime.realtime_audio_input_turn_detection import SemanticVad

API_URL = os.getenv("DEMO_INTERNAL_URL", "http://127.0.0.1:8011")
server = AgentServer(
    host="127.0.0.1",
    port=8091,
    num_idle_processes=1,
    load_threshold=0.8,
    job_memory_warn_mb=350,
    job_memory_limit_mb=600,
    log_level="WARN",
)


async def call(action, data):
    async with httpx.AsyncClient(timeout=10) as client:
        result = await client.post(
            API_URL + "/internal/" + action,
            json=data,
            headers={"Authorization": "Bearer " + os.environ["DEMO_WORKER_KEY"]},
        )
        result.raise_for_status()
        return result.json()


@server.rtc_session(agent_name="codst-demo-agent")
async def demo(ctx: JobContext):
    session_id = ""
    session = None
    monitor = None

    async def cleanup():
        if session_id:
            with contextlib.suppress(Exception):
                await call("end", {"id": session_id})

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
            input_audio_transcription=None,
            tracing=None,
            max_session_duration=180,
            reasoning=RealtimeReasoning(effort="low"),
            turn_detection=SemanticVad(
                type="semantic_vad", eagerness="high", create_response=True, interrupt_response=True
            ),
        )
        session = AgentSession(
            llm=llm,
            turn_handling={
                "turn_detection": "realtime_llm",
                "interruption": {
                    "enabled": True,
                    "resume_false_interruption": True,
                    "false_interruption_timeout": 2.0,
                },
                "preemptive_generation": {"enabled": False},
            },
        )
        ended = asyncio.Event()

        @session.on("close")
        def closed(_event):
            ended.set()

        @session.on("error")
        def error(event):
            logging.getLogger("codst.demo").warning(
                "Demo model error: %s", type(event.error).__name__
            )
            if not getattr(event.error, "recoverable", False):
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
                ended.set()

        async def watchdog():
            for second in range(1, 181):
                await asyncio.sleep(1)
                if second % 10 == 0:
                    try:
                        await call("ping", {"id": session_id})
                    except Exception:  # noqa: BLE001 - fail closed if the admission lease cannot be renewed
                        ended.set()
                        return
                if second == 160:
                    session.generate_reply(
                        instructions="Sage kurz: Unsere Demo endet in etwa zwanzig Sekunden. Für eine persönliche Beratung nutzen Sie gerne das Formular auf der Website."
                    )
            ended.set()

        await session.start(
            room=ctx.room, agent=Agent(instructions=config["instructions"]), record=False
        )
        monitor = asyncio.create_task(watchdog())
        session.generate_reply(
            instructions="Begrüße den Besucher mit genau diesem Text: " + config["greeting"]
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
