import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = {
  title: "Cookies & Einstellungen",
  alternates: { canonical: "/cookies" },
};
export default function Page() {
  return (
    <LegalPage title="Cookies & Einstellungen">
      <h2>Nur das Nötige</h2>
      <p>
        Diese Website verwendet keine Analyse- oder Marketing-Cookies. Google
        Analytics und Google Tag Manager sind nicht eingebunden. Schriftarten
        und Bilder werden mit der Website ausgeliefert. Ein Zustimmungsbanner
        für optionale Tracker ist deshalb nicht erforderlich.
      </p>
      <h2>Demo-Sitzung</h2>
      <p>
        Erst wenn Sie die Sprachdemo starten, setzen wir das Cookie{" "}
        <strong>codst_demo</strong>. Es enthält eine zufällige Kennung zur
        Zuordnung Ihrer Sitzung und zur Vermeidung doppelter
        Warteschlangeneinträge. Die Laufzeit beträgt höchstens 24 Stunden. Das
        Cookie ist für den von Ihnen angeforderten Demo-Dienst notwendig, für
        JavaScript nicht lesbar und wird auf der veröffentlichten Website nur
        über HTTPS übertragen.
      </p>
      <h2>Ihre Einstellungen</h2>
      <p>
        Es gibt keine optionalen Kategorien einzuschalten. Sie können das
        Gespräch jederzeit mit „Gespräch beenden“ schließen und das Demo-Cookie
        in den Website-Daten Ihres Browsers löschen. Den Mikrofonzugriff können
        Sie separat über das Schloss- oder Website-Symbol Ihres Browsers
        widerrufen. Das Löschen des Cookies während einer laufenden Demo kann
        die Sitzungszuordnung unterbrechen; die Verbindung wird bei
        ausbleibendem Lebenszeichen automatisch beendet.
      </p>
      <p>
        Details zur Sprachverarbeitung und zu Ihren Rechten finden Sie in der{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </LegalPage>
  );
}
