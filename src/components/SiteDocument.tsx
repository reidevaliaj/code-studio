import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@/components/Analytics";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export function SiteDocument({
  lang,
  children,
}: {
  lang: "de" | "it";
  children: ReactNode;
}) {
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={manrope.variable}>
        <a className="skip-link" href="#inhalt">
          {lang === "it" ? "Vai al contenuto" : "Zum Inhalt"}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
