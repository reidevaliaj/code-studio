from pathlib import Path
from types import SimpleNamespace

import av
import numpy as np
import pytest

from recording import close_recording


@pytest.mark.asyncio
async def test_completed_recording_produces_private_playable_stereo_mp3(tmp_path):
    source = tmp_path / "call.ogg"
    rate = 24000
    t = np.arange(rate, dtype=np.float32) / rate
    samples = np.stack(
        (0.25 * np.sin(2 * np.pi * 440 * t), 0.25 * np.sin(2 * np.pi * 700 * t))
    ).astype(np.float32)
    with av.open(str(source), "w", format="ogg") as output:
        stream = output.add_stream("libopus", rate=rate)
        stream.layout = "stereo"
        frame = av.AudioFrame.from_ndarray(samples, format="fltp", layout="stereo")
        frame.sample_rate = rate
        for packet in stream.encode(frame):
            output.mux(packet)
        for packet in stream.encode(None):
            output.mux(packet)

    async def closed():
        pass

    recorder = SimpleNamespace(output_path=source, aclose=closed)
    assert await close_recording(recorder) == "recorded"
    mp3 = source.with_suffix(".mp3")
    assert mp3.is_file()
    assert mp3.stat().st_mode & 0o777 == 0o600
    assert source.is_file()
    assert not Path(str(mp3) + ".part").exists()
    with av.open(str(mp3)) as check:
        assert check.streams.audio[0].codec_context.name in {"mp3", "mp3float"}
        assert len(check.streams.audio[0].layout.channels) == 2
        decoded = np.concatenate([frame.to_ndarray() for frame in check.decode(audio=0)], axis=1)
    assert np.mean(decoded[0] ** 2) > 0.001
    assert np.mean(decoded[1] ** 2) > 0.001
    assert not np.allclose(decoded[0], decoded[1])


@pytest.mark.asyncio
async def test_broken_recording_reports_failure_instead_of_claiming_an_mp3(tmp_path):
    source = tmp_path / "broken.ogg"
    source.write_bytes(b"invalid" * 40)

    async def closed():
        pass

    assert await close_recording(SimpleNamespace(output_path=source, aclose=closed)) == "failed"
    assert not source.with_suffix(".mp3").exists()
