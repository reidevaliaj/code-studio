"""Small isolated gateway. No production backend routes or customer data are exposed."""

import asyncio
import contextlib
import hmac
import json
import logging
import os
import re
import time
from contextlib import asynccontextmanager
from datetime import timedelta
from pathlib import Path

import httpx
import psutil
from aiohttp import ClientTimeout
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from livekit import api

from admission import Admission, Denied
from profiles import PROFILES, instructions
from reports import REASONS, Reports, deliver_email, mirror_history

log = logging.getLogger("codst.demo")
GATEWAY_KEY = os.environ["DEMO_GATEWAY_KEY"]
WORKER_KEY = os.environ["DEMO_WORKER_KEY"]
ready = False
CONSENT_VERSION = "2026-10-25-transcript-v1"
CALL_START_VERSION = "2026-10-27-direct-start-v1"
store = Admission(
    os.getenv("DEMO_DATABASE", "/home/rei/apps/codst-demo/data/queue.db"), available=lambda: ready
)
reports = Reports(store, os.getenv("DEMO_DATA_DIR", str(Path(store.path).parent)))


def auth(value, key):
    if not value or not hmac.compare_digest(value, "Bearer " + key):
        raise HTTPException(401, "Nicht autorisiert.")


def requested_start_version(body):
    if body.get("startRequested") is True:
        if body.get("startVersion") != CALL_START_VERSION:
            raise HTTPException(
                409, "Bitte laden Sie die Seite neu und starten Sie die Demo erneut."
            )
        return CALL_START_VERSION
    # Support already-open pages using the previous checkbox flow.
    if body.get("consent") is True:
        if body.get("consentVersion") != CONSENT_VERSION:
            raise HTTPException(
                409, "Bitte laden Sie die Seite neu und starten Sie die Demo erneut."
            )
        return CONSENT_VERSION
    raise HTTPException(400, "Bitte starten Sie die Demo über die Schaltfläche auf der Website.")


def public(row):
    result = {
        k: row.get(k)
        for k in ("id", "profile", "state", "position", "deadline", "connected", "end_reason")
    }
    # A duration computed by the server avoids dependence on the visitor's
    # wall clock. The browser only shortens its own monotonic hard deadline.
    result["remaining"] = (
        max(0, min(180, row["deadline"] - time.time()))
        if row.get("connected") is not None
        else None
    )
    return result


async def housekeeping():
    global ready
    while True:
        try:
            async with httpx.AsyncClient(timeout=3) as client:
                health = await client.get(
                    "http://127.0.0.1:" + os.getenv("DEMO_WORKER_PORT", "8091") + "/"
                )
            ready = (
                health.status_code == 200
                and psutil.virtual_memory().available > 512 * 1024 * 1024
                and os.getloadavg()[0] < (os.cpu_count() or 1) * 1.5
                and os.getenv("DEMO_ENABLED", "1") == "1"
            )
        except Exception:  # noqa: BLE001 - fail closed when worker/host health cannot be established
            ready = False
        for row in store.cleanup_rooms():
            try:
                async with api.LiveKitAPI(timeout=ClientTimeout(total=8)) as lk:
                    await lk.room.delete_room(api.DeleteRoomRequest(room=row["room"]))
                store.finish_cleanup(row["id"])
            except api.TwirpError as exc:
                if exc.code == "not_found":
                    store.finish_cleanup(row["id"])
            except Exception:  # noqa: BLE001 - retain the occupied slot and retry uncertain room deletion
                log.warning("Room cleanup retry required")
        reports.reconcile()
        await asyncio.sleep(3)


async def delivery_loop():
    while True:
        for channel, deliver in (("email", deliver_email), ("mirror", mirror_history)):
            if channel == "mirror" and os.getenv("DEMO_HISTORY_MIRROR_ENABLED", "1") == "0":
                continue
            due = reports.due(channel)
            if due:
                row = due[0]
                try:
                    await deliver(reports, row, os.environ)
                except Exception as exc:  # noqa: BLE001 - durable outbox retries without holding a voice slot
                    reports.failed(row["id"], channel, type(exc).__name__)
                    log.warning("Call %s delivery will retry: %s", channel, type(exc).__name__)
        await asyncio.sleep(3)


@asynccontextmanager
async def lifespan(_app):
    reports.import_legacy()
    task = asyncio.create_task(housekeeping())
    deliveries = asyncio.create_task(delivery_loop())
    yield
    task.cancel()
    deliveries.cancel()
    with contextlib.suppress(asyncio.CancelledError):
        await task
    with contextlib.suppress(asyncio.CancelledError):
        await deliveries


