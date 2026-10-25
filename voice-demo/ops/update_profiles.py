"""Create a new version for only the three public receptionists; keep customer tenants intact."""

import os
import sys
from pathlib import Path

from dotenv import dotenv_values

BACKEND = Path("/home/rei/apps/ai-voice-assistant/.releases/20260907T125503Z")
sys.path.insert(0, str(BACKEND))
for key, value in dotenv_values(BACKEND / ".env").items():
    if value is not None:
        os.environ[key] = value

from db import db_session
from models import Tenant, TenantAgentConfig
from sqlalchemy import select

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from profiles import PROFILES, instructions


def main():
    with db_session() as db:
        customers = list(
            db.scalars(select(Tenant).where(Tenant.slug.in_(["codestudio", "quintact"])))
        )
        before = [(t.id, t.slug, t.updated_at) for t in customers]
        for key, p in PROFILES.items():
            tenant = db.scalar(select(Tenant).where(Tenant.slug == p["slug"]))
            if not tenant:
                raise RuntimeError("Expected isolated tenant missing")
            current = db.scalar(
                select(TenantAgentConfig)
                .where(TenantAgentConfig.tenant_id == tenant.id)
                .order_by(TenantAgentConfig.version.desc())
                .limit(1)
            )
            if (
                current
                and (current.extra_settings or {}).get("public_profile_revision") == "20261025-v2"
            ):
                continue
            db.add(
                TenantAgentConfig(
                    tenant_id=tenant.id,
                    version=current.version + 1 if current else 1,
                    business_name=p["business"],
                    assistant_language="de",
                    stt_language="de",
                    timezone="Europe/Berlin",
                    greeting=p["greeting"],
                    tenant_prompt=instructions(key),
                    services=p["services"],
                    faq_notes="\n".join(
                        f"{topic}: {text}" for topic, text in p["knowledge"].items()
                    ),
                    owner_email="info@cod-st.com",
                    notification_targets=["info@cod-st.com"],
                    enabled_tools={},
                    llm_model="gpt-realtime-2.1-mini",
                    extra_settings={
                        "public_demo": True,
                        "business_actions_disabled": True,
                        "openai_realtime_voice": "marin",
                        "dedicated_agent": "codst-demo-agent",
                        "public_profile_revision": "20261025-v2",
                    },
                )
            )
            tenant.display_name = p["business"]
        db.flush()
        if before != [(t.id, t.slug, t.updated_at) for t in customers]:
            raise RuntimeError("Customer tenant changed")
    print("Three isolated receptionist profiles updated; customer tenants unchanged.")


if __name__ == "__main__":
    main()
