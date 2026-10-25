"""Optional private stereo Opus recording using the pinned SDK's audio IO recorder."""

import asyncio
import os
import re
from pathlib import Path

from livekit.agents.voice.recorder_io import RecorderIO


async def start_recording(session, session_id, directory, enabled):
    if not enabled:
        return None
    if not re.fullmatch(r"[A-Za-z0-9_-]{20,64}", session_id):
        raise ValueError("Invalid call ID")
    root = Path(directory) / "recordings"
    root.mkdir(parents=True, exist_ok=True, mode=0o700)
    path = root / (session_id + ".ogg")
    # Reserve with private permissions before the encoder opens the file.
    fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    os.close(fd)
    recorder = RecorderIO(agent_session=session, sample_rate=24000)
    session.input.audio = recorder.record_input(session.input.audio)
    session.output.audio = recorder.record_output(session.output.audio)
    await recorder.start(output_path=path)
    return recorder


async def close_recording(recorder):
    if recorder is None:
        return "disabled"
    try:
        await asyncio.wait_for(recorder.aclose(), timeout=8)
        path = recorder.output_path
        return "recorded" if path and path.is_file() and path.stat().st_size > 100 else "failed"
    except (OSError, TimeoutError, RuntimeError):
        return "failed"