app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None, lifespan=lifespan)


@app.exception_handler(Denied)
async def denied(_request, exc):
    return JSONResponse({"error": str(exc)}, status_code=409, headers={"Cache-Control": "no-store"})


@app.get("/health")
async def health():
    return {"ok": True, "accepting": ready, "active": store.count_active()}


@app.post("/v1/demo")
async def demo(request: Request, authorization: str = Header(default="")):
    auth(authorization, GATEWAY_KEY)
    body = await bounded_body(request)
    client = str(body.get("client", ""))
    if not re.fullmatch(r"[a-f0-9]{64}", client):
        raise HTTPException(400, "Ungültige Sitzung.")
    action = body.get("action")
    if action == "join":
        if not ready:
            raise HTTPException(
                503, "Die Demo ist gerade nicht verfügbar. Bitte versuchen Sie es später erneut."
            )
        start_version = requested_start_version(body)
        row = store.join(
            client,
            str(body.get("ip", "")),
            str(body.get("profile", "")),
            # This historical column now records the explicit call-start flow,
            # not a claim that the visitor checked a consent checkbox.
            consent_version=start_version,
        )
        if row["state"] in ("connecting", "active", "closing"):
            raise HTTPException(
                409,
                "In diesem Browser läuft bereits eine Demo. Bitte beenden Sie zuerst das andere Gespräch.",
            )
    elif action == "status":
        row = store.status(client)
    elif action == "cancel":
        reason = body.get("reason", "hangup")
        store.cancel(
            client,
            body.get("id"),
            reason if isinstance(reason, str) and reason in REASONS else "hangup",
        )
        return {"state": "ended"}
    elif action == "connect":
        row = store.connect(client)
        if row["source"] == "browser" and row["consent_version"] not in {
            CONSENT_VERSION,
            CALL_START_VERSION,
        }:
            store.cancel(client, row["id"], "connection_error")
            store.room_ready(row["id"])
            raise HTTPException(
                409,
                "Bitte laden Sie die Seite neu und starten Sie die Demo erneut.",
            )
        if row["source"] != "browser":
            raise HTTPException(403)
        if row["new"]:
            try:
                async with api.LiveKitAPI(timeout=ClientTimeout(total=8)) as lk:
                    await lk.room.create_room(
                        api.CreateRoomRequest(
                            name=row["room"],
                            empty_timeout=40,
                            departure_timeout=5,
                            max_participants=2,
                        )
                    )
                    if not store.room_connectable(row["id"]):
                        raise ValueError("Call cancelled during room creation")
                    await lk.agent_dispatch.create_dispatch(
                        api.CreateAgentDispatchRequest(
                            agent_name=os.getenv("DEMO_AGENT_NAME", "codst-demo-agent"),
                            room=row["room"],
                            metadata=json.dumps({"session_id": row["id"]}),
                        )
                    )
            except Exception:  # noqa: BLE001 - uncertain dispatch must close the reserved room
                store.cancel(client, row["id"], "connection_error")
                raise HTTPException(
                    503,
                    "Die Verbindung konnte nicht aufgebaut werden. Bitte versuchen Sie es erneut.",
                )
            finally:
                store.room_ready(row["id"])
        if not store.room_connectable(row["id"]):
            raise HTTPException(409, "Dieses Gespräch wurde bereits beendet.")
        token = (
            api.AccessToken()
            .with_identity("visitor-" + client[:20])
            .with_name("Demo-Gast")
            .with_ttl(timedelta(seconds=60))
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room=row["room"],
                    can_publish=True,
                    can_subscribe=True,
                    can_publish_data=False,
                    can_update_own_metadata=False,
                    can_publish_sources=["microphone"],
                )
            )
            .to_jwt()
        )
        return {**public(row), "token": token, "url": os.environ["LIVEKIT_URL"], "duration": 180}
    else:
        raise HTTPException(400, "Ungültige Aktion.")
    return public(row)


async def bounded_body(request, limit=8192):
    raw = await request.body()
    if len(raw) > limit:
        raise HTTPException(413, "Die Anfrage ist zu groß.")
    try:
        body = json.loads(raw)
        if not isinstance(body, dict):
            raise TypeError()
        return body
    except (ValueError, TypeError):
        raise HTTPException(400, "Ungültige Anfrage.")


