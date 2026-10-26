"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  applyAnalyticsConsent,
  CONSENT_KEY,
  CONSENT_LIFETIME,
  openCookieSettings,
  readConsent,
  track,
  trackPage,
  type ConsentChoice,
} from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const banner = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function sync() {
      let current: ConsentChoice | null = null;
      try {
        current = readConsent(localStorage.getItem(CONSENT_KEY));
      } catch {
        /* Storage is optional. */
      }
      applyAnalyticsConsent(current);
      setChoice(current);
      setVisible(!current);
      setReady(true);
      trackPage();
    }
    const open = () => {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      setVisible(true);
    };
    const storage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) sync();
    };
    sync();
    window.addEventListener("storage", storage);
    window.addEventListener("codst:cookie-settings", open);
    const expiry = setInterval(() => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored && !readConsent(stored)) sync();
      } catch {
        /* A blocked store does not cancel this page's choice. */
      }
    }, 60_000);
    return () => {
      window.removeEventListener("storage", storage);
      window.removeEventListener("codst:cookie-settings", open);
      clearInterval(expiry);
    };
  }, []);

  useEffect(() => {
    if (visible && restoreFocus.current)
      banner.current?.querySelector("button")?.focus();
  }, [visible]);

  useEffect(() => {
    if (ready) trackPage();
  }, [pathname, ready, choice]);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    let interacted = false;
    let elapsed = 0;
    let previous = performance.now();
    let sent = false;
    const interaction = (event: Event) => {
      if (event.isTrusted) interacted = true;
    };
    const tick = () => {
      const now = performance.now();
      // visibilitychange resets the baseline, excluding time in a hidden tab.
      if (document.visibilityState === "visible")
        elapsed += Math.min(now - previous, 2000);
      previous = now;
      if (!sent && interacted && elapsed >= 15_000) {
        sent = true;
        track("site_engaged");
      }
    };
    const visibility = () => {
      previous = performance.now();
    };
    const click = (event: MouseEvent) => {
      if (!event.isTrusted || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.protocol === "mailto:" && url.pathname === "info@cod-st.com")
        track("cta_click", { button_name: "email_contact" });
      else if (url.origin === window.location.origin && url.hash === "#demo")
        track("cta_click", { button_name: "demo_navigation" });
      else if (
        url.origin === window.location.origin &&
        (url.hash === "#kontakt" || url.pathname === "/kontakt")
      )
        track("cta_click", { button_name: "contact_navigation" });
    };
    document.addEventListener("pointerdown", interaction, { passive: true });
    document.addEventListener("keydown", interaction);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("click", click);
    const timer = setInterval(tick, 1000);
    return () => {
      clearInterval(timer);
      document.removeEventListener("pointerdown", interaction);
      document.removeEventListener("keydown", interaction);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("click", click);
    };
  }, [ready, choice]);

  function choose(next: ConsentChoice) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ version: 1, choice: next, savedAt: Date.now() }),
      );
    } catch {
      /* Honor this choice for this page even when storage is blocked. */
    }
    applyAnalyticsConsent(next);
    setChoice(next);
    setVisible(false);
    trackPage();
    restoreFocus.current?.focus();
    restoreFocus.current = null;
  }

  if (!ready || !visible) return null;
  return (
    <section
      ref={banner}
      className="cookie-banner"
      aria-labelledby="cookie-heading"
      aria-describedby="cookie-description"
    >
      <div>
        <h2 id="cookie-heading">Dürfen wir unsere Website verbessern?</h2>
        <p id="cookie-description">
          Mit Ihrer Zustimmung messen Google Analytics und Google Tag Manager
          Besuche, Demo-Nutzung und erfolgreiche Anfragen. Ohne Zustimmung
          bleiben nur notwendige Funktionen aktiv. Ihre Auswahl gilt{" "}
          {CONSENT_LIFETIME / 86_400_000} Tage und ist jederzeit unter{" "}
          <Link href="/cookies">Cookies & Einstellungen</Link> änderbar.
        </p>
        {choice && (
          <p className="cookie-current">
            Aktuell:{" "}
            {choice === "accepted"
              ? "Statistik erlaubt"
              : "Nur notwendige Funktionen"}
            .
          </p>
        )}
      </div>
      <div className="cookie-actions">
        <button
          type="button"
          className="cookie-choice"
          onClick={() => choose("rejected")}
        >
          Nur notwendige
        </button>
        <button
          type="button"
          className="cookie-choice"
          onClick={() => choose("accepted")}
        >
          Statistik erlauben
        </button>
        <Link href="/datenschutz">Datenschutzhinweise</Link>
      </div>
    </section>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="button" onClick={openCookieSettings}>
      Cookie-Einstellungen ändern
    </button>
  );
}
