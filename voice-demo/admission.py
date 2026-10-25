"""Durable two-slot FIFO admission. SQLite BEGIN IMMEDIATE serializes all writers."""

import contextlib
import secrets
import sqlite3
import time
from pathlib import Path

from profiles import PROFILES


class Denied(Exception):
    pass


class Admission:
    def __init__(self, path, clock=time.time, available=lambda: True):
        self.path = str(path)
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.clock, self.available = clock, available
        with self.db() as db:
            db.executescript("""
                PRAGMA journal_mode=WAL;
                CREATE TABLE IF NOT EXISTS sessions (
                    id TEXT PRIMARY KEY, client TEXT NOT NULL, ip TEXT NOT NULL,
                    profile TEXT NOT NULL, state TEXT NOT NULL, created REAL NOT NULL,
                    seen REAL NOT NULL, deadline REAL NOT NULL, room TEXT NOT NULL DEFAULT '',
                    connected REAL, worker_seen REAL, source TEXT NOT NULL DEFAULT 'browser',
                    ended_at REAL, end_reason TEXT NOT NULL DEFAULT '', room_pending INTEGER NOT NULL DEFAULT 0,
                    consent_version TEXT NOT NULL DEFAULT ''
                );
                CREATE INDEX IF NOT EXISTS sessions_client ON sessions(client, created);
                CREATE INDEX IF NOT EXISTS sessions_state ON sessions(state, created);
                CREATE TABLE IF NOT EXISTS limits (ip TEXT NOT NULL, at REAL NOT NULL);
                CREATE TABLE IF NOT EXISTS contact_limits (ip TEXT NOT NULL, at REAL NOT NULL);
            """)
            columns = {row[1] for row in db.execute("PRAGMA table_info(sessions)")}
            if "ended_at" not in columns:
                db.execute("ALTER TABLE sessions ADD COLUMN ended_at REAL")
            if "end_reason" not in columns:
                db.execute("ALTER TABLE sessions ADD COLUMN end_reason TEXT NOT NULL DEFAULT ''")
            if "room_pending" not in columns:
                db.execute(
                    "ALTER TABLE sessions ADD COLUMN room_pending INTEGER NOT NULL DEFAULT 0"
                )

            if "consent_version" not in columns:
                db.execute(
                    "ALTER TABLE sessions ADD COLUMN consent_version TEXT NOT NULL DEFAULT ''"
                )

    @contextlib.contextmanager
    def db(self):
        db = sqlite3.connect(self.path, timeout=15, isolation_level=None)
        db.row_factory = sqlite3.Row
        try:
            db.execute("BEGIN IMMEDIATE")
            yield db
            db.commit()
        except BaseException:
            db.rollback()
            raise
        finally:
            db.close()

    def _sweep(self, db, now):
        db.execute(
            "UPDATE sessions SET ended_at=?,end_reason=CASE WHEN state='active' AND deadline<=? THEN 'duration_limit' WHEN state='active' AND worker_seen<? THEN 'worker_timeout' ELSE 'browser_timeout' END,state=CASE WHEN room='' THEN 'ended' ELSE 'closing' END WHERE state IN ('reserved','connecting','active') AND (deadline<=? OR seen<? OR (state='active' AND worker_seen<?))",
            (now, now, now - 35, now, now - 45, now - 35),
        )
        db.execute(
            "UPDATE sessions SET state='ended',ended_at=?,end_reason='browser_timeout' WHERE state='waiting' AND seen<?",
            (now, now - 45),
        )
        db.execute("DELETE FROM sessions WHERE created<? AND state='ended'", (now - 86400,))
        db.execute("DELETE FROM limits WHERE at<?", (now - 600,))
        db.execute("DELETE FROM contact_limits WHERE at<?", (now - 3600,))
        self._promote(db, now)

    def _promote(self, db, now):
        if not self.available():
            return
        used = db.execute(
            "SELECT count(*) FROM sessions WHERE state IN ('reserved','connecting','active','closing')"
        ).fetchone()[0]
        for row in db.execute(
            "SELECT id FROM sessions WHERE state='waiting' ORDER BY created,rowid LIMIT ?",
            (max(0, 2 - used),),
        ).fetchall():
            db.execute(
                "UPDATE sessions SET state='reserved', deadline=? WHERE id=?", (now + 30, row["id"])
            )

    def _current(self, db, client):
        row = db.execute(
            "SELECT * FROM sessions WHERE client=? ORDER BY created DESC,rowid DESC LIMIT 1",
            (client,),
        ).fetchone()
        if row is None:
            raise Denied("Keine aktive Demo gefunden.")
        return row

    def _view(self, db, row):
        result = dict(row)
        result["position"] = (
            db.execute(
                "SELECT count(*) FROM sessions WHERE state='waiting' AND (created<? OR (created=? AND rowid<=(SELECT rowid FROM sessions WHERE id=?)))",
                (row["created"], row["created"], row["id"]),
            ).fetchone()[0]
            if row["state"] == "waiting"
            else 0
        )
        return result

    def join(self, client, ip, profile, source="browser", consent_version=""):
        if profile not in PROFILES or source not in ("browser", "sip"):
            raise Denied("Diese Demo ist nicht verfügbar.")
        now = self.clock()
        with self.db() as db:
            self._sweep(db, now)
            row = db.execute(
                "SELECT * FROM sessions WHERE client=? AND state!='ended' ORDER BY created DESC LIMIT 1",
                (client,),
            ).fetchone()
            if row:
                if row["profile"] != profile:
                    raise Denied("Bitte beenden Sie zuerst Ihre andere Demo-Sitzung.")
                return self._view(db, row)
            if db.execute("SELECT count(*) FROM limits WHERE ip=?", (ip,)).fetchone()[0] >= 6:
                raise Denied("Zu viele Versuche. Bitte versuchen Sie es in einigen Minuten erneut.")
            if (
                db.execute("SELECT count(*) FROM sessions WHERE state='waiting'").fetchone()[0]
                >= 10
            ):
                raise Denied("Die Warteschlange ist voll. Bitte versuchen Sie es später erneut.")
            db.execute("INSERT INTO limits VALUES (?,?)", (ip, now))
            db.execute(
                "INSERT INTO sessions(id,client,ip,profile,state,created,seen,deadline,source,consent_version) VALUES (?,?,?,?,?,?,?,?,?,?)",
                (
                    secrets.token_urlsafe(24),
                    client,
                    ip,
                    profile,
                    "waiting",
                    now,
                    now,
                    now + 45,
                    source,
                    consent_version,
                ),
            )
            self._promote(db, now)
            return self._view(db, self._current(db, client))

    def status(self, client):
        now = self.clock()
        with self.db() as db:
            self._sweep(db, now)
            row = self._current(db, client)
            if row["state"] not in ("ended", "closing"):
                db.execute("UPDATE sessions SET seen=? WHERE id=?", (now, row["id"]))
            return self._view(db, self._current(db, client))

    def connect(self, client):
        now = self.clock()
        with self.db() as db:
            self._sweep(db, now)
            row = self._current(db, client)
            if row["state"] in ("connecting", "active"):
                return dict(row, new=False)
            if row["state"] != "reserved" or not self.available():
                raise Denied("Die Leitung ist noch nicht bereit. Bitte warten Sie kurz.")
            room = "codst-demo-" + row["id"] if row["source"] == "browser" else ""
            db.execute(
                "UPDATE sessions SET state='connecting', room=?, seen=?, deadline=?,room_pending=? WHERE id=?",
                (room, now, now + 45, int(row["source"] == "browser"), row["id"]),
            )
            return dict(self._current(db, client), new=True)

    def claim(self, session_id, room):
        now = self.clock()
        with self.db() as db:
            self._sweep(db, now)
            row = db.execute("SELECT * FROM sessions WHERE id=?", (session_id,)).fetchone()
            if (
                row is None
                or row["state"] != "connecting"
                or (row["room"] and row["room"] != room)
                or not room.startswith("codst-demo-")
            ):
                raise Denied("Ungültige oder abgelaufene Demo-Sitzung.")
            db.execute(
                "UPDATE sessions SET state='active', room=?, connected=?, worker_seen=?, seen=?, deadline=?,room_pending=0 WHERE id=?",
                (room, now, now, now, now + 180, session_id),
            )
            return dict(db.execute("SELECT * FROM sessions WHERE id=?", (session_id,)).fetchone())

    def room_ready(self, session_id):
        with self.db() as db:
            db.execute("UPDATE sessions SET room_pending=0 WHERE id=?", (session_id,))

    def room_connectable(self, session_id):
        with self.db() as db:
            row = db.execute(
                "SELECT state,deadline FROM sessions WHERE id=?", (session_id,)
            ).fetchone()
            return (
                row is not None
                and row["state"] in ("connecting", "active")
                and row["deadline"] > self.clock()
            )

    def worker_ping(self, session_id):
        now = self.clock()
        with self.db() as db:
            self._sweep(db, now)
            row = db.execute("SELECT * FROM sessions WHERE id=?", (session_id,)).fetchone()
            if row is None or row["state"] != "active":
                raise Denied("Demo beendet.")
            db.execute(
                "UPDATE sessions SET worker_seen=?, seen=CASE WHEN source='sip' THEN ? ELSE seen END WHERE id=?",
                (now, now, session_id),
            )
            return dict(row)

    def cancel(self, client, session_id=None, reason="hangup"):
        with self.db() as db:
            row = (
                db.execute(
                    "SELECT * FROM sessions WHERE client=? AND id=?", (client, session_id)
                ).fetchone()
                if session_id
                else self._current(db, client)
            )
            if row is None:
                return
            db.execute(
                "UPDATE sessions SET state=CASE WHEN room='' THEN 'ended' ELSE 'closing' END,ended_at=?,end_reason=? WHERE id=? AND state NOT IN ('ended','closing')",
                (self.clock(), reason, row["id"]),
            )
            self._promote(db, self.clock())

    def end_by_id(self, session_id, reason="worker_shutdown"):
        with self.db() as db:
            db.execute(
                "UPDATE sessions SET state=CASE WHEN room='' THEN 'ended' ELSE 'closing' END,ended_at=?,end_reason=? WHERE id=? AND state NOT IN ('ended','closing')",
                (self.clock(), reason, session_id),
            )

    def cleanup_rooms(self):
        with self.db() as db:
            self._sweep(db, self.clock())
            return [
                dict(x)
                for x in db.execute(
                    "SELECT id,room FROM sessions WHERE state='closing' AND (room_pending=0 OR ended_at<?)",
                    (self.clock() - 30,),
                )
            ]

    def finish_cleanup(self, session_id):
        with self.db() as db:
            db.execute(
                "UPDATE sessions SET state='ended' WHERE id=? AND state='closing'", (session_id,)
            )
            self._promote(db, self.clock())

    def count_active(self):
        with self.db() as db:
            return db.execute(
                "SELECT count(*) FROM sessions WHERE state IN ('reserved','connecting','active','closing')"
            ).fetchone()[0]
