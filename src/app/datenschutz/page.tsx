import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz" },
};
export default function Page() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p>
        Stand: 25. Oktober 2026. Diese Hinweise beschreiben die Verarbeitung auf
        dieser Website und in den öffentlichen Browser-Demos. Für eine spätere
        Einrichtung in einer echten Praxis werden die Datenverarbeitung und
        Verantwortlichkeiten gesondert vereinbart.
      </p>
      <h2>1. Verantwortlicher und Kontakt</h2>
      <p>
        Code-Studio, Rej Aliaj, Rue du Trône 100, 3rd floor, 1050 Brussels,
        Belgien. Bei Datenschutzfragen oder zur Ausübung Ihrer Rechte schreiben
        Sie an <a href="mailto:info@cod-st.com">info@cod-st.com</a>.
      </p>
      <h2>2. Website und technische Bereitstellung</h2>
      <p>
        Beim Aufruf werden technisch notwendige Verbindungsdaten verarbeitet,
        insbesondere IP-Adresse, Zeitpunkt, angefragte Seite,
        Browserinformationen und technische Fehler. Sie dienen der
        Bereitstellung, Sicherheit und Fehlerbehebung. Rechtsgrundlage ist unser
        berechtigtes Interesse an einem sicheren Webangebot nach Art. 6 Abs. 1
        lit. f DSGVO. Die Website wird bei Vercel bereitgestellt; der
        Demo-Dienst läuft auf einem Server bei DigitalOcean in Frankfurt.
        Zugriff erhalten nur die für Bereitstellung und Betrieb erforderlichen
        Dienstleister und berechtigten Personen.
      </p>
      <h2>3. Kontakt- und Beratungsanfragen</h2>
      <p>
        Wenn Sie uns kontaktieren, verarbeiten wir Name, Praxis, E-Mail-Adresse,
        gegebenenfalls Telefonnummer und Ihre Nachricht, um Ihre Anfrage zu
        beantworten. Rechtsgrundlage sind Art. 6 Abs. 1 lit. b DSGVO für
        vorvertragliche Anfragen und gegebenenfalls Art. 6 Abs. 1 lit. f DSGVO
        für sonstige geschäftliche Kommunikation. Der Versand erfolgt über
        Resend an info@cod-st.com. Eine Anfrage ist keine Newsletter-Anmeldung.
        Bitte senden Sie keine Patientendaten oder medizinischen Unterlagen.
      </p>
      <p>
        Wir bewahren geschäftliche Anfragen nur so lange auf, wie es zur
        Bearbeitung und gegebenenfalls zur Anbahnung oder Durchführung eines
        Vertrags nötig ist. Gesetzliche Aufbewahrungspflichten können eine
        längere Speicherung erfordern. Unzustellbare Anfragen werden nicht als
        erfolgreich versendet angezeigt.
      </p>
      <h2>4. Freiwillige KI-Sprachdemo</h2>
      <p>
        Die Demo beginnt erst auf Ihre ausdrückliche Auswahl und Bestätigung.
        Danach entscheiden Sie selbst, ob Sie dem Browser Mikrofonzugriff
        erlauben. In der Warteschlange wird kein Mikrofon-Audio übertragen.
        Während des Gesprächs wird Ihre Stimme über LiveKit an OpenAI zur
        Spracherkennung und Erzeugung gesprochener Antworten übertragen. Dabei
        werden Gesprächsinhalte und technische Verbindungsdaten verarbeitet. Die
        Grundlage für diese freiwillige Demo ist Ihre Einwilligung nach Art. 6
        Abs. 1 lit. a DSGVO. Sie können sie jederzeit für die Zukunft
        widerrufen, indem Sie das Gespräch beenden. Die Verarbeitung bis zum
        Widerruf bleibt davon unberührt.
      </p>
      <p>
        Mit Ihrer Einwilligung erstellen wir ein textliches Gesprächsprotokoll
        und erfassen Praxisprofil, Zeitpunkt, Dauer und Beendigungsstatus. Das
        Protokoll wird im geschützten Anrufverlauf abgelegt und per E-Mail an
        info@cod-st.com gesendet. Dies dient der Funktionskontrolle und
        Verbesserung unserer Rezeption. Es wird keine Nachricht an eine
        Beispielpraxis oder an einen Patienten gesendet. Die lokale
        Demo-Datenbank löscht Gesprächsprotokolle nach spätestens 30 Tagen.
        Kopien im geschützten Anrufverlauf und im E-Mail-Postfach werden
        regelmäßig auf ihre Erforderlichkeit geprüft und bei Wegfall des Zwecks
        gelöscht; Sie können eine Löschung unter info@cod-st.com anfragen. In
        der aktuell freigeschalteten Browser-Demo speichern wir selbst keine
        Audioaufnahmen. Die Verarbeitung durch Sprach- und Verbindungsanbieter
        ist weiterhin erforderlich. Anbieter können für Sicherheit,
        Missbrauchsprävention und gesetzliche Pflichten Daten nach ihren
        jeweiligen Bedingungen aufbewahren. Die Demo ist deshalb kein Angebot
        für vertrauliche Gesundheitsinformationen.
      </p>
      <p>
        OpenAI nennt für die Realtime-API standardmäßig eine Aufbewahrung von
        Missbrauchsschutzprotokollen für bis zu 30 Tage, sofern keine
        abweichende vertragliche Einstellung gilt oder eine längere gesetzliche
        Aufbewahrung erforderlich ist. Eine vollständige Löschung unmittelbar
        nach Gesprächsende können wir deshalb nicht zusagen. Einzelheiten
        beschreibt OpenAI in seinen{" "}
        <a
          href="https://developers.openai.com/api/docs/guides/your-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          Informationen zur API-Datenverarbeitung
        </a>
        .
      </p>
      <p>
        Verwenden Sie ausschließlich erfundene Angaben. Geben Sie keine echten
        Gesundheitsdaten, Versicherungsdaten oder Kontaktdaten an. Die KI gibt
        keine medizinische Beratung, trifft keine Entscheidungen mit rechtlicher
        Wirkung und bucht keine echten Termine. Es gibt keinen Zugriff auf echte
        Praxis- oder Patientensysteme.
      </p>
      <h2>5. Warteschlange und Missbrauchsschutz</h2>
      <p>
        Zur Vergabe von höchstens zwei Demo-Leitungen verarbeiten wir eine
        zufällige Sitzungskennung, die ausgewählte Demo, Wartestatus und
        Zeitstempel. Die IP-Adresse wird hierfür in eine nicht direkt lesbare,
        mit einem geheimen Schlüssel abgeleitete Kennung umgewandelt. Diese
        bleibt ein pseudonymes Datum. Beendete Demo-Sitzungsdaten werden
        innerhalb von 24 Stunden gelöscht. Davon getrennte Gesprächsprotokolle
        unterliegen den unter Ziffer 4 genannten Fristen. Kennungen für die
        Anrufbegrenzung nach zehn Minuten und für die Formularbegrenzung nach
        einer Stunde. Technische Betriebs- und Sicherheitsprotokolle der
        Hostinganbieter unterliegen deren Aufbewahrungsfristen und den geltenden
        Kontoeinstellungen.
      </p>
      <h2>6. Empfänger und internationale Verarbeitung</h2>
      <p>
        Eingesetzte Dienstleister sind Vercel (Website), DigitalOcean
        (Demo-Server), LiveKit (Sprachverbindung), OpenAI
        (KI-Sprachverarbeitung) und Resend (E-Mail-Versand). Je nach Dienst und
        Kontoeinstellungen kann die Verarbeitung außerhalb des Europäischen
        Wirtschaftsraums, insbesondere in den USA, stattfinden. Wir behaupten
        keine ausschließlich europäische Verarbeitung. Für Auftragsverarbeitung
        und Drittlandübermittlungen sind die jeweiligen Vereinbarungen und
        gegebenenfalls EU-Standardvertragsklauseln oder anwendbare
        Angemessenheitsbeschlüsse maßgeblich.
      </p>
      <p>
        Weitere Informationen:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </a>
        ,{" "}
        <a
          href="https://www.digitalocean.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          DigitalOcean
        </a>
        ,{" "}
        <a
          href="https://livekit.io/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          LiveKit
        </a>
        ,{" "}
        <a
          href="https://openai.com/policies/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenAI
        </a>{" "}
        und{" "}
        <a
          href="https://resend.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resend
        </a>
        .
      </p>
      <h2>7. Cookies und lokale Speicherung</h2>
      <p>
        Wir setzen keine Analyse- oder Marketing-Tracker ein. Für eine von Ihnen
        gestartete Demo wird ein technisch notwendiges Cookie mit einer
        zufälligen Kennung für höchstens 24 Stunden verwendet. Es verhindert
        doppelte Warteschlangeneinträge und ordnet Ihre Verbindung zu. Es
        enthält keine Gesprächsinhalte. Mehr unter{" "}
        <Link href="/cookies">Cookies & Einstellungen</Link>.
      </p>
      <h2>8. Ihre Rechte</h2>
      <p>
        Sie haben im gesetzlichen Rahmen Rechte auf Auskunft, Berichtigung,
        Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
        Widerspruch gegen eine auf berechtigtes Interesse gestützte
        Verarbeitung. Eine Einwilligung können Sie jederzeit für die Zukunft
        widerrufen. Zur Anfrage genügt eine E-Mail an info@cod-st.com. Außerdem
        können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren,
        insbesondere bei der belgischen Datenschutzbehörde{" "}
        <a
          href="https://www.autoriteprotectiondonnees.be"
          target="_blank"
          rel="noopener noreferrer"
        >
          Autorité de protection des données
        </a>
        .
      </p>
    </LegalPage>
  );
}
