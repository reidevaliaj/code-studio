"""Private call history and durable, independently retryable delivery outboxes."""

import base64
import json
import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import httpx

from profiles import PROFILES

REASONS = {
    "close_button": "Telefonfenster geschlossen",
    "hangup": "Gespräch beendet",
    "pagehide": "Browserseite verlassen",
    "duration_limit": "Drei-Minuten-Limit erreicht",
    "visitor_disconnected": "Anrufer getrennt",
    "worker_timeout": "Verbindung zum Sprachdienst unterbrochen",
    "browser_timeout": "Verbindung zum Browser unterbrochen",
    "connection_error": "Verbindungsfehler",
    "worker_shutdown": "Sprachsitzung beendet",
    "legacy_metadata": "Historischer Anruf, nur Verbindungsdaten vorhanden",
}


def clean_messages(messages):
    if not isinstance(messages, list) or len(messages) > 500:
        raise ValueError("Invalid conversation")
    result = []
    total = 0
    for message in messages:
        if not isinstance(message, dict) or message.get("role") not in ("user", "assistant"):
            raise ValueError("Invalid speaker")
        if not isinstance(message.get("text"), str):
            raise TypeError("Invalid text")
        text = str(message.get("text", "")).strip()
        total += len(text)
        if total > 150000:
            raise ValueError("Conversation too long")
        if not text:
            continue
        result.append(
            {
                k: message[k]
                for k in ("id", "role", "text", "created_at", "interrupted")
                if k in message
            }
        )
    return result


