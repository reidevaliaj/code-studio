"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icons";
import { track } from "@/lib/analytics";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const values = new FormData(form);
    track("form_submit_click", { form_id: "consultation" });
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(values)),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(
          data.error ||
            "Die Nachricht konnte nicht gesendet werden. Bitte schreiben Sie an info@cod-st.com.",
        );
      setState("sent");
      // The server deliberately returns success for honeypot spam. Those
      // responses must never become lead conversions.
      if (!String(values.get("website") || "").trim())
        track("generate_lead", { form_id: "consultation" });
      started.current = false;
      form.reset();
    } catch (e) {
      track("form_error", {
        form_id: "consultation",
        error_type: "submission",
      });
      setError(
        e instanceof Error ? e.message : "Bitte versuchen Sie es erneut.",
      );
      setState("error");
    } finally {
      submitting.current = false;
    }
  }
  if (state === "sent")
    return (
      <div className="form-success" role="status">
        <Icon name="check" width="40" height="40" />
        <h3>Danke für Ihre Anfrage.</h3>
        <p>
          Ihre Nachricht wurde an Code-Studio übermittelt. Wir melden uns bei
          Ihnen.
        </p>
        <button
          className="button button-light"
          onClick={() => setState("idle")}
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onInput={(event) => {
        if (
          !started.current &&
          event.isTrusted &&
          event.target instanceof HTMLElement &&
          event.target.getAttribute("name") !== "website"
        ) {
          started.current = true;
          track("form_start", { form_id: "consultation" });
        }
      }}
    >
      <div className="form-grid">
        <label>
          Ihr Name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Vor- und Nachname"
          />
        </label>
        <label>
          Ihr Unternehmen / Ihre Einrichtung
          <input
            name="practice"
            autoComplete="organization"
            required
            minLength={2}
            maxLength={150}
            placeholder="Name Ihres Unternehmens"
          />
        </label>
        <label>
          E-Mail-Adresse
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="sie@ihr-unternehmen.de"
          />
        </label>
        <label>
          Telefon <span>(optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={50}
            placeholder="Für einen Rückruf"
          />
        </label>
      </div>
      <label>
        Was wünschen Sie sich für Ihren Empfang?
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={3}
          placeholder="Erzählen Sie uns kurz von Ihrem Unternehmen und Ihren Wünschen. Bitte keine sensiblen Kundendaten angeben."
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        Wir verwenden Ihre Angaben zur Bearbeitung Ihrer Anfrage. Mehr dazu in
        der <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      {state === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-light"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Wird gesendet …" : "Beratung anfragen"}
        <Icon name="arrow" />
      </button>
    </form>
  );
}
