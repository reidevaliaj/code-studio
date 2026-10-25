# Isolated cod-st voice demos

The website runs on Vercel. This Python service and dedicated LiveKit worker run on the existing Frankfurt voice host. They do not modify the existing telephone workers or load customer profiles.

Public demo IDs are `physio`, `dental`, and `general`; their production tenant slugs are `demo-physio-de`, `demo-dental-de`, and `demo-general-de`. Internal Asterisk extensions are 2101–2103. No public telephone numbers or carrier account are used by these demos.

## Admission and privacy

- SQLite transactions enforce two slots across all three profiles and both browser/SIP entry points. Connecting and closing sessions count until room cleanup completes.
- A FIFO queue, 30-second reservations, 45-second browser leases, 35-second worker leases, and a server-enforced 180-second deadline bound usage. Waiting clients never receive a room token.
- Website visitors receive only a short-lived token for their own room, restricted to microphone publication. Tenant selection and agent dispatch remain on the server.
- The agent claims an admission record before initializing OpenAI. It has no business tools, customer credentials, recording, stored transcripts, or post-call processing. The model remains `gpt-realtime-2.1-mini`.
- Session metadata expires within 24 hours. Hashed admission rate-limit keys expire after ten minutes; contact limits after one hour. No optional analytics or marketing scripts are loaded.

## Deployment

Current release: `/home/rei/apps/codst-demo/releases/20261025-v1`.

Secrets: `/home/rei/apps/codst-demo/shared.env`, owned by rei with mode 0600. API service: `codst-demo-api` on 127.0.0.1:8011; voice worker: `codst-demo-agent`, health port 8091. The website reaches the gateway at `https://voice.code-studio.eu/demo-api`; nginx denies external `/internal/` requests.

Vercel uses `DEMO_API_URL` and the server-only Secret `DEMO_GATEWAY_KEY`. No OpenAI, LiveKit, SIP, or mail-provider credentials are placed on Vercel or in the browser. The consultation recipient and public contact are info@cod-st.com. Notifications use the existing verified code-studio.eu sender domain with a dedicated sending-only Resend credential; cod-st.com's external DNS and existing mailbox were preserved.

The scripts under `ops/` provision isolated credentials, seed only the three new tenants, and install separate nginx/SIP/Asterisk additions. They are intended for this host and release; inspect their fixed paths before reusing them. Original nginx and Asterisk files are saved under `/root/codst-demo-backups/`.

Use `uv sync --locked`, `uv run pytest`, `uv run ruff check .`, and `uv run ruff format --check .` in this directory. `ops/voice_smoke.py` is an explicit paid integration check using generated German speech, not a default unit test. Its data is synthetic and transcripts stay in memory.

To pause new demos, set `DEMO_ENABLED=0` in shared.env and restart the demo API. To stop the new feature entirely, stop only `codst-demo-agent` and `codst-demo-api`; the existing ai-voice services remain separate. A website rollback uses the previously known Vercel production deployment. Do not redeploy old local voice source over the active September production releases.