class Reports:
    def __init__(self, store, directory):
        self.store, self.directory = store, Path(directory)
        self.directory.mkdir(parents=True, exist_ok=True, mode=0o700)
        with store.db() as db:
            db.executescript("""
                CREATE TABLE IF NOT EXISTS call_reports (
                  id TEXT PRIMARY KEY, profile TEXT NOT NULL, source TEXT NOT NULL,
                  room TEXT NOT NULL, started REAL NOT NULL, updated REAL NOT NULL,
                  ended REAL, status TEXT NOT NULL DEFAULT 'active', reason TEXT NOT NULL DEFAULT '',
                  messages TEXT NOT NULL DEFAULT '[]', legacy INTEGER NOT NULL DEFAULT 0,
                  audio_status TEXT NOT NULL DEFAULT 'disabled',
                  email_state TEXT NOT NULL DEFAULT 'pending', email_attempts INTEGER NOT NULL DEFAULT 0,
                  email_next REAL NOT NULL DEFAULT 0, email_receipt TEXT NOT NULL DEFAULT '',
                  mirror_state TEXT NOT NULL DEFAULT 'pending', mirror_attempts INTEGER NOT NULL DEFAULT 0,
                  mirror_next REAL NOT NULL DEFAULT 0, mirror_receipt TEXT NOT NULL DEFAULT ''
                  ,email_payload TEXT NOT NULL DEFAULT ''
                );
            """)
            if "email_payload" not in {r[1] for r in db.execute("PRAGMA table_info(call_reports)")}:
                db.execute(
                    "ALTER TABLE call_reports ADD COLUMN email_payload TEXT NOT NULL DEFAULT ''"
                )

    def start(self, row):
        with self.store.db() as db:
            db.execute(
                "INSERT OR IGNORE INTO call_reports(id,profile,source,room,started,updated) VALUES(?,?,?,?,?,?)",
                (
                    row["id"],
                    row["profile"],
                    row["source"],
                    row["room"],
                    row["connected"] or row["created"],
                    self.store.clock(),
                ),
            )

    def get(self, session_id):
        with self.store.db() as db:
            row = db.execute("SELECT * FROM call_reports WHERE id=?", (session_id,)).fetchone()
            if row is None:
                raise ValueError("Unknown call")
            result = dict(row)
            result["messages"] = json.loads(result["messages"])
            return result

    def checkpoint(self, session_id, messages):
        messages = clean_messages(messages)
        with self.store.db() as db:
            row = db.execute(
                "SELECT messages FROM call_reports WHERE id=?", (session_id,)
            ).fetchone()
            if row is None:
                raise ValueError("Unknown call")
            # History snapshots may finish out of order; never replace a longer transcript with a stale one.
            if sum(len(x.get("text", "")) for x in messages) >= sum(
                len(x.get("text", "")) for x in json.loads(row["messages"])
            ):
                db.execute(
                    "UPDATE call_reports SET messages=?,updated=? WHERE id=?",
                    (json.dumps(messages, ensure_ascii=False), self.store.clock(), session_id),
                )

    def finish(self, session_id, messages, reason="worker_shutdown", audio_status="disabled"):
        self.checkpoint(session_id, messages)
        with self.store.db() as db:
            row = db.execute(
                "SELECT end_reason,ended_at FROM sessions WHERE id=?", (session_id,)
            ).fetchone()
            reason = row["end_reason"] if row and row["end_reason"] else reason
            if reason not in REASONS:
                reason = "worker_shutdown"
            if messages:
                # Final drained history can shorten an interrupted assistant turn.
                db.execute(
                    "UPDATE call_reports SET messages=? WHERE id=?",
                    (json.dumps(clean_messages(messages), ensure_ascii=False), session_id),
                )
            db.execute(
                "UPDATE call_reports SET status='ended',ended=COALESCE(ended,?),reason=CASE WHEN reason='' THEN ? ELSE reason END,audio_status=?,updated=? WHERE id=?",
                (
                    (row["ended_at"] if row else None) or self.store.clock(),
                    reason,
                    audio_status,
                    self.store.clock(),
                    session_id,
                ),
            )

    def due(self, channel):
        if channel not in ("email", "mirror"):
            raise ValueError("Invalid channel")
        with self.store.db() as db:
            rows = db.execute(
                f"SELECT id FROM call_reports WHERE status='ended' AND {channel}_state='pending' AND {channel}_next<=? ORDER BY started LIMIT 10",
                (self.store.clock(),),
            ).fetchall()
        return [self.get(row["id"]) for row in rows]

    def sent(self, session_id, channel, receipt):
        if channel not in ("email", "mirror"):
            raise ValueError("Invalid channel")
        with self.store.db() as db:
            db.execute(
                f"UPDATE call_reports SET {channel}_state='sent',{channel}_receipt=? WHERE id=?",
                (str(receipt)[:150], session_id),
            )
            if channel == "email":
                db.execute("UPDATE call_reports SET email_payload='' WHERE id=?", (session_id,))

    def email_payload(self, session_id, payload):
        """Freeze the first attempted provider payload for safe idempotent retries."""
        with self.store.db() as db:
            row = db.execute(
                "SELECT email_payload FROM call_reports WHERE id=?", (session_id,)
            ).fetchone()
            if row is None:
                raise ValueError("Unknown call")
            if row[0]:
                return json.loads(row[0])
            db.execute(
                "UPDATE call_reports SET email_payload=? WHERE id=?",
                (json.dumps(payload, ensure_ascii=False), session_id),
            )
            return payload

    def failed(self, session_id, channel, _error):
        if channel not in ("email", "mirror"):
            raise ValueError("Invalid channel")
        with self.store.db() as db:
            row = db.execute(
                f"SELECT {channel}_attempts FROM call_reports WHERE id=?", (session_id,)
            ).fetchone()
            if row:
                delay = min(3600, 10 * 2 ** min(row[0], 9))
                db.execute(
                    f"UPDATE call_reports SET {channel}_attempts={channel}_attempts+1,{channel}_next=? WHERE id=?",
                    (self.store.clock() + delay, session_id),
                )

    def reconcile(self):
        now = self.store.clock()
        with self.store.db() as db:
            rows = db.execute(
                "SELECT r.id,r.messages,s.end_reason FROM call_reports r JOIN sessions s ON r.id=s.id WHERE r.status='active' AND s.state='ended' AND s.ended_at<?",
                (now - 15,),
            ).fetchall()
        for row in rows:
            self.finish(
                row["id"], json.loads(row["messages"]), row["end_reason"] or "worker_shutdown"
            )
        self.recover_spool()
        with self.store.db() as db:
            expired = [
                r[0]
                for r in db.execute(
                    "SELECT id FROM call_reports WHERE started<?", (now - 30 * 86400,)
                )
            ]
            for session_id in expired:
                self.audio_path(session_id).unlink(missing_ok=True)
            db.execute("DELETE FROM call_reports WHERE started<?", (now - 30 * 86400,))

    def import_legacy(self):
        with self.store.db() as db:
            rows = [
                dict(r)
                for r in db.execute(
                    "SELECT * FROM sessions WHERE connected IS NOT NULL AND state='ended'"
                )
            ]
        for row in rows:
            try:
                self.get(row["id"])
                continue
            except ValueError:
                pass
            self.start(row)
            self.finish(row["id"], [], "legacy_metadata", "not_captured")
            with self.store.db() as db:
                db.execute(
                    "UPDATE call_reports SET legacy=1,email_state='skipped',reason='legacy_metadata' WHERE id=?",
                    (row["id"],),
                )

    def audio_path(self, session_id):
        if not re.fullmatch(r"[A-Za-z0-9_-]{20,64}", session_id):
            raise ValueError("Invalid call ID")
        return self.directory / "recordings" / (session_id + ".ogg")

    def recover_spool(self):
        for path in (self.directory / "spool").glob("*.json"):
            if path.is_symlink():
                continue
            try:
                payload = json.loads(path.read_text())
                if payload["id"] != path.stem:
                    continue
                self.finish(
                    payload["id"],
                    payload["messages"],
                    payload.get("reason", "worker_shutdown"),
                    payload.get("audio_status", "disabled"),
                )
                path.unlink()
            except (ValueError, TypeError, KeyError, OSError):
                continue


