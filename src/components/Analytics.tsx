"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  applyAnalyticsPreference,
  CONSENT_KEY,
  readConsent,
  track,
  trackPage,
  type ConsentChoice,
} from "@/lib/analytics";

function currentPreference(event?: Event): ConsentChoice | null {
  if (
    event instanceof CustomEvent &&
    event.type === "codst:analytics-preference" &&
    ["accepted", "rejected"].includes(event.detail)
  )
    return event.detail;
  try {
    return readConsent(localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function sync(event?: Event) {
      const current = currentPreference(event);
      applyAnalyticsPreference(current);
      setChoice(current);
      setReady(true);
      trackPage();
    }
    const storage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) sync();
    };
    sync();
    window.addEventListener("storage", storage);
    window.addEventListener("codst:analytics-preference", sync);
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
      window.removeEventListener("codst:analytics-preference", sync);
      clearInterval(expiry);
    };
  }, []);

  useEffect(() => {
    if (ready) trackPage();
  }, [pathname, ready, choice]);

  useEffect(() => {
    if (!ready || choice === "rejected") return;
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

  return null;
}

export function CookieSettingsButton() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  useEffect(() => {
    const sync = (event?: Event) => {
      setChoice(currentPreference(event));
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("codst:analytics-preference", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("codst:analytics-preference", sync);
    };
  }, []);

  function choose(next: ConsentChoice) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ version: 1, choice: next, savedAt: Date.now() }),
      );
    } catch {
      /* Honor this choice for this page even when storage is blocked. */
    }
    applyAnalyticsPreference(next);
    setChoice(next);
    trackPage();
    window.dispatchEvent(
      new CustomEvent("codst:analytics-preference", { detail: next }),
    );
  }

  return (
    <div>
      <p role="status">
        Website-Statistik: {choice === "rejected" ? "deaktiviert" : "aktiv"}.
      </p>
      <button
        type="button"
        className="button"
        onClick={() => choose(choice === "rejected" ? "accepted" : "rejected")}
      >
        {choice === "rejected" ? "Statistik aktivieren" : "Statistik deaktivieren"}
      </button>
    </div>
  );
}
