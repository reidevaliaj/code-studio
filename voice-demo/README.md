# Isolated cod-st voice demos

The website runs on Vercel. This Python service and dedicated LiveKit worker run on the existing Frankfurt voice host. They do not modify the existing telephone workers or load customer profiles.

Public demo IDs are `physio`, `dental`, and `general`; their production tenant slugs are `demo-physio-de`, `demo-dental-de`, and `demo-general-de`. Internal Asterisk extensions are 2101–2103. No public telephone numbers or carrier account are used by these demos.

## Admission and privacy

- SQLite transactions enforce two slots across all three profiles and both browser/SIP entry points. Connecting and closing sessions count until room cleanup completes.
- A FIFO queue, 30-second reservations, 45-second browser leases, 35-second worker leases, and a server-enforced 180-second deadline bound usage. Waiting clients never receive a room token.
- Website visitors receive only a short-lived token for their own room, restricted to microphone publication. Tenant selection and agent dispatch remain on the server.
- The agent claims an admission record before initializing OpenAI. It has no business-action tools or customer credentials. The model remains `gpt-realtime-2.1-mini`; input transcription uses `gpt-transcribe`. Named receptionists use short, fixed greeting audio, generated once with the same Marin voice. Practice facts and scheduling examples remain fictional.
- After explicit versioned transcript consent, per-turn checkpoints and a final drained history are persisted privately. Each connected call is registered before its first transcript, mirrored into the existing backend's tenant call history and emailed to info@cod-st.com. Durable outboxes retry failures; email payloads and provider idempotency keys prevent duplicate retries. Waiting visitors do not create transcript emails.
- Optional audio recording captures both sides in a private stereo Opus file using the pinned LiveKit SDK's `RecorderIO`, independently of Cloud observability. Files stay in `data/recordings/` and are attached to the operator's report when recording is enabled. There is no public media URL.
- Production `DEMO_AUDIO_RECORDING_ENABLED=0`: the operator will provide the legal review and recording notice. After that, set it to `1` and restart only `codst-demo-api`; the trusted claim determines recording per call. Update the website's recording information at the same time. Do not enable recording for unnotified public callers. Synthetic staging calls exercised the enabled path, including stereo decoding and delivery.
- Admission metadata expires within 24 hours. Private local call reports and audio files expire after 30 days. Backend-history and mailbox copies follow the operator's stated purpose and deletion process. Hashed admission rate-limit keys expire after ten minutes; contact limits after one hour. No optional analytics or marketing scripts are loaded.
- Closing, hangup, tab departure, connection errors and duration expiry have explicit end reasons. A slot remains occupied while room provisioning or deletion is unfinished; late cancellation for an old session cannot close a newer session. Browser and worker expiry, the server deadline, a worker watchdog and room cleanup all bound abandoned calls.

## Deployment

Current release: `/home/rei/apps/codst-demo/releases/20261025-v2`.

Secrets: `/home/rei/apps/codst-demo/shared.env`, owned by rei with mode 0600. API service: `codst-demo-api` on 127.0.0.1:8011; voice worker: `codst-demo-agent`, health port 8091. The website reaches the gateway at `https://voice.code-studio.eu/demo-api`; nginx denies external `/internal/` requests.

Vercel uses `DEMO_API_URL` and the server-only Secret `DEMO_GATEWAY_KEY`. No OpenAI, LiveKit, SIP, backend-agent or mail-provider credentials are placed on Vercel or in the browser. Host-only `DEMO_BACKEND_AGENT_TOKEN` authenticates to the existing backend's configuration and durable call-end endpoints. The consultation recipient and public contact are info@cod-st.com. Notifications use the existing verified code-studio.eu sender domain with a dedicated sending-only Resend credential; cod-st.com's external DNS and existing mailbox were preserved.

The scripts under `ops/` provision isolated credentials, seed only the three new tenants, and install separate nginx/SIP/Asterisk additions. They are intended for this host and release; inspect their fixed paths before reusing them. Original nginx and Asterisk files are saved under `/root/codst-demo-backups/`.

Use `uv sync --locked`, `uv run pytest`, `uv run ruff check .`, and `uv run ruff format --check .` in this directory. `ops/voice_smoke.py` is an explicit paid integration check using generated German speech, not a default unit test. Its data is synthetic and transcripts stay in memory.

The smoke test's analysis audio is transient; the running service records its own call reports according to that environment's settings. For isolated QA, set `DEMO_TEST_ENV` to a protected staging environment file. Supported staging settings include `DEMO_AGENT_NAME`, `DEMO_WORKER_PORT`, `DEMO_INTERNAL_URL`, `DEMO_DATABASE`, and `DEMO_DATA_DIR`; disable backend mirroring with `DEMO_HISTORY_MIRROR_ENABLED=0` and label emails with `DEMO_EMAIL_TEST_MODE=1`. The private QA environment used separate keys, a separate database and no public nginx route, and is stopped after testing.

`uv run python -m ops.generate_greetings` generates missing greeting WAV assets; regenerate them if the greeting text changes. `ops/update_profiles.py`, run with the existing backend environment, creates a new configuration version only for the three isolated tenants. It leaves customer tenants unchanged. Old calls can be imported into history as metadata-only records; missing old transcripts or recordings are never reconstructed or invented, and old calls do not trigger retroactive email blasts.

To pause new demos, set `DEMO_ENABLED=0` in shared.env and restart the demo API. To stop the new feature entirely, stop only `codst-demo-agent` and `codst-demo-api`; the existing ai-voice services remain separate. A website rollback uses the previously known Vercel production deployment. Do not redeploy old local voice source over the active September production releases.
