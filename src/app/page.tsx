import Image from "next/image";
import { Icon } from "@/components/Icons";
import { DemoExperience } from "@/components/DemoExperience";
import { ContactForm } from "@/components/ContactForm";

const capabilities = [
  [
    "phone",
    "Anrufe annehmen",
    "Anrufer freundlich begrüßen, Anliegen verstehen und den nächsten Schritt einleiten.",
  ],
  [
    "clock",
    "24 Stunden erreichbar",
    "Auch abends, am Wochenende und an Feiertagen für Ihre Kunden da sein.",
  ],
  [
    "calendar",
    "Termine buchen",
    "Verfügbare Zeiten prüfen und Termine direkt im angebundenen Kalender vereinbaren.",
  ],
  [
    "website",
    "Auf Ihrer Website helfen",
    "Besucher direkt im Browser beraten – mit derselben Assistenz wie am Telefon.",
  ],
  [
    "check",
    "Termine bestätigen",
    "Vereinbarte Termine bestätigen und passende Erinnerungen versenden.",
  ],
  [
    "info",
    "Auskünfte geben",
    "Öffnungszeiten, Leistungen, Preise und Abläufe aus Ihrem Unternehmenswissen erklären.",
  ],
  [
    "globe",
    "Mehrsprachig sprechen",
    "Kunden in verschiedenen Sprachen empfangen und verständlich weiterhelfen.",
  ],
  [
    "briefcase",
    "Vertriebsanfragen bearbeiten",
    "Leistungen erklären, Interessenten qualifizieren und Beratungstermine vereinbaren.",
  ],
  [
    "calendar",
    "Kalender organisieren",
    "Verfügbarkeiten abgleichen, Termine koordinieren und Änderungen berücksichtigen.",
  ],
  [
    "mail",
    "E-Mails versenden",
    "Bestätigungen, Informationen und Gesprächsübersichten per E-Mail verschicken.",
  ],
  [
    "message",
    "WhatsApp-Nachrichten senden",
    "Bestätigungen und Erinnerungen über Ihre WhatsApp-Business-Anbindung senden.",
  ],
  [
    "settings",
    "Individuell konfigurieren",
    "Stimme, Sprache, Wissen und Abläufe genau auf Ihr Unternehmen abstimmen.",
  ],
];

const forwardingOptions = [
  [
    "Wenn besetzt ist",
    "Ihr Team telefoniert bereits? Die KI nimmt den nächsten Anruf entgegen.",
  ],
  [
    "Wenn niemand abnimmt",
    "Nach der vereinbarten Klingelzeit übernimmt Ihre KI-Rezeption.",
  ],
  [
    "Nach Feierabend",
    "Außerhalb Ihrer Öffnungszeiten, am Wochenende oder in Ihren Pausen.",
  ],
  [
    "Bei jedem Anruf",
    "Leiten Sie alle Anrufe direkt an Ihre KI-Rezeption weiter.",
  ],
];

