import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = {
  title: "Hinweise zur KI-Demo",
  alternates: { canonical: "/demo-hinweise" },
};
export default function Page() {
  return (
    <LegalPage title="Hinweise zur KI-Demo">
      <h2>Eine Vorschau auf den Praxisalltag</h2>
      <p>
        Sie sprechen mit einem KI-System von cod-st. Physiotherapie am Park,
        Zahnarztpraxis Lindenhof und Hausarztpraxis Sonnenallee sind
        ausschließlich fiktive Beispiele. Das Gespräch dient dazu,
        Sprachqualität und typische Rezeptionsabläufe kennenzulernen.
      </p>
      <h2>Keine echten Buchungen oder medizinische Beratung</h2>
      <p>
        Die Demo bucht keine echten Termine, versendet keine Praxisnachrichten
        und greift nicht auf echte Kalender oder Patientendaten zu. Sie stellt
        keine Diagnosen, empfiehlt keine Behandlung und ersetzt keinen
        ärztlichen Kontakt. Bei einem akuten lebensbedrohlichen Notfall wenden
        Sie sich an den Notruf 112.
      </p>
      <h2>Bitte nur erfundene Angaben</h2>
      <p>
        Verwenden Sie keine echten personenbezogenen Angaben, Gesundheitsdaten
        oder Informationen anderer Personen. Die KI kann Fehler machen. Aussagen
        der Demo über die fiktiven Praxen begründen keine Leistungs- oder
        Preiszusage für das Angebot von Code-Studio.
      </p>
      <h2>Dauer und Verfügbarkeit</h2>
      <p>
        Ein Gespräch dauert höchstens drei Minuten. Insgesamt sind zwei
        Demo-Leitungen gleichzeitig verfügbar. Sind beide belegt, können Sie
        warten oder abbrechen. Eine frei gewordene Leitung wird kurz reserviert
        und muss aktiv bestätigt werden. Bei Störungen oder zu hoher Auslastung
        kann die Demo vorübergehend pausieren.
      </p>
      <h2>Sprachverarbeitung</h2>
      <p>
        Das Mikrofon wird erst für die von Ihnen bestätigte Verbindung benötigt.
        Mit „Gespräch beenden“ können Sie die Demo jederzeit stoppen. Weitere
        Informationen zur Verarbeitung durch LiveKit und OpenAI finden Sie in
        der <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </LegalPage>
  );
}
