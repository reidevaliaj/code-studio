"""Run on the existing voice host as rei. Never print generated credentials."""

import json
import os
import secrets
import sys
from pathlib import Path

import httpx
from dotenv import dotenv_values

BASE = Path("/home/rei/apps/codst-demo")
BACKEND = Path("/home/rei/apps/ai-voice-assistant/.releases/20260907T125503Z")
AGENT = Path("/home/rei/apps/livekit-agent/.releases/20260908T103000Z-salento-helpful")


def secure_file(path, content):
    with os.fdopen(os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600), "w") as out:
        out.write(content)
    os.chmod(path, 0o600)


def provision():
    backend = dotenv_values(BACKEND / ".env")
    voice = dotenv_values(AGENT / ".env.local")
    env_path = BASE / "shared.env"
    if not env_path.exists():
        with httpx.Client(
            timeout=20, headers={"Authorization": "Bearer " + backend["RESEND_API_KEY"]}
        ) as client:
            r = client.get("https://api.resend.com/domains")
            r.raise_for_status()
            domain = next(
                d
                for d in r.json()["data"]
                if d["name"] == "code-studio.eu" and d["status"] == "verified"
            )
            import time

            time.sleep(0.6)
            r = client.post(
                "https://api.resend.com/api-keys",
                json={
                    "name": "codst-demo-20261025",
                    "permission": "sending_access",
                    "domain_id": domain["id"],
                },
            )
            if r.status_code not in (200, 201):
                raise RuntimeError(
                    "Unable to provision scoped mail credential; HTTP " + str(r.status_code)
                )
            mail_key = r.json()
        values = {
            k: voice.get(k) or backend.get(k)
            for k in ("LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET", "OPENAI_API_KEY")
        }
        if not all(values.values()):
            raise RuntimeError("Required voice credentials are missing")
        values.update(
            DEMO_GATEWAY_KEY=secrets.token_hex(32),
            DEMO_WORKER_KEY=secrets.token_hex(32),
            RESEND_API_KEY=mail_key["token"],
            DEMO_MAIL_FROM="Code-Studio <website@code-studio.eu>",
            DEMO_DATABASE=str(BASE / "data/queue.db"),
            DEMO_ENABLED="1",
            PYTHONUNBUFFERED="1",
        )
        secure_file(env_path, "".join(k + "=" + json.dumps(v) + "\n" for k, v in values.items()))
        secure_file(
            BASE / "mail-key-metadata.json",
            json.dumps(
                {"id": mail_key["id"], "scope": "sending_access", "domain": "code-studio.eu"}
            ),
        )
    values = dotenv_values(env_path)
    secure_file(
        BASE / "website.env",
        "DEMO_API_URL=https://voice.code-studio.eu/demo-api\nDEMO_GATEWAY_KEY="
        + values["DEMO_GATEWAY_KEY"]
        + "\n",
    )
    print(
        "Demo credentials provisioned; public contact recipient info@cod-st.com; sender uses the existing verified domain."
    )


def seed_tenants():
    sys.path.insert(0, str(BACKEND))
    for k, v in dotenv_values(BACKEND / ".env").items():
        if v is not None:
            os.environ[k] = v
    from db import db_session
    from models import Tenant, TenantAgentConfig, TenantPhoneNumber
    from sqlalchemy import select

    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from profiles import PROFILES, instructions

    with db_session() as db:
        before = [
            (t.id, t.slug, t.updated_at)
            for t in db.scalars(select(Tenant).where(Tenant.slug.in_(["codestudio", "quintact"])))
        ]
        for key, p in PROFILES.items():
            tenant = db.scalar(select(Tenant).where(Tenant.slug == p["slug"]))
            number = db.scalar(
                select(TenantPhoneNumber).where(TenantPhoneNumber.phone_number == p["extension"])
            )
            if number and (not tenant or number.tenant_id != tenant.id):
                raise RuntimeError("Internal extension already assigned")
            if not tenant:
                tenant = Tenant(
                    slug=p["slug"],
                    display_name=p["label"] + " (öffentliche Demo)",
                    notes="Isolated cod-st demo. Internal extension only. No real booking or patient data.",
                )
                db.add(tenant)
                db.flush()
                db.add(
                    TenantAgentConfig(
                        tenant_id=tenant.id,
                        version=1,
                        business_name=p["business"],
                        assistant_language="de",
                        stt_language="de",
                        timezone="Europe/Berlin",
                        greeting=p["greeting"],
                        tenant_prompt=instructions(key),
                        services=p["services"],
                        faq_notes=p["hours"],
                        enabled_tools={},
                        llm_model="gpt-realtime-2.1-mini",
                        extra_settings={
                            "public_demo": True,
                            "business_actions_disabled": True,
                            "openai_realtime_voice": "marin",
                            "dedicated_agent": "codst-demo-agent",
                        },
                    )
                )
            if not number:
                db.add(
                    TenantPhoneNumber(
                        tenant_id=tenant.id,
                        phone_number=p["extension"],
                        label="Internal Asterisk demo only",
                    )
                )
        db.flush()
        after = [
            (t.id, t.slug, t.updated_at)
            for t in db.scalars(select(Tenant).where(Tenant.slug.in_(["codestudio", "quintact"])))
        ]
        if before != after:
            raise RuntimeError("Existing tenants changed unexpectedly")
    print(
        "Three demo tenants and extensions 2101–2103 provisioned. Existing tenant records unchanged."
    )


if __name__ == "__main__":
    provision()
    seed_tenants()