const faqs = [
  [
    "Ist die KI-Rezeption nur für Arzt- und Therapiepraxen?",
    "Nein. Die drei Praxen sind Beispiele zum Ausprobieren. Wir richten die KI-Rezeption ebenso für Handwerk, Handel, Immobilien, Hotellerie und andere Dienstleister ein – mit dem Wissen, den Sprachen und den Abläufen Ihres Unternehmens.",
  ],
  [
    "Kann ich die Stimme wirklich ausprobieren?",
    "Ja. Wählen Sie eine der drei fiktiven Praxen und sprechen Sie direkt im Browser mit der KI. Sie benötigen nur ein Mikrofon. Es wird kein Telefonanruf ausgelöst und keine Telefonnummer abgefragt.",
  ],
  [
    "Bucht die Demo einen echten Termin?",
    "Nein. Alle Praxisdaten und Terminabläufe sind Beispiele. Bitte verwenden Sie ausschließlich erfundene Angaben. Die Demo hat keinen Zugriff auf echte Kalender oder Patientendaten.",
  ],
  [
    "Kann ich meine bestehende Telefonnummer behalten?",
    "Ja. Über eine passende Rufumleitung kann die KI unter Ihrer bestehenden Nummer übernehmen: wenn besetzt ist, niemand abnimmt, nach Feierabend oder bei allen Anrufen. Die Einrichtung stimmen wir mit Ihrem Telefonanbieter oder Ihrer Telefonanlage ab. Auf Wunsch richten wir auch eine neue Rufnummer ein.",
  ],
  [
    "Wie werden meine Daten verarbeitet?",
    "Die freiwillige Demo verarbeitet Ihre Stimme und erstellt ein Gesprächsprotokoll. Code-Studio erhält Anrufdaten und Transkript per E-Mail zur Qualitätsprüfung. Verwenden Sie nur erfundene Angaben. Einzelheiten stehen in der Datenschutzerklärung.",
  ],
  [
    "Was passiert, wenn die KI etwas nicht weiß?",
    "Sie soll nachfragen oder ihre Grenze offen benennen. Wir legen gemeinsam fest, welche Anliegen sie bearbeiten darf und wann Ihr Team übernehmen soll. Die Browser-Demo kann keine Person weiterverbinden und gibt keine medizinischen Ratschläge.",
  ],
  [
    "Kann die KI Termine buchen und Nachrichten senden?",
    "Ja, mit den passenden Anbindungen und Ihren freigegebenen Abläufen. Wir prüfen Ihre Kalenderlösung, E-Mail und WhatsApp Business und richten die gewünschten Buchungen, Bestätigungen und Erinnerungen ein. Die Browser-Demos führen keine echten Buchungen durch und versenden keine Nachrichten an Anrufer.",
  ],
  [
    "Was kostet die Lösung für mein Unternehmen?",
    "Sie erhalten ein individuelles Angebot, passend zu Anrufaufkommen, gewünschten Abläufen und Einrichtung. Fragen Sie uns unverbindlich an.",
  ],
];

