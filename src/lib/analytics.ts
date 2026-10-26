// Only coarse, predefined interaction data belongs in Analytics. Never pass
// form values, call/session IDs, transcripts, or error messages to this module.
export const CONSENT_KEY = "codst_analytics_consent_v1";
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export type ConsentChoice = "accepted" | "rejected";
export type DemoType = "physio" | "dental" | "general";
export const EVENT_NAMES = [
  "page_view",
  "site_engaged",
  "cta_click",
  "demo_open",
  "demo_start",
  "demo_queued",
  "demo_connect_click",
  "demo_call_connected",
  "demo_call_engaged",
  "demo_call_ended",
  "demo_error",
  "form_start",
  "form_submit_click",
  "generate_lead",
  "form_error",
] as const;
export type AnalyticsEvent = (typeof EVENT_NAMES)[number];
type EventFields = {
  demo_type?: DemoType;
  call_duration_seconds?: number;
  call_end_reason?: string;
  queue_position?: number;
  button_name?: "demo_navigation" | "contact_navigation" | "email_contact";
  form_id?: "consultation";
  error_type?:
    | "admission"
    | "connection"
    | "microphone_denied"
    | "microphone_missing"
    | "microphone_busy"
    | "status"
    | "submission";
};
type Layer = Record<string, unknown>;
declare global {
  interface Window {
    dataLayer?: (Layer | IArguments)[];
  }
}
let enabled = false;
let loaded = false;
let lastPage = "";
let entryLocation: string | null = null;
const paths = new Set([
  "/",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/cookies",
  "/demo-hinweise",
]);
const endReasons = new Set([
  "hangup",
  "close_button",
  "pagehide",
  "duration_limit",
  "visitor_disconnected",
  "connection_error",
  "status_error",
  "reservation_expired",
  "agent_disconnected",
  "agent_error",
]);
const errors = new Set([
  "admission",
  "connection",
  "microphone_denied",
  "microphone_missing",
  "microphone_busy",
  "status",
  "submission",
]);

export function readConsent(
  raw: string | null,
  now = Date.now(),
): ConsentChoice | null {
  try {
    const value = JSON.parse(raw || "null");
    return value?.version === 1 &&
      ["accepted", "rejected"].includes(value.choice) &&
      Number.isFinite(value.savedAt) &&
      value.savedAt <= now &&
      now - value.savedAt < CONSENT_LIFETIME
      ? value.choice
      : null;
  } catch {
    return null;
  }
}

// Query strings from email tools often identify recipients. Keep only campaign
// labels with a deliberately restrictive character set; discard all fragments.
export function safeLocation(raw: string): string {
  const result = new URL("https://www.cod-st.com");
  try {
    const url = new URL(raw);
    result.pathname = paths.has(url.pathname) ? url.pathname : "/";
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "utm_id",
    ]) {
      const value = url.searchParams.get(key);
      if (value && /^[a-z0-9][a-z0-9_-]{0,79}$/i.test(value))
        result.searchParams.set(key, value);
    }
  } catch {
    /* Use the public homepage for malformed URLs. */
  }
  return result.href;
}

export function safeReferrer(raw: string): string {
  try {
    const url = new URL(raw);
    if (!["https:", "http:"].includes(url.protocol)) return "";
    return url.origin + "/";
  } catch {
    return "";
  }
}

function measurementLocation() {
  const current = new URL(safeLocation(window.location.href));
  // Keep campaign labels in memory if a visitor opens the privacy/settings
  // page before opting in. No cookie or recipient identifier is stored here.
  if (entryLocation) {
    for (const [key, value] of new URL(entryLocation).searchParams) {
      if (!current.searchParams.has(key)) current.searchParams.set(key, value);
    }
  }
  return current.href;
}

export function cleanFields(fields: EventFields): Layer {
  const result: Layer = {};
  if (["physio", "dental", "general"].includes(fields.demo_type || ""))
    result.demo_type = fields.demo_type;
  if (Number.isFinite(fields.call_duration_seconds))
    result.call_duration_seconds = Math.min(
      180,
      Math.max(0, Math.round(fields.call_duration_seconds!)),
    );
  if (Number.isFinite(fields.queue_position))
    result.queue_position = Math.min(
      100,
      Math.max(1, Math.round(fields.queue_position!)),
    );
  if (fields.call_end_reason)
    result.call_end_reason = endReasons.has(fields.call_end_reason)
      ? fields.call_end_reason
      : "other";
  if (
    ["demo_navigation", "contact_navigation", "email_contact"].includes(
      fields.button_name || "",
    )
  )
    result.button_name = fields.button_name;
  if (fields.form_id === "consultation") result.form_id = "consultation";
  if (errors.has(fields.error_type || ""))
    result.error_type = fields.error_type;
  return result;
}

function command(...args: unknown[]) {
  // Google consent commands require the standard arguments object shape.
  // eslint-disable-next-line prefer-rest-params -- GTM distinguishes an Arguments command from an event array.
  if (args.length) window.dataLayer?.push(arguments);
}

function removeAnalyticsCookies() {
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of [
      "",
      `; domain=${window.location.hostname}`,
      "; domain=.cod-st.com",
    ]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}

function debugFields(): Layer {
  try {
    // Explicit developer QA only; still requires the visitor's statistics
    // consent. GA4's developer-traffic filter keeps these out of reports.
    return sessionStorage.getItem("codst_analytics_debug") === "1"
      ? { debug_mode: true }
      : {};
  } catch {
    return {};
  }
}

export function analyticsConfigured() {
  return /^GTM-[A-Z0-9]+$/.test(GTM_ID) && /^G-[A-Z0-9]+$/.test(GA_ID);
}

export function applyAnalyticsConsent(choice: ConsentChoice | null) {
  if (typeof window === "undefined") return;
  entryLocation ??= safeLocation(window.location.href);
  const productionHost = ["cod-st.com", "www.cod-st.com"].includes(
    window.location.hostname,
  );
  // Local/preview hosts cannot pollute production reports.
  const next = choice === "accepted" && analyticsConfigured() && productionHost;
  if (loaded && enabled === next) return;
  enabled = next;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] =
    !enabled;
  if (!enabled) {
    lastPage = "";
    if (loaded)
      command("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    removeAnalyticsCookies();
    return;
  }
  window.dataLayer ??= [];
  if (!loaded) {
    loaded = true;
    command("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.dataLayer.push({
      page_location: measurementLocation(),
      page_referrer: safeReferrer(document.referrer),
      ...debugFields(),
    });
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "codst-gtm";
    script.async = true;
    script.referrerPolicy = "strict-origin";
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  } else {
    command("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function track(event: AnalyticsEvent, fields: EventFields = {}) {
  if (!enabled || !EVENT_NAMES.includes(event)) return;
  try {
    // Clear optional fields on every event: GTM retains data-layer values.
    window.dataLayer?.push({
      event: "codst_event",
      event_name: event,
      demo_type: undefined,
      call_duration_seconds: undefined,
      call_end_reason: undefined,
      queue_position: undefined,
      button_name: undefined,
      form_id: undefined,
      error_type: undefined,
      ...cleanFields(fields),
      page_location: measurementLocation(),
      page_referrer: safeReferrer(document.referrer),
      ...debugFields(),
    });
  } catch {
    /* Measurement must never interfere with a call or enquiry. */
  }
}

export function trackPage() {
  if (!enabled) return;
  const current = measurementLocation();
  if (current === lastPage) return;
  lastPage = current;
  track("page_view");
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("codst:cookie-settings"));
}
