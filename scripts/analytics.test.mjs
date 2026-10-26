import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  fs.readFileSync("src/lib/analytics.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  },
).outputText;

function setup(host = "www.cod-st.com") {
  const scripts = [];
  const cookies = new Map([
    ["codst_demo", "keep"],
    ["_ga", "remove"],
    ["_ga_DH8MDF9639", "remove"],
  ]);
  const window = {
    location: {
      hostname: host,
      href: `https://${host}/?utm_source=mailwizz&utm_medium=email&email=private%40example.org&subscriber=secret#private`,
    },
  };
  const document = {
    referrer: "https://outreach.example/private/user?email=private@example.org",
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
    get cookie() {
      return [...cookies].map(([k, v]) => `${k}=${v}`).join("; ");
    },
    set cookie(value) {
      if (value.includes("Max-Age=0")) cookies.delete(value.split("=")[0]);
    },
  };
  const context = {
    exports: {},
    process: {
      env: {
        NEXT_PUBLIC_GTM_ID: "GTM-TEST",
        NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST",
      },
    },
    window,
    document,
    URL,
    Date,
    Set,
    Math,
    Number,
  };
  vm.runInNewContext(source, context);
  return { api: context.exports, window, scripts, cookies };
}
const plain = (value) => JSON.parse(JSON.stringify(value));

test("consent is versioned, bounded, and fails closed", () => {
  const { api } = setup();
  const now = 100000000000;
  assert.equal(api.readConsent(null, now), null);
  assert.equal(api.readConsent("not JSON", now), null);
  assert.equal(
    api.readConsent(
      JSON.stringify({ version: 2, choice: "accepted", savedAt: now }),
      now,
    ),
    null,
  );
  assert.equal(
    api.readConsent(
      JSON.stringify({ version: 1, choice: "accepted", savedAt: now + 1 }),
      now,
    ),
    null,
  );
  assert.equal(
    api.readConsent(
      JSON.stringify({
        version: 1,
        choice: "accepted",
        savedAt: now - api.CONSENT_LIFETIME,
      }),
      now,
    ),
    null,
  );
  for (const choice of ["accepted", "rejected"])
    assert.equal(
      api.readConsent(
        JSON.stringify({ version: 1, choice, savedAt: now }),
        now,
      ),
      choice,
    );
});
test("URLs omit recipient parameters, sensitive values, fragments and unknown paths", () => {
  const { api } = setup();
  assert.equal(
    api.safeLocation(
      "https://www.cod-st.com/kontakt?utm_source=mailwizz&utm_medium=email&utm_campaign=physio_de_2026_10&utm_content=a%40b.com&subscriber=secret#secret",
    ),
    "https://www.cod-st.com/kontakt?utm_source=mailwizz&utm_medium=email&utm_campaign=physio_de_2026_10",
  );
  assert.equal(
    api.safeLocation("https://www.cod-st.com/patient/private-name?q=secret"),
    "https://www.cod-st.com/",
  );
  assert.equal(api.safeLocation("invalid"), "https://www.cod-st.com/");
  assert.equal(
    api.safeReferrer(
      "https://user:password@example.org/private?recipient=secret#secret",
    ),
    "https://example.org/",
  );
  assert.equal(api.safeReferrer("javascript:private"), "");
});
test("only predefined fields survive and durations are bounded", () => {
  const { api } = setup();
  assert.deepEqual(
    plain(
      api.cleanFields({
        demo_type: "dental",
        call_duration_seconds: 999,
        queue_position: -4,
        call_end_reason: "private-email@example.org",
        form_id: "consultation",
        email: "private@example.org",
        message: "secret",
        error_type: "secret",
      }),
    ),
    {
      demo_type: "dental",
      call_duration_seconds: 180,
      queue_position: 1,
      call_end_reason: "other",
      form_id: "consultation",
    },
  );
  assert.deepEqual(
    plain(
      api.cleanFields({
        demo_type: "secret",
        call_duration_seconds: NaN,
        queue_position: Infinity,
      }),
    ),
    {},
  );
});
test("no Google script, data layer or events before consent or after rejection", () => {
  const { api, window, scripts } = setup();
  api.track("generate_lead", { form_id: "consultation" });
  api.applyAnalyticsConsent(null);
  api.applyAnalyticsConsent("rejected");
  api.trackPage();
  assert.equal(scripts.length, 0);
  assert.equal(window.dataLayer, undefined);
  assert.equal(window["ga-disable-G-TEST"], true);
});
test("preview and local hosts cannot transmit to the production property", () => {
  for (const host of [
    "localhost",
    "code-studio-preview.vercel.app",
    "www.cod-st.com.attacker.example",
  ]) {
    const { api, scripts, window } = setup(host);
    api.applyAnalyticsConsent("accepted");
    api.trackPage();
    assert.equal(scripts.length, 0);
    assert.equal(window.dataLayer, undefined);
  }
});

