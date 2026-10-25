import wave
from pathlib import Path

import pytest

from greetings import greeting_audio
from profiles import PROFILES


@pytest.mark.asyncio
async def test_fixed_greetings_decode_fully_and_fit_a_short_introduction():
    for profile_id in PROFILES:
        path = Path(__file__).parents[1] / "assets" / (profile_id + ".wav")
        with wave.open(str(path), "rb") as audio:
            expected = audio.getnframes()
            assert 1 < expected / audio.getframerate() < 9
        frames = [frame async for frame in greeting_audio(profile_id)]
        assert sum(frame.samples_per_channel for frame in frames) == expected
        assert all(frame.num_channels == 1 for frame in frames)
