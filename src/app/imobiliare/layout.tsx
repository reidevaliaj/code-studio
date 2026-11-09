import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { Logo } from "@/components/SiteChrome";
import { SiteDocument } from "@/components/SiteDocument";
import styles from "./imobiliare.module.css";

const home = "/imobiliare";
const title = "Soluzioni per agenzie immobiliari | Code-Studio";
const description =
  "Siti web, pubblicazione automatica degli annunci, social media, video e assistenza clienti per agenzie immobiliari. Scoprite servizi e prezzi indicativi.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cod-st.com"),
  referrer: "strict-origin",
  title,
  description,
  alternates: { canonical: home },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: home,
    siteName: "Code-Studio",
    title,
    description,
    images: ["/images/immobiliare-hero.webp"],
  },
};

export default function ImmobiliareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteDocument lang="it">
      <header className={`site-header ${styles.header}`}>
        <a href="#inizio" aria-label="Code-Studio, home immobiliare">
          <Logo />
        </a>
        <nav aria-label="Navigazione principale">
          <a href="#inizio" aria-current="page">
            Home
          </a>
          <a className={styles.desktopNav} href="#servizi">
            Servizi
          </a>
          <a className={styles.desktopNav} href="#come-lavoriamo">
            Come lavoriamo
          </a>
          <a className={styles.desktopNav} href="#contatti">
            Contatti
          </a>
        </nav>
        <a href="#contatti" className="button button-small">
          Parliamone <Icon name="arrow" width="17" height="17" />
        </a>
      </header>
      {children}
      <footer className="site-footer">
        <div>
          <a href="#inizio" aria-label="Code-Studio, home immobiliare">
            <Logo />
          </a>
          <p>Soluzioni digitali per il settore immobiliare.</p>
        </div>
        <nav className="footer-links" aria-label="Collegamenti a piè di pagina">
          <a href="#inizio">Home</a>
          <a href="#servizi">Servizi</a>
          <a href="#come-lavoriamo">Come lavoriamo</a>
          <a href="#contatti">Contatti</a>
          <Link href="/datenschutz">Privacy (in tedesco)</Link>
          <Link href="/cookies">Cookie (in tedesco)</Link>
        </nav>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Code-Studio</span>
          <span>Tirana, Albania</span>
        </div>
      </footer>
    </SiteDocument>
  );
}
