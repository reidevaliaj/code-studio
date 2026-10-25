"""One-time generation of the three exact German greeting assets. No caller audio."""

import asyncio
import io
import os
import wave
from pathlib import Path

from dotenv import load_dotenv
from openai import AsyncOpenAI

from profiles import PROFILES


def normalize_wav(content):
    # Streaming WAV responses can retain an unbounded data-size sentinel in their header.
    with wave.open(io.BytesIO(content), "rb") as source:
        rate, channels, width = source.getframerate(), source.getnchannels(), source.getsampwidth()
        pcm = source.readframes(rate * 20)
    target = io.BytesIO()
    with wave.open(target, "wb") as audio:
        audio.setnchannels(channels)
        audio.setsampwidth(width)
        audio.setframerate(rate)
        audio.writeframes(pcm)
    return target.getvalue()


async def main():
    load_dotenv(os.getenv("DEMO_TEST_ENV", "/home/rei/apps/codst-demo/shared.env"))
    root = Path(__file__).resolve().parents[1] / "assets"
    root.mkdir(exist_ok=True)
    async with AsyncOpenAI() as client:
        for key, p in PROFILES.items():
            path = root / (key + ".wav")
            if path.exists():
                path.write_bytes(normalize_wav(path.read_bytes()))
                continue
            result = await client.audio.speech.create(
                model="gpt-4o-mini-tts",
                voice="marin",
                input=p["greeting"],
                instructions="Sprich natürliches, freundliches Deutsch wie eine ruhige Rezeptionistin am Telefon. Kurze, flüssige Begrüßung, keine zusätzliche Einleitung. Sprich Code-Studio als Code Studio aus.",
                response_format="wav",
            )
            path.write_bytes(normalize_wav(result.content))
            with wave.open(str(path), "rb") as audio:
                if audio.getsampwidth() != 2 or audio.getnframes() < 1000:
                    raise ValueError("Greeting audio invalid")
            print(key + ": fixed greeting generated")


if __name__ == "__main__":
    asyncio.run(main())
