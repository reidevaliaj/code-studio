# Code-Studio measurement

GA4 account **Code-Studio** `413448922`, property **cod-st.com** `560718930`, web stream `16205291922`, measurement ID `G-DH8MDF9639`.
Existing GTM container **codestudio** `GTM-KC3T3RTT`, account `6320296841`, container `233179695`. Version **2** published 26 October 2026. `gtm-import.json` is the import template used for that version; Google remaps internal IDs during import. No secrets are in this file.

## Reading results

Use GA4 Reports → Acquisition → Traffic acquisition to compare email campaigns. Use event count **and total users**, since one person can try several demos.

| Event | Meaning |
| --- | --- |
| `page_view` | Automatically measured visit/page unless opted out; not proof of a human |
| `site_engaged` | At least 15 visible seconds and a trusted pointer/keyboard interaction |
| `cta_click` | Demo navigation, consultation navigation or public email link |
| `demo_open` | One of the three call buttons opened the phone panel |
| `demo_start` | Demo admission accepted after the visitor clicks “Demo starten” |
| `demo_queued` | Admission entered the waiting queue |
| `demo_connect_click` | Visitor attempted microphone/connection setup |
| `demo_call_connected` | Microphone published and assistant audio subscribed |
| `demo_call_engaged` | Established call remained connected for 15 seconds; **key event** |
| `demo_call_ended` | End of established call, with bounded duration and reason |
| `demo_error` | Coarse admission/microphone/connection/status failure category |
| `form_start` | First trusted input in the consultation form |
| `form_submit_click` | Form submission attempt |
| `generate_lead` | API confirmed success and honeypot was empty; **key event** |
| `form_error` | Form request was not confirmed successful |

These are engagement signals, not human verification. Sophisticated bots can run JavaScript and interact with pages. GA4 automatically excludes known bots but does not identify every email scanner. A useful funnel is `page_view → demo_open → demo_call_connected → demo_call_engaged`, alongside `form_start → generate_lead`. Security-link scans, button opens, and rejected submissions are not lead conversions.

## MailWizz + Shlink campaign links

Use campaign-level labels in the **destination** of each Shlink short URL:

```
https://www.cod-st.com/?utm_source=mailwizz&utm_medium=email&utm_campaign=physio_de_2026_10&utm_content=demo_button
```

Change `utm_campaign` for each campaign/industry and `utm_content` for each placement. Keep names to letters, digits, underscores and hyphens (80 characters maximum). Never put an email address, subscriber UID, name or phone number in UTM fields. Unknown query parameters and URL fragments are removed before measurement. Campaign labels survive client-side navigation in memory.

Shlink/MailWizz click totals are upstream link activity, not website leads. Compare Shlink's non-bot visits with GA4 engaged users/calls/leads by campaign; do not expect identical totals. Explicit opt-outs, ad blockers, tool redirects and scanners cause differences. This change does not modify MailWizz or Shlink campaigns or their server settings.

## Automatic measurement and data minimization

Owner requested automatic measurement on 26 October 2026. New production visitors initialize Google Analytics without accepting a banner; no statistics popup is rendered. `/cookies` provides an explicit opt-out/enable control. Existing rejections remain honored for their original 180-day lifetime. Opting out disables GA4, stops app events, removes `_ga*` cookies and keeps calls connected. Other tabs receive storage changes. On 27 October the owner also requested removal of the voice-demo checkbox: visitors now click “Demo starten” directly, then “Jetzt verbinden” to allow microphone access. Call-start requests carry a dedicated flow version and do not assert a checkbox acceptance. This describes technical behavior and is not a claim of legal compliance. Do not reintroduce a required statistics acceptance step without discussing it with the owner.

Only production hosts `cod-st.com` and `www.cod-st.com` can initialize measurement. Preview/local hosts are disabled. GA4 automatic/enhanced interactions and user-provided data collection are off. Google Signals, ads personalization and granular location/device collection are off. GA cookies expire after 90 days without renewal. User and event data retention are two months, with reset on new user activity disabled. Standard aggregate reports can persist longer.

Never send form values, transcripts, audio, call IDs, tokens or error messages into the data layer. `src/lib/analytics.ts` and the GTM trigger both enforce the event allowlist. Legal/cookie pages describe the deployed behavior.

## Finding call recordings

The demo worker saves both sides as a private stereo MP3 under `/home/rei/apps/codst-demo/data/recordings/`. Each completed call email to `info@cod-st.com` includes `Gespraech-<call-id>.mp3` alongside the transcript. Recording is controlled by `DEMO_AUDIO_RECORDING_ENABLED` in the protected server environment. Local MP3s and intermediate audio expire after 30 days. Recordings are not public web files and are not sent to Analytics. Calls made while recording was disabled have no recoverable audio.

## Verification and maintenance

Public build settings: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Vercel Config, not secrets). The website loads GTM once; GTM owns the Analytics destination and forwards `codst_event`. Do not add a second direct `gtag.js` installation.

`npm run test:analytics` tests automatic startup, explicit opt-out, preference expiry, URL cleanup, host gating, page-view deduplication, withdrawal and field limits. `npm run lint` and `npm run build` validate the website. Browser tests additionally cover all three buttons, confirmed vs honeypot submissions, automatic page/click delivery without acceptance, opt-out and responsive pages. A transport test uses the real published GTM container while intercepting GA4 collection, checking destination ID, cleaned URLs, events and 90-day cookie expiry.

For deliberate development verification only, set `sessionStorage.codst_analytics_debug = "1"` on the website **before reloading**. The active `CodeStudio_QA_Debug_Traffic` developer filter excludes debug events from normal reports. Verify debug traffic in GA4 DebugView. Clear the session setting when finished. This flag never bypasses an explicit opt-out.

Primary references: [Consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode), [GA4 known-bot filtering](https://support.google.com/analytics/answer/9888366), [Shlink bot visits](https://shlink.io/documentation/some-features/), [manual page views](https://developers.google.com/analytics/devguides/collection/ga4/views).
