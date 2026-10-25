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
