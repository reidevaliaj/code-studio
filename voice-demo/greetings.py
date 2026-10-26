"""Play a verified, fixed greeting without asking the realtime model to improvise it."""

import wave
from pathlib import Path

from livekit import rtc


async def greeting_audio(profile_id):
    if profile_id not in {"physio", "dental", "general"}:
        raise ValueError("Invalid profile")
    with wave.open(str(Path(__file__).parent / "assets" / (profile_id + ".wav")), "rb") as audio:
        rate, channels = audio.getframerate(), audio.getnchannels()
        if audio.getsampwidth() != 2:
            raise ValueError("Unsupported greeting encoding")
        while chunk := audio.readframes(rate // 50):
            yield rtc.AudioFrame(
                data=chunk,
                sample_rate=rate,
                num_channels=channels,
                samples_per_channel=len(chunk) // (2 * channels),
            )
