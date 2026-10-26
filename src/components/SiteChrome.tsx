import Link from "next/link";
import { Icon } from "./Icons";
export function Logo() {
  return (
    <span className="wordmark">
      cod-st<span className="brand-dot">.</span>
    </span>
  );
}
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" aria-label="cod-st Startseite">
        <Logo />
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/#vorteile">Funktionen</Link>
        <Link href="/#integration">Anbindung</Link>
        <Link href="/#ablauf">So funktioniert’s</Link>
        <Link href="/#fragen">Fragen</Link>
      </nav>
      <Link href="/#demo" className="button button-small">
        Live testen <Icon name="arrow" width="17" height="17" />
      </Link>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" aria-label="cod-st Startseite">
          <Logo />
        </Link>
        <p>Ein guter Empfang beginnt mit Zuhören.</p>
        <a href="mailto:info@cod-st.com">info@cod-st.com</a>
      </div>
      <div className="footer-links">
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/cookies">Cookies & Einstellungen</Link>
        <Link href="/demo-hinweise">Demo-Hinweise</Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Code-Studio · Belgien</span>
        <span>KI-Rezeption für Unternehmen mit Kundenkontakt.</span>
      </div>
    </footer>
  );
}
