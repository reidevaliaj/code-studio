"""Transcript checkpoints and finalization; delivery never holds a voice slot open."""

import asyncio
import contextlib
import json
import logging
import os
from pathlib import Path

from recording import close_recording

log = logging.getLogger("codst.calls")


class CallLifecycle:
    def __init__(self, session_id, session, call, directory, transcripts_enabled=True):
        self.id, self.session, self.call = session_id, session, call
        self.directory = Path(directory)
        self.transcripts_enabled = transcripts_enabled
        self.reason = "worker_shutdown"
        self.recorder = None
        self.recording_failed = False
        self.lock = asyncio.Lock()
        self.tasks = set()
        self.finalized = False

    def messages(self):
        if not self.transcripts_enabled:
            return []
        return [
            {
                "id": m.id,
                "role": m.role,
                "text": m.text_content,
                "created_at": m.created_at,
                "interrupted": bool(m.interrupted),
            }
            for m in self.session.history.messages()
            if m.role in ("user", "assistant") and m.text_content
        ]

    def checkpoint(self):
        if self.finalized or not self.transcripts_enabled:
            return
        task = asyncio.create_task(self._checkpoint())
        self.tasks.add(task)
        task.add_done_callback(self.tasks.discard)

    async def _checkpoint(self):
        async with self.lock:
            try:
                await self.call("checkpoint", {"id": self.id, "messages": self.messages()})
            except Exception:  # noqa: BLE001 - final delivery and local spool recover transient checkpoint failures
                log.warning("Transcript checkpoint will be retried at shutdown")

    async def finalize(self):
        if self.finalized:
            return
        self.finalized = True
        for task in list(self.tasks):
            task.cancel()
        for task in list(self.tasks):
            with contextlib.suppress(asyncio.CancelledError):
                await task
        audio_status = "failed" if self.recording_failed else await close_recording(self.recorder)
        payload = {
            "id": self.id,
            "messages": self.messages(),
            "reason": self.reason,
            "audio_status": audio_status,
        }
        for attempt in range(2):
            try:
                async with asyncio.timeout(2.5):
                    await self.call("report", payload)
                return
            except Exception:  # noqa: BLE001 - keep a private recovery spool if the local gateway is unavailable
                if attempt == 0:
                    await asyncio.sleep(0.2)
        root = self.directory / "spool"
        root.mkdir(parents=True, exist_ok=True, mode=0o700)
        path = root / (self.id + ".json")
        temporary = path.with_suffix(".tmp")
        fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "w") as handle:
            json.dump(payload, handle, ensure_ascii=False)
        temporary.replace(path)
        log.warning("Call report retained in private recovery spool")
