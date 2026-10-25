from types import SimpleNamespace

import pytest


@pytest.mark.asyncio
async def test_runtime_disables_cloud_recording_and_uses_claimed_profile(monkeypatch):
    import demo_agent

    calls = []

    class Room:
        name = "codst-demo-test"

        def on(self, _event):
            return lambda fn: fn

    class Context:
        job = SimpleNamespace(metadata='{"session_id":"test"}')
        room = Room()

        def add_shutdown_callback(self, callback):
            pass

        async def connect(self, **kwargs):
            pass

        async def wait_for_participant(self):
            return SimpleNamespace(identity="visitor", attributes={})

        def shutdown(self, **kwargs):
            calls.append(("shutdown", kwargs))

    class Session:
        def __init__(self, **kwargs):
            self.callbacks = {}

        def on(self, event):
            def register(fn):
                self.callbacks[event] = fn
                return fn

            return register

        async def start(self, **kwargs):
            assert kwargs["record"] is False
            assert kwargs["agent"].instructions == "Trusted server profile"
            calls.append(("start", kwargs["record"]))
            self.callbacks["close"](None)

        def generate_reply(self, **kwargs):
            calls.append(("reply", kwargs))

        async def aclose(self):
            pass

    async def gateway(action, data):
        calls.append((action, data))
        return {
            "instructions": "Trusted server profile",
            "greeting": "Fiktive Praxis, keine echte Buchung.",
        }

    def model(**kwargs):
        assert kwargs["model"] == "gpt-realtime-2.1-mini"
        assert kwargs["input_audio_transcription"] is None
        assert kwargs["tracing"] is None
        assert kwargs["turn_detection"].create_response is True
        assert kwargs["turn_detection"].interrupt_response is True
        return object()

    monkeypatch.setattr(demo_agent, "call", gateway)
    monkeypatch.setattr(demo_agent, "AgentSession", Session)
    monkeypatch.setattr(demo_agent.openai.realtime, "RealtimeModel", model)
    await demo_agent.demo(Context())
    assert any(k == "start" for k, _ in calls)
    assert any(k == "end" for k, _ in calls)


@pytest.mark.asyncio
async def test_rejected_claim_never_opens_a_model_session(monkeypatch):
    import demo_agent

    class Context:
        job = SimpleNamespace(metadata='{"session_id":"forged"}')
        room = SimpleNamespace(name="codst-demo-forged")

        def add_shutdown_callback(self, callback):
            pass

        async def connect(self, **kwargs):
            pass

        async def wait_for_participant(self):
            return SimpleNamespace(identity="visitor", attributes={})

        def shutdown(self, **kwargs):
            pass

    async def gateway(action, data):
        if action == "claim":
            raise ValueError("Rejected")
        return {}

    def forbidden_model(**kwargs):
        raise AssertionError("A forged session must never open an AI connection")

    monkeypatch.setattr(demo_agent, "call", gateway)
    monkeypatch.setattr(demo_agent.openai.realtime, "RealtimeModel", forbidden_model)
    await demo_agent.demo(Context())