def transcript_text(messages):
    return "\n\n".join(
        ("Anrufer: " if m["role"] == "user" else "Rezeption: ")
        + m["text"]
        + (" [unterbrochen]" if m.get("interrupted") else "")
        for m in messages
    )


def format_email(report, sender, directory):
    profile = PROFILES[report["profile"]]
    date = datetime.fromtimestamp(report["started"], ZoneInfo("Europe/Berlin")).strftime(
        "%d.%m.%Y %H:%M:%S %Z"
    )
    duration = max(0, round((report["ended"] or report["updated"]) - report["started"]))
    conversation = (
        transcript_text(report["messages"])
        or "Es liegt kein Gesprächstext vor (z. B. Stille, sehr kurzer Anruf oder Verbindungsabbruch)."
    )
    text = f"Praxis: {profile['business']}\nRezeption: {profile['assistant']}\nBeginn: {date}\nDauer: {duration} Sekunden\nQuelle: {report['source']}\nEnde: {REASONS.get(report['reason'], report['reason'])}\nAnruf-ID: {report['id']}\nAudio: {report['audio_status']}\n\nGESPRÄCHSVERLAUF\n\n{conversation}\n\nAutomatisch erstelltes Transkript; Erkennungsfehler sind möglich. Es wurde kein echter Praxistermin gebucht."
    payload = {
        "from": sender,
        "to": ["info@cod-st.com"],
        "subject": "Anrufprotokoll: " + profile["business"],
        "text": text,
    }
    path = Path(directory) / "recordings" / (report["id"] + ".ogg")
    if (
        report["audio_status"] == "recorded"
        and path.is_file()
        and not path.is_symlink()
        and path.stat().st_size <= 8 * 1024 * 1024
    ):
        payload["attachments"] = [
            {
                "filename": "Gespraech-" + report["id"] + ".ogg",
                "content": base64.b64encode(path.read_bytes()).decode(),
            }
        ]
    return payload


async def deliver_email(reports, report, env):
    payload = format_email(report, env["DEMO_MAIL_FROM"], reports.directory)
    if env.get("DEMO_EMAIL_TEST_MODE") == "1":
        payload["subject"] = "[Qualitätstest] " + payload["subject"]
    payload = reports.email_payload(report["id"], payload)
    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.post(
            "https://api.resend.com/emails",
            json=payload,
            headers={
                "Authorization": "Bearer " + env["RESEND_API_KEY"],
                "Idempotency-Key": "codst-call-" + report["id"],
            },
        )
        response.raise_for_status()
        receipt = response.json().get("id")
        if not receipt:
            raise ValueError("Provider did not acknowledge email")
    reports.sent(report["id"], "email", receipt)


async def mirror_history(reports, report, env):
    p = PROFILES[report["profile"]]
    headers = {"X-Agent-Token": env["DEMO_BACKEND_AGENT_TOKEN"]}
    async with httpx.AsyncClient(
        base_url="http://127.0.0.1:8000", headers=headers, timeout=8
    ) as client:
        response = await client.post(
            "/agent/session-config",
            json={
                "tenant_slug": p["slug"],
                "config_version": 1 if report["legacy"] else None,
                "room_name": report["room"],
                "caller_id": "Browser-Besucher"
                if report["source"] == "browser"
                else "Interner Anruf",
                "called_number": p["extension"],
                "call_sid": report["id"],
            },
        )
        response.raise_for_status()
        tenant_id = response.json()["tenant"]["id"]
        payload = {
            "tenant_id": tenant_id,
            "room_name": report["room"],
            "timestamp": int(report["started"]),
            "caller_id": "Browser-Besucher" if report["source"] == "browser" else "Interner Anruf",
            "call_type": "website_receptionist",
            "topic": p["business"],
            "notes": f"Ende: {REASONS.get(report['reason'], report['reason'])}\nAudio: {report['audio_status']}\n\n"
            + (transcript_text(report["messages"]) or "Kein Transkript vorhanden."),
            "name": "Website-Anrufer",
        }
        response = await client.post("/events/call-end", json=payload)
        response.raise_for_status()
        result = response.json()
        if result.get("accepted") is not True:
            raise ValueError("History not durably accepted")
    reports.sent(report["id"], "mirror", result["job_id"])
