import json

import pytest

from admission import Admission
from reports import Reports, format_email


def connected(store, client="a"):
    store.join(client, client, "physio")
    row = store.connect(client)
    return store.claim(row["id"], row["room"])


def test_calls_are_registered_before_any_transcript_and_duplicate_end_is_safe(tmp_path):
    store = Admission(tmp_path / "queue.db")
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    reports.start(row)
    messages = [{"id": "a", "role": "user", "text": "Wann öffnen Sie?", "created_at": 1}]
    reports.checkpoint(row["id"], messages)
    reports.finish(row["id"], messages, "close_button")
    reports.finish(row["id"], [], "worker_shutdown")
    saved = reports.get(row["id"])
    assert saved["messages"] == messages
    assert saved["reason"] == "close_button"
    assert saved["status"] == "ended"
    assert len(reports.due("email")) == 1


def test_reports_reject_nonparticipant_content_and_unknown_sessions(tmp_path):
    store = Admission(tmp_path / "queue.db")
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    with pytest.raises(ValueError):
        reports.checkpoint(row["id"], [{"role": "system", "text": "secret"}])
    with pytest.raises(ValueError):
        reports.finish("unknown", [], "close_button")


def test_worker_crash_preserves_partial_transcript_and_queues_history(tmp_path):
    now = [1000]
    store = Admission(tmp_path / "queue.db", clock=lambda: now[0])
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    reports.checkpoint(row["id"], [{"role": "assistant", "text": "Hallo!"}])
    now[0] += 40
    store.cleanup_rooms()
    store.finish_cleanup(row["id"])
    now[0] += 20
    reports.reconcile()
    saved = reports.get(row["id"])
    assert saved["status"] == "ended"
    assert saved["messages"][0]["text"] == "Hallo!"
    assert len(reports.due("mirror")) == 1


def test_email_outbox_acknowledges_provider_once_and_retains_failed_attempts(tmp_path):
    store = Admission(tmp_path / "queue.db")
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    reports.finish(row["id"], [], "duration_limit")
    reports.failed(row["id"], "email", "provider_unavailable")
    assert reports.get(row["id"])["email_state"] == "pending"
    assert reports.due("email") == []
    reports.sent(row["id"], "email", "provider-id")
    reports.finish(row["id"], [], "worker_shutdown")
    assert reports.get(row["id"])["email_state"] == "sent"
    assert reports.due("email") == []


def test_email_retries_use_the_exact_first_payload_even_if_report_changes(tmp_path):
    store = Admission(tmp_path / "queue.db")
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    first = {"to": ["info@cod-st.com"], "text": "Original transcript"}
    assert reports.email_payload(row["id"], first) == first
    assert reports.email_payload(row["id"], {"text": "Later change"}) == first
    reports.sent(row["id"], "email", "provider-id")
    reports.finish(row["id"], [], "worker_shutdown")
    assert reports.get(row["id"])["email_state"] == "sent"
    assert reports.due("email") == []


def test_german_email_contains_full_conversation_and_never_invents_a_transcript(tmp_path):
    store = Admission(tmp_path / "queue.db")
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    reports.finish(
        row["id"],
        [
            {"role": "user", "text": "Wann öffnen Sie?"},
            {"role": "assistant", "text": "Ab acht Uhr."},
        ],
        "close_button",
    )
    payload = format_email(reports.get(row["id"]), "sender@example.invalid", tmp_path)
    assert payload["to"] == ["info@cod-st.com"]
    assert "Anrufer: Wann öffnen Sie?" in payload["text"]
    assert "Rezeption: Ab acht Uhr." in payload["text"]
    assert "attachments" not in payload


def test_legacy_metadata_import_never_fabricates_audio_or_sends_old_emails(tmp_path):
    store = Admission(tmp_path / "queue.db")
    row = connected(store)
    store.end_by_id(row["id"])
    store.finish_cleanup(row["id"])
    reports = Reports(store, tmp_path)
    reports.import_legacy()
    saved = reports.get(row["id"])
    assert saved["messages"] == []
    assert saved["legacy"]
    assert saved["email_state"] == "skipped"
    assert saved["audio_status"] == "not_captured"
    assert len(reports.due("mirror")) == 1


def test_spool_recovery_is_idempotent_and_no_report_endpoint_is_public(tmp_path):
    store = Admission(tmp_path / "queue.db")
    reports = Reports(store, tmp_path)
    row = connected(store)
    reports.start(row)
    spool = tmp_path / "spool"
    spool.mkdir()
    payload = {"id": row["id"], "messages": [{"role": "user", "text": "Hallo"}], "reason": "hangup"}
    (spool / (row["id"] + ".json")).write_text(json.dumps(payload))
    reports.recover_spool()
    assert reports.get(row["id"])["messages"][0]["text"] == "Hallo"
    assert list(spool.glob("*.json")) == []