test("campaign labels survive a settings visit before opt-in without recipient data", () => {
  const { api, window } = setup();
  api.applyAnalyticsConsent(null);
  window.location.href = "https://www.cod-st.com/cookies";
  api.applyAnalyticsConsent("accepted");
  api.trackPage();
  assert.equal(
    window.dataLayer.at(-1).page_location,
    "https://www.cod-st.com/cookies?utm_source=mailwizz&utm_medium=email",
  );
  assert.ok(!JSON.stringify(window.dataLayer).includes("private"));
});
test("consent loads one container, denies all advertising, and deduplicates page views", () => {
  const { api, scripts, window } = setup();
  api.applyAnalyticsConsent("accepted");
  api.trackPage();
  api.trackPage();
  api.applyAnalyticsConsent("accepted");
  api.trackPage();
  assert.equal(scripts.length, 1);
  assert.equal(
    scripts[0].src,
    "https://www.googletagmanager.com/gtm.js?id=GTM-TEST",
  );
  assert.equal(scripts[0].referrerPolicy, "strict-origin");
  assert.equal(window.dataLayer[0][0], "consent");
  assert.equal(window.dataLayer[0][2].analytics_storage, "granted");
  for (const field of ["ad_storage", "ad_user_data", "ad_personalization"])
    assert.equal(window.dataLayer[0][2][field], "denied");
  const events = window.dataLayer.filter((x) => x.event === "codst_event");
  assert.equal(events.length, 1);
  assert.equal(events[0].event_name, "page_view");
  assert.ok(!JSON.stringify(window.dataLayer).includes("private"));
});
test("withdrawal blocks future events, deletes only analytics cookies and does not reload", () => {
  const { api, scripts, window, cookies } = setup();
  api.applyAnalyticsConsent("accepted");
  api.trackPage();
  api.track("demo_open", { demo_type: "physio" });
  api.applyAnalyticsConsent("rejected");
  const count = window.dataLayer.length;
  api.track("generate_lead", { form_id: "consultation" });
  api.trackPage();
  assert.equal(window.dataLayer.length, count);
  assert.equal(window["ga-disable-G-TEST"], true);
  assert.equal(cookies.get("codst_demo"), "keep");
  assert.equal(cookies.has("_ga"), false);
  api.applyAnalyticsConsent("accepted");
  api.trackPage();
  assert.equal(scripts.length, 1);
  assert.equal(window["ga-disable-G-TEST"], false);
  assert.equal(window.dataLayer.at(-1).event_name, "page_view");
});
test("optional event values are reset between events and unknown events are dropped", () => {
  const { api, window } = setup();
  api.applyAnalyticsConsent("accepted");
  api.track("demo_call_ended", {
    demo_type: "physio",
    call_duration_seconds: 45,
    call_end_reason: "close_button",
  });
  api.track("generate_lead", { form_id: "consultation" });
  const event = window.dataLayer.at(-1);
  assert.equal(event.demo_type, undefined);
  assert.equal(event.call_duration_seconds, undefined);
  const count = window.dataLayer.length;
  api.track("patient_private_name");
  assert.equal(window.dataLayer.length, count);
});
