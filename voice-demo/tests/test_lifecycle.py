import json
from types import SimpleNamespace

import pytest

from call_lifecycle import CallLifecycle
from recording import start_recording


@pytest.mark.asyncio
async def test_finalization_saves_both_speakers_and_spools_failed_delivery(tmp_path):
    messages = [
        SimpleNamespace(
            id="a", role="user", text_content="Guten Tag", created_at=1, interrupted=False
        ),
        SimpleNamespace(
            id="b", role="assistant", text_content="Hallo!", created_at=2, interrupted=True
        ),
        SimpleNamespace(
            id="c", role="system", text_content="secret", created_at=0, interrupted=False
        ),
    ]
    session = SimpleNamespace(history=SimpleNamespace(messages=lambda: messages))

    async def unavailable(*args):
        raise OSError("unavailable")

    lifecycle = CallLifecycle("a" * 32, session, unavailable, tmp_path)
    lifecycle.reason = "close_button"
    await lifecycle.finalize()
    await lifecycle.finalize()
    paths = list((tmp_path / "spool").glob("*.json"))
    assert len(paths) == 1
    saved = json.loads(paths[0].read_text())
    assert len(saved["messages"]) == 2
    assert saved["messages"][1]["interrupted"] is True
    assert saved["audio_status"] == "disabled"


@pytest.mark.asyncio
async def test_disabled_audio_creates_no_file_and_path_traversal_is_rejected(tmp_path):
    assert await start_recording(None, "a" * 32, tmp_path, False) is None
    assert list(tmp_path.iterdir()) == []
    with pytest.raises(ValueError):
        await start_recording(None, "../secret", tmp_path, True)
