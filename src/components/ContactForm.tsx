"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icons";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(
          data.error ||
            "Die Nachricht konnte nicht gesendet werden. Bitte schreiben Sie an info@cod-st.com.",
        );
      setState("sent");
      form.reset();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Bitte versuchen Sie es erneut.",
      );
      setState("error");
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
    <form className="contact-form" onSubmit={submit}>
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
          Ihre Praxis
          <input
            name="practice"
            autoComplete="organization"
            required
            minLength={2}
            maxLength={150}
            placeholder="Name der Praxis"
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
            placeholder="sie@ihre-praxis.de"
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
          placeholder="Erzählen Sie uns kurz von Ihrer Praxis und Ihrem Anliegen. Bitte keine Patientendaten angeben."
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