export default function Home() {
  return (
    <main id="inhalt">
      <section className="hero">
        <Image
          src="/images/practice-reception.png"
          alt="Ruhiger, heller Empfang einer modernen Praxis"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot" /> KI-REZEPTION FÜR IHR UNTERNEHMEN
          </p>
          <h1>
            Keinen Anruf
            <br />
            <span>mehr verpassen.</span>
          </h1>
          <p className="hero-description">
            Anrufe annehmen. Kunden weiterhelfen.
            <br />
            Rund um die Uhr – auch wenn Ihr Team nicht erreichbar ist.
          </p>
          <div className="hero-actions">
            <a className="button" href="#demo">
              Jetzt live testen <Icon name="arrow" />
            </a>
            <a className="text-link" href="#kontakt">
              Beratung anfragen <span>↗︎</span>
            </a>
          </div>
          <p className="microcopy">
            <Icon name="mic" width="15" height="15" /> Direkt im Browser. Ohne
            Telefonnummer.
          </p>
        </div>
        <div className="hero-caption">
          <span className="mini-line" /> Jeder Anruf kann Ihr nächster Kunde
          sein.
        </div>
      </section>
      <div className="intro-line">
        <p>
          Für Praxen, Dienstleister und Unternehmen –{" "}
          <strong>überall, wo Kunden anrufen.</strong>
        </p>
        <span>
          Gesundheit <i /> Dienstleistung <i /> Handel
        </span>
      </div>
      <DemoExperience />
      <section
        className="capabilities section-pad"
        id="vorteile"
        aria-labelledby="capabilities-title"
      >
        <div className="section-heading horizontal">
          <div>
            <p className="eyebrow">WAS IHRE KI-REZEPTION ÜBERNEHMEN KANN</p>
            <h2 id="capabilities-title">
              Mehr als
              <br />
              <span className="muted">Anrufe annehmen.</span>
            </h2>
          </div>
          <p>
            Vom ersten Kontakt bis zum organisierten Termin. Wir richten Ihre
            Assistenz auf die Aufgaben Ihres Unternehmens ein.
          </p>
        </div>
        <ul className="capability-list">
          {capabilities.map(([icon, title, copy]) => (
            <li key={title}>
              <Icon name={icon} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="capability-note">
          Der Funktionsumfang richtet sich nach Ihrer Einrichtung und den
          angebundenen Systemen. Die Browser-Demos zeigen Beispielgespräche ohne
          echte Buchungen oder Nachrichten.
        </p>
      </section>
      <section
        className="integrations section-pad"
        id="integration"
        aria-labelledby="integration-title"
      >
        <div className="integration-heading">
          <div>
            <p className="eyebrow">EINFACH AN IHREN ALLTAG ANGEBUNDEN</p>
            <h2 id="integration-title">
              Ihre Nummer.
              <br />
              <span>Ihre Regeln.</span>
            </h2>
          </div>
          <div className="integration-intro">
            <p>
              Bleiben Sie unter Ihrer gewohnten Telefonnummer erreichbar. Sie
              entscheiden, wann Ihre KI-Rezeption übernimmt.
            </p>
            <div
              className="routing-path"
              role="img"
              aria-label="Von Ihrer Rufnummer per Rufumleitung zur KI-Rezeption"
            >
              <span>
                <Icon name="phone" /> Ihre Rufnummer
              </span>
              <Icon name="arrow" />
              <span>
                <Icon name="mic" /> KI-Rezeption
              </span>
            </div>
            <small>Per Rufumleitung. Ihr bestehender Anschluss bleibt.</small>
          </div>
        </div>
        <dl className="routing-modes">
          {forwardingOptions.map(([title, copy], i) => (
            <div key={title}>
              <dt>
                <span aria-hidden="true">0{i + 1}</span>
                {title}
              </dt>
              <dd>{copy}</dd>
            </div>
          ))}
        </dl>
        <div className="new-number">
          <Icon name="phone" />
          <div>
            <h3>Lieber eine neue Rufnummer?</h3>
            <p>
              Auf Wunsch richten wir eine eigene Nummer für Ihr Unternehmen ein
              – zusätzlich zu Ihrem Anschluss oder für einen neuen Start.
            </p>
          </div>
          <a className="text-link" href="#kontakt">
            Anbindung besprechen <Icon name="arrow" />
          </a>
        </div>
        <p className="integration-detail">
          Die Weiterleitung stimmen wir mit Ihrem Telefonanbieter oder Ihrer
          Telefonanlage ab. Kalender, E-Mail und WhatsApp binden wir passend zu
          Ihren Abläufen an.
        </p>
      </section>
      <section className="process section-pad" id="ablauf">
        <div className="section-heading horizontal">
          <div>
            <p className="eyebrow">PERSÖNLICH EINGERICHTET</p>
            <h2>
              Ihr Unternehmen.
              <br />
              Ihr Empfang.
            </h2>
          </div>
          <p>
            Kein System von der Stange.
            <br />
            Wir richten die Assistenz auf Ihren Alltag aus.
          </p>
        </div>
        <div className="process-steps">
          {[
            [
              "Verstehen",
              "Wir besprechen Ihre Anrufe, Ihr Team und die Aufgaben, die Sie abgeben möchten.",
            ],
            [
              "Einrichten",
              "Wir konfigurieren Unternehmenswissen, Gesprächsführung und die passenden Anbindungen.",
            ],
            [
              "Gemeinsam starten",
              "Sie testen die Abläufe. Danach begleiten wir die Einführung in Ihren Unternehmensalltag.",
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="faq-section section-pad" id="fragen">
        <div>
          <p className="eyebrow">GUT ZU WISSEN</p>
          <h2>
            Noch eine
            <br />
            Frage offen?
          </h2>
          <a className="text-link" href="mailto:info@cod-st.com">
            Sprechen wir darüber <span>↗︎</span>
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span className="faq-plus">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="contact-section section-pad" id="kontakt">
        <div className="contact-intro">
          <p className="eyebrow">DER NÄCHSTE SCHRITT</p>
          <h2>
            Erreichbar bleiben.
            <br />
            Kunden gewinnen.
            <br />
            <span>Reden wir darüber.</span>
          </h2>
          <p>
            Erzählen Sie uns von Ihrem Unternehmen. Wir besprechen, wie Ihre
            KI-Rezeption Anrufe auffängt und Ihr Team entlastet.
          </p>
          <div className="offer-line">
            <span>Individuelles Angebot</span>
            <span>Unverbindliche Anfrage</span>
          </div>
          <a href="mailto:info@cod-st.com" className="contact-mail">
            info@cod-st.com ↗︎
          </a>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
