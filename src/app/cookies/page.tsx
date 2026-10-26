import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/Analytics";
export const metadata: Metadata = {
  title: "Cookies & Einstellungen",
  alternates: { canonical: "/cookies" },
};
export default function Page() {
  return (
    <LegalPage title="Cookies & Einstellungen">
      <h2>Website-Statistik</h2>
      <p>
        Google Analytics und Google Tag Manager werden beim Besuch automatisch
        geladen, sofern Sie die Statistik nicht deaktiviert haben. Es erscheint
        kein Statistik-Popup. Die Demo und das Kontaktformular funktionieren
        auch bei deaktivierter Statistik. Schriftarten und Bilder werden mit
        der Website ausgeliefert.
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
        Ihre Auswahl speichern wir unter{" "}
        <strong>codst_analytics_consent_v1</strong> im lokalen Browserspeicher
        für höchstens 180 Tage, wenn Sie die Einstellung ändern. Frühere
        Ablehnungen bleiben gültig. Sie können die Statistik hier jederzeit
        deaktivieren. Dies stoppt die weitere Messung und entfernt unsere
        Google-Analytics-Cookies, ohne ein laufendes Gespräch zu beenden.
        Bereits übermittelte Daten werden dadurch nicht automatisch gelöscht.
      </p>
      <CookieSettingsButton />
      <h2>Welche Daten werden gemessen?</h2>
      <p>
        Wir messen Seitenaufrufe, ausgewählte
        Schaltflächen, die Nutzung der drei Browser-Demos, Gesprächsdauer und
        erfolgreiche Beratungsanfragen. Google Analytics setzt dafür Cookies mit
        Namen
        <strong> _ga</strong> und <strong>_ga_…</strong> mit einer
        konfigurierten Laufzeit von höchstens 90 Tagen. Sie enthalten pseudonyme
        Kennungen. Formularinhalte und Gesprächsprotokolle senden wir nicht an
        Google Analytics. Werbe- und Remarketing-Funktionen sind nicht
        aktiviert.
      </p>
      <h2>Demo beenden</h2>
      <p>
        Sie können das Gespräch jederzeit mit „Gespräch beenden“ schließen und
        das Demo-Cookie in den Website-Daten Ihres Browsers löschen. Den
        Mikrofonzugriff können Sie separat über das Schloss- oder Website-Symbol
        Ihres Browsers widerrufen. Das Löschen des Cookies während einer
        laufenden Demo kann die Sitzungszuordnung unterbrechen; die Verbindung
        wird bei ausbleibendem Lebenszeichen automatisch beendet.
      </p>
      <p>
        Details zur Sprachverarbeitung und zu Ihren Rechten finden Sie in der{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </LegalPage>
  );
}
