# cod-st — German AI receptionist website

Premium German landing page and three live browser-call demos. The app reuses the existing Code-Studio Next.js/Vercel project. No telephone number is required to try a demo.

## Local development

Use Node.js 22+ and npm. Run `npm ci`, provide `DEMO_API_URL` and `DEMO_GATEWAY_KEY` in ignored `.env.local`, then run `npm run dev`. Use the existing Vercel project `futurewealthgroup/code-studio`; the gateway Secret must be supplied from the deployment owner and is never prefixed NEXT_PUBLIC.

`npm run build` validates the production build, types, and lint. `npm run lint` runs ESLint. LiveKit is dynamically imported only when a visitor connects a call. No optional tracking is included.

## Voice gateway and worker

The isolated Python service, dedicated LiveKit worker, tests, and host deployment scripts are in [voice-demo/](voice-demo/README.md). They run on the existing voice host, not inside Vercel Functions. Vercel stores only the gateway URL and server-only gateway credential.

Public demo IDs are physio, dental, and general. Two server-side slots are shared across the three profiles. Additional visitors wait in a real FIFO queue. The gateway controls tenant identity, short-lived tokens, duration, and cleanup. Agent-side recording, transcripts, and business-action tools are disabled.

## Business details

Brand: cod-st. Business: Code-Studio / Rej Aliaj. Public contact and consultation recipient: info@cod-st.com. Legal pages use the operator details supplied by the owner. There is no checkout or invented price list; consultation requests are delivered via the existing mail provider.

## Release

Work on a branch and use a Vercel preview for review. The established canonical hostname is www.cod-st.com; the apex redirects there. Preserve external DNS and mailbox records. Source and generated assets are committed; local QA artifacts, environment files, and Python virtual environments are ignored. The previous production deployment remains available for rollback.

## Business information follow-up

The supplied VAT number failed its Belgian checksum. At the operator's request on 25 October 2026, the unverified number is temporarily omitted from the public imprint. Obtain the correct registered VAT/business number and update the imprint; do not infer a replacement from the checksum. Public business name: Code-Studio; public contact: info@cod-st.com.