@app.post("/internal/{action}")
async def internal(action: str, request: Request, authorization: str = Header(default="")):
    auth(authorization, WORKER_KEY)
    body = await bounded_body(request, limit=262144 if action in ("report", "checkpoint") else 8192)
    session_id = str(body.get("id", ""))
    if action == "claim":
        row = store.claim(session_id, str(body.get("room", "")))
        reports.start(row)
        return {
            **public(row),
            "instructions": instructions(row["profile"]),
            "greeting": PROFILES[row["profile"]]["greeting"],
            "profile": row["profile"],
            "transcripts_enabled": os.getenv("DEMO_TRANSCRIPTS_ENABLED", "1") == "1",
            "record_audio": os.getenv("DEMO_AUDIO_RECORDING_ENABLED", "0") == "1",
        }
    if action == "ping":
        return public(store.worker_ping(session_id))
    if action == "end":
        reason = body.get("reason", "worker_shutdown")
        store.end_by_id(
            session_id,
            reason if isinstance(reason, str) and reason in REASONS else "worker_shutdown",
        )
        return {"ok": True}
    if action in ("report", "checkpoint"):
        try:
            if action == "report":
                reports.finish(
                    session_id,
                    body.get("messages", []),
                    body.get("reason", "worker_shutdown"),
                    body.get("audio_status", "disabled"),
                )
            else:
                reports.checkpoint(session_id, body.get("messages", []))
        except (ValueError, TypeError):
            raise HTTPException(400, "Ungültiges Anrufprotokoll.")
        return {"ok": True}
    if action == "sip-admit":
        if not ready:
            raise HTTPException(503, "Demo nicht verfügbar.")
        client = "sip-" + str(body.get("unique", ""))[:60]
        row = store.join(client, "asterisk-internal", str(body.get("profile")), source="sip")
        if row["state"] != "reserved":
            store.cancel(client)
            raise HTTPException(409, "Alle Demo-Leitungen sind belegt.")
        return {"id": store.connect(client)["id"]}
    raise HTTPException(404)


@app.post("/v1/contact")
async def contact(request: Request, authorization: str = Header(default="")):
    auth(authorization, GATEWAY_KEY)
    body = await bounded_body(request)
    if body.get("website"):
        return {"ok": True}
    fields = {
        k: str(body.get(k, "")).strip() for k in ("name", "practice", "email", "phone", "message")
    }
    if (
        not 2 <= len(fields["name"]) <= 100
        or not 2 <= len(fields["practice"]) <= 150
        or not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", fields["email"])
        or len(fields["email"]) > 254
        or len(fields["phone"]) > 50
        or not 10 <= len(fields["message"]) <= 3000
    ):
        raise HTTPException(400, "Bitte prüfen Sie Ihre Angaben.")
    ip = str(body.get("ip", ""))
    with store.db() as db:
        db.execute("CREATE TABLE IF NOT EXISTS contact_limits (ip TEXT, at REAL)")
        db.execute("DELETE FROM contact_limits WHERE at<?", (time.time() - 3600,))
        if db.execute("SELECT count(*) FROM contact_limits WHERE ip=?", (ip,)).fetchone()[0] >= 3:
            raise HTTPException(
                429, "Bitte versuchen Sie es später erneut oder schreiben Sie uns eine E-Mail."
            )
        db.execute("INSERT INTO contact_limits VALUES (?,?)", (ip, time.time()))
    payload = {
        "from": os.environ["DEMO_MAIL_FROM"],
        "to": ["info@cod-st.com"],
        "reply_to": fields["email"],
        "subject": "Beratungsanfrage: KI-Rezeption",
        "text": "\n\n".join(
            f"{label}: {fields[key]}"
            for key, label in [
                ("name", "Name"),
                ("practice", "Praxis"),
                ("email", "E-Mail"),
                ("phone", "Telefon"),
                ("message", "Nachricht"),
            ]
        ),
    }
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                json=payload,
                headers={"Authorization": "Bearer " + os.environ["RESEND_API_KEY"]},
            )
        if response.status_code not in (200, 201) or not response.json().get("id"):
            raise ValueError("Provider rejected message")
    except Exception:  # noqa: BLE001 - never claim email delivery on a provider or configuration failure
        raise HTTPException(
            503,
            "Die Nachricht konnte nicht gesendet werden. Bitte schreiben Sie an info@cod-st.com.",
        )
    return {"ok": True}
