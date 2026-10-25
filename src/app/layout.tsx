import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.cod-st.com"),
  title: {
    default: "cod-st — KI-Telefonassistent für Ihre Praxis",
    template: "%s | cod-st",
  },
  description:
    "Mehr Zeit für Ihre Patientinnen und Patienten. Entdecken Sie die KI-Rezeption von cod-st und testen Sie drei Praxis-Demos direkt im Browser.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "cod-st",
    title: "Ihre Rezeption. Immer ansprechbar.",
    description:
      "KI-Telefonassistenz für den Praxisalltag. Jetzt im Browser ausprobieren.",
    images: ["/images/practice-reception.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={manrope.variable}>
        <a className="skip-link" href="#inhalt">
          Zum Inhalt
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
