import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Analytics } from "@/components/Analytics";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.cod-st.com"),
  referrer: "strict-origin",
  title: {
    default: "cod-st — KI-Rezeption: Keinen Anruf mehr verpassen",
    template: "%s | cod-st",
  },
  description:
    "Keinen Anruf mehr verpassen: Ihre KI-Rezeption nimmt rund um die Uhr Anrufe an, beantwortet Fragen und koordiniert Termine. Für Praxen, Dienstleister und Unternehmen. Jetzt live testen.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "cod-st",
    title: "Keinen Anruf mehr verpassen. Mit der KI-Rezeption von cod-st.",
    description:
      "Anrufe annehmen, Termine koordinieren und Kunden helfen – auch wenn Ihr Team gerade nicht erreichbar ist. Jetzt direkt im Browser ausprobieren.",
    images: ["/images/practice-reception.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body className={manrope.variable}>
        <a className="skip-link" href="#inhalt">
          Zum Inhalt
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
