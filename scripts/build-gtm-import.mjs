// Build from the native GTM workspace export; preserve the existing container
// and draft built-in variables. No credentials are included in either file.
import fs from "node:fs";
const [input, output] = process.argv.slice(2);
if (!input || !output)
  throw new Error(
    "Usage: node scripts/build-gtm-import.mjs <native-export.json> <output.json>",
  );
const doc = JSON.parse(fs.readFileSync(input, "utf8"));
const version = doc.containerVersion;
if (version.container.publicId !== "GTM-KC3T3RTT")
  throw new Error("Unexpected container");
const variableTemplate = version.variable.find(
  (x) => x.name === "DLV – event_name",
);
const fields = [
  "event_name",
  "page_location",
  "page_referrer",
  "demo_type",
  "call_duration_seconds",
  "call_end_reason",
  "queue_position",
  "button_name",
  "form_id",
  "error_type",
  "debug_mode",
];
let id = 20;
version.variable = fields.map((name) => {
  const variable = structuredClone(variableTemplate);
  variable.name = `DLV – ${name}`;
  variable.variableId =
    name === "event_name" ? variableTemplate.variableId : String(id++);
  delete variable.fingerprint;
  variable.parameter.find((p) => p.key === "name").value = name;
  return variable;
});
const tableRow = (name, value) => ({
  type: "MAP",
  map: [
    { type: "TEMPLATE", key: "parameter", value: name },
    { type: "TEMPLATE", key: "parameterValue", value: String(value) },
  ],
});
const consent = {
  consentStatus: "NEEDED",
  consentType: {
    type: "LIST",
    list: [{ type: "TEMPLATE", value: "analytics_storage" }],
  },
};
for (const tag of version.tag) {
  tag.consentSettings = structuredClone(consent);
  delete tag.fingerprint;
}
const google = version.tag.find((x) => x.type === "dest_ga");
google.parameter.find((x) => x.key === "configSettingsTable").list =
  Object.entries({
    send_page_view: false,
    page_location: "{{DLV – page_location}}",
    page_referrer: "{{DLV – page_referrer}}",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 7776000,
    cookie_update: false,
    debug_mode: "{{DLV – debug_mode}}",
  }).map(([k, v]) => tableRow(k, v));
const events = version.tag.find((x) => x.type === "gaawe");
events.parameter.find((x) => x.key === "eventSettingsTable").list = fields
  .filter((x) => x !== "event_name")
  .map((name) => tableRow(name, `{{DLV – ${name}}}`));
for (const setting of version.gtagConfig) {
  for (const param of setting.parameter) {
    if (param.type === "BOOLEAN") param.value = "false";
  }
  delete setting.fingerprint;
}
const eventNames = [
  ...fs
    .readFileSync("src/lib/analytics.ts", "utf8")
    .match(/EVENT_NAMES = \[([\s\S]*?)\] as const/)[1]
    .matchAll(/"([a-z_]+)"/g),
].map((x) => x[1]);
const condition = (variable, value) => ({
  type: "MATCH_REGEX",
  parameter: [
    { type: "TEMPLATE", key: "arg0", value: variable },
    { type: "TEMPLATE", key: "arg1", value },
  ],
});
version.trigger[0].filter = [
  condition("{{Page Hostname}}", "^(www\\.)?cod-st\\.com$"),
  condition("{{DLV – event_name}}", `^(${eventNames.join("|")})$`),
];
delete version.trigger[0].fingerprint;
delete version.fingerprint;
fs.writeFileSync(output, JSON.stringify(doc, null, 2) + "\n");
console.log(
  `Prepared ${version.tag.length} tags, ${version.trigger.length} trigger, ${version.variable.length} variables; automatic/user-provided collection disabled.`,
);
