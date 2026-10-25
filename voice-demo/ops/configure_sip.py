"""Provision a separate authenticated, IP-restricted internal demo SIP trunk."""

import asyncio
import json
import os
import secrets
from pathlib import Path

from dotenv import dotenv_values
from google.protobuf.duration_pb2 import Duration
from livekit import api

BASE = Path("/home/rei/apps/codst-demo")


async def main():
    for k, v in dotenv_values(BASE / "shared.env").items():
        if v is not None:
            os.environ[k] = v
    settings = BASE / "sip-config.json"
    if settings.exists():
        data = json.loads(settings.read_text())
    else:
        data = {"username": "codst_demo", "password": secrets.token_hex(24)}
        with os.fdopen(os.open(settings, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), "w") as out:
            json.dump(data, out)
    async with api.LiveKitAPI() as lk:
        if not data.get("trunk_id"):
            result = await lk.sip.create_inbound_trunk(
                api.CreateSIPInboundTrunkRequest(
                    trunk=api.SIPInboundTrunkInfo(
                        name="codst-internal-demos",
                        numbers=["2101", "2102", "2103"],
                        allowed_addresses=["142.93.161.58/32"],
                        auth_username=data["username"],
                        auth_password=data["password"],
                        headers_to_attributes={
                            "X-Demo-Session": "demo.session",
                            "X-Tenant-Slug": "tenant_slug",
                        },
                        max_call_duration=Duration(seconds=180),
                    )
                )
            )
            data["trunk_id"] = result.sip_trunk_id
            settings.write_text(json.dumps(data))
            os.chmod(settings, 0o600)
        if not data.get("dispatch_id"):
            result = await lk.sip.create_dispatch_rule(
                api.CreateSIPDispatchRuleRequest(
                    name="codst-internal-demo-dispatch",
                    trunk_ids=[data["trunk_id"]],
                    hide_phone_number=True,
                    rule=api.SIPDispatchRule(
                        dispatch_rule_individual=api.SIPDispatchRuleIndividual(
                            room_prefix="codst-demo-sip-"
                        )
                    ),
                    room_config=api.RoomConfiguration(
                        empty_timeout=20,
                        departure_timeout=5,
                        max_participants=2,
                        agents=[
                            api.RoomAgentDispatch(
                                agent_name="codst-demo-agent",
                                metadata=json.dumps({"transport": "sip"}),
                            )
                        ],
                    ),
                )
            )
            data["dispatch_id"] = result.sip_dispatch_rule_id
            settings.write_text(json.dumps(data))
            os.chmod(settings, 0o600)
    print(
        "Dedicated authenticated demo SIP trunk and dispatch rule ready; existing SIP routes untouched."
    )


if __name__ == "__main__":
    asyncio.run(main())
