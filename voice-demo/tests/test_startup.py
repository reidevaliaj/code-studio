import pytest


def test_worker_import_and_configuration(monkeypatch):
    monkeypatch.setenv("LIVEKIT_URL", "wss://example.invalid")
    monkeypatch.setenv("LIVEKIT_API_KEY", "test")
    monkeypatch.setenv("LIVEKIT_API_SECRET", "test-secret-at-least-32-characters-long")
    import demo_agent

    assert demo_agent.server is not None


@pytest.mark.asyncio
async def test_service_auth_and_invalid_requests(tmp_path, monkeypatch):
    monkeypatch.setenv("DEMO_GATEWAY_KEY", "gateway-test")
    monkeypatch.setenv("DEMO_WORKER_KEY", "worker-test")
    monkeypatch.setenv("DEMO_DATABASE", str(tmp_path / "service.db"))
    import httpx

    import service

    async with httpx.AsyncClient(
        transport=httpx.ASGITransport(app=service.app), base_url="http://test"
    ) as client:
        assert (await client.post("/v1/demo", json={"action": "join"})).status_code == 401
        assert (await client.post("/internal/claim", json={})).status_code == 401
        assert (await client.post("/internal/report", json={})).status_code == 401
        assert (await client.get("/v1/reports")).status_code == 404
        assert (
            await client.post(
                "/v1/demo",
                json={"action": "join"},
                headers={"Authorization": "Bearer gateway-test"},
            )
        ).status_code == 400
        assert (
            await client.post(
                "/v1/contact", json={"name": "x"}, headers={"Authorization": "Bearer gateway-test"}
            )
        ).status_code == 400
        assert (
            await client.post(
                "/v1/demo",
                content="[" + " " * 9000 + "]",
                headers={"Authorization": "Bearer gateway-test"},
            )
        ).status_code == 413
        monkeypatch.setattr(service, "ready", True)
        headers = {"Authorization": "Bearer gateway-test"}
        body = {
            "action": "join",
            "client": "a" * 64,
            "ip": "test-ip",
            "profile": "physio",
            "consent": True,
        }
        assert (await client.post("/v1/demo", json=body, headers=headers)).status_code == 409
        body["consentVersion"] = service.CONSENT_VERSION
        response = await client.post("/v1/demo", json=body, headers=headers)
        assert response.status_code == 200
        session_id = response.json()["id"]
        response = await client.post(
            "/v1/demo",
            json={
                "action": "cancel",
                "client": "a" * 64,
                "id": session_id,
                "reason": "close_button",
            },
            headers=headers,
        )
        assert response.status_code == 200
        assert service.store.status("a" * 64)["end_reason"] == "close_button"

        direct = {
            "action": "join",
            "client": "b" * 64,
            "ip": "direct-start-ip",
            "profile": "dental",
        }
        assert (await client.post("/v1/demo", json=direct, headers=headers)).status_code == 400
        direct["startRequested"] = True
        direct["startVersion"] = "outdated"
        assert (await client.post("/v1/demo", json=direct, headers=headers)).status_code == 409
        direct["startVersion"] = service.CALL_START_VERSION
        response = await client.post("/v1/demo", json=direct, headers=headers)
        assert response.status_code == 200
        assert service.store.status("b" * 64)["consent_version"] == service.CALL_START_VERSION
        assert "consent" not in direct
        assert "consentVersion" not in direct
        response = await client.post(
            "/v1/demo",
            json={
                "action": "cancel",
                "client": "b" * 64,
                "id": response.json()["id"],
                "reason": "close_button",
            },
            headers=headers,
        )
        assert response.status_code == 200
        assert service.store.status("b" * 64)["end_reason"] == "close_button"


def test_public_countdown_uses_server_time_and_cannot_exceed_three_minutes(monkeypatch):
    import service

    monkeypatch.setattr(service.time, "time", lambda: 5000.0)
    row = {"id": "a", "state": "active", "connected": 4900, "deadline": 5080}
    assert service.public(row)["remaining"] == 80
    row["deadline"] = 6000
    assert service.public(row)["remaining"] == 180
    row["deadline"] = 4999
    assert service.public(row)["remaining"] == 0
    row["connected"] = None
    assert service.public(row)["remaining"] is None
