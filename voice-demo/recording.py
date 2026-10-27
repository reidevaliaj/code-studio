"""Private stereo recording with a playable MP3 for each completed call."""

import asyncio
import os
import re
from pathlib import Path

import av
from livekit.agents.voice.recorder_io import RecorderIO


def convert_recording(path):
    """Keep the original private audio and atomically publish its stereo MP3."""
    target = path.with_suffix(".mp3")
    temporary = target.with_suffix(".mp3.part")
    fd = os.open(temporary, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    os.close(fd)
    try:
        with av.open(str(path)) as source, av.open(str(temporary), "w", format="mp3") as output:
            stream = output.add_stream("libmp3lame", rate=24000)
            stream.layout = "stereo"
            stream.bit_rate = 96000
            resampler = av.AudioResampler(format="fltp", layout="stereo", rate=24000)
            for frame in source.decode(audio=0):
                for samples in resampler.resample(frame):
                    samples.pts = None
                    for packet in stream.encode(samples):
                        output.mux(packet)
            for samples in resampler.resample(None):
                samples.pts = None
                for packet in stream.encode(samples):
                    output.mux(packet)
            for packet in stream.encode(None):
                output.mux(packet)
        with av.open(str(temporary)) as check:
            if next(check.decode(audio=0), None) is None:
                raise ValueError("Empty MP3 recording")
        temporary.replace(target)
        return target
    finally:
        temporary.unlink(missing_ok=True)


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
        if not path or not path.is_file() or path.stat().st_size <= 100:
            return "failed"
        await asyncio.wait_for(asyncio.to_thread(convert_recording, path), timeout=12)
        return "recorded"
    except (OSError, TimeoutError, RuntimeError, ValueError, av.FFmpegError):
        return "failed"
