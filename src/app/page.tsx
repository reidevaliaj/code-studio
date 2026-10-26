import Image from "next/image";
import { Icon } from "@/components/Icons";
import { DemoExperience } from "@/components/DemoExperience";
import { ContactForm } from "@/components/ContactForm";

const faqs = [
  [
    "Was übernimmt der KI-Telefonassistent?",
    "Er kann Anrufe entgegennehmen, wiederkehrende Fragen beantworten und Terminwünsche strukturiert aufnehmen. Welche Abläufe und Schnittstellen für Ihre Praxis passen, klären wir gemeinsam vor der Einrichtung.",
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
    "Wir prüfen Ihre Telefonanlage und die passende Weiterleitung im persönlichen Gespräch. Die Browser-Demo funktioniert unabhängig von Ihrem Telefonanbieter.",
  ],
  [
    "Wie werden meine Daten verarbeitet?",
    "Die freiwillige Demo verarbeitet Ihre Stimme und erstellt ein Gesprächsprotokoll. Code-Studio erhält Anrufdaten und Transkript per E-Mail zur Qualitätsprüfung. Verwenden Sie nur erfundene Angaben. Einzelheiten stehen in der Datenschutzerklärung.",
  ],
  [
    "Was passiert, wenn die KI etwas nicht weiß?",
    "Sie soll nachfragen oder ihre Grenze offen benennen. In Ihrer Praxis legen wir fest, welche Anliegen sie aufnehmen darf und wann Ihr Team übernehmen soll. Die Demo kann keine Person weiterverbinden und gibt keine medizinischen Ratschläge.",
  ],
  [
    "Brauche ich dafür einen neuen Praxiskalender?",
    "Für Praxisinformationen und die Aufnahme von Anliegen ist kein Kalenderwechsel erforderlich. Eine verbindliche Terminbuchung setzt eine passende, freigegebene Kalenderanbindung voraus. Wir prüfen Ihre vorhandene Software, bevor wir eine Integration zusagen.",
  ],
  [
    "Was kostet die Lösung für meine Praxis?",
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
            <span className="status-dot" /> KI-TELEFONASSISTENZ FÜR PRAXEN
          </p>
          <h1>
            Ihre Rezeption.
            <br />
            <span>Immer ansprechbar.</span>
          </h1>
          <p className="hero-description">
            Anrufe annehmen. Anliegen verstehen.
            <br />
            Mehr Zeit für die Menschen in Ihrer Praxis.
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
          <span className="mini-line" /> Technik, die Ihnen den Rücken freihält.
        </div>
      </section>
      <div className="intro-line">
        <p>
          Für Praxen, in denen{" "}
          <strong>Menschen an erster Stelle stehen.</strong>
        </p>
        <span>
          Physiotherapie <i /> Zahnmedizin <i /> Allgemeinmedizin
        </span>
      </div>
      <DemoExperience />
      <section
        className="call-results section-pad"
        aria-labelledby="call-results-title"
      >
        <div>
          <p className="eyebrow">VOM GESPRÄCH ZUM ÜBERBLICK</p>
          <h2 id="call-results-title">
            Aufgenommen.
            <br />
            <span className="muted">Nachvollziehbar.</span>
          </h2>
          <p className="results-copy">
            Nach dem Anruf bleiben die wichtigen Informationen bei Ihnen:
            Gesprächsverlauf, Zeitpunkt und Anliegen gesammelt im
            Anrufprotokoll. So kann Ihr Team den nächsten Schritt übernehmen.
          </p>
          <ul className="results-points">
            <li>
              <Icon name="check" /> Gesprächsprotokoll per E-Mail
            </li>
            <li>
              <Icon name="check" /> Praxiswissen und Abläufe individuell
              festlegen
            </li>
            <li>
              <Icon name="check" /> Klare Grenzen statt unbestätigter Buchungen
            </li>
          </ul>
        </div>
        <article
          className="sample-call"
          aria-label="Beispiel eines Anrufprotokolls"
        >
          <div className="sample-call-top">
            <span>BEISPIEL · ANRUFPROTOKOLL</span>
            <Icon name="phone" />
          </div>
          <p className="sample-call-category">Terminwunsch</p>
          <h3>
            Ein Anliegen.
            <br />
            Alles an einem Platz.
          </h3>
          <dl>
            <div>
              <dt>Praxis</dt>
              <dd>Physiotherapie</dd>
            </div>
            <div>
              <dt>Anliegen</dt>
              <dd>Manuelle Therapie</dd>
            </div>
            <div>
              <dt>Wunschzeit</dt>
              <dd>Donnerstag, nachmittags</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Wunsch aufgenommen</dd>
            </div>
          </dl>
          <p className="sample-call-note">
            <Icon name="check" /> Nachlesen statt zurückfragen.
          </p>
          <small>Fiktives Beispiel. Keine bestätigte Terminbuchung.</small>
        </article>
      </section>
      <section className="benefits section-pad" id="vorteile">
        <div className="section-heading">
          <p className="eyebrow">WENIGER UNTERBRECHUNGEN. MEHR RUHE.</p>
          <h2>
            Ein offenes Ohr.
            <br />
            Auch wenn Sie gerade
            <br />
            <span className="muted">alle Hände voll haben.</span>
          </h2>
        </div>
        <div className="benefit-list">
          {[
            [
              "phone",
              "Anliegen bekommen einen Platz.",
              "Die KI nimmt Anrufe entgegen und führt freundlich durch das Gespräch – mit den Informationen Ihrer Praxis.",
            ],
            [
              "clock",
              "Ihr Team bleibt im Moment.",
              "Wiederkehrende Fragen zu Öffnungszeiten, Leistungen oder dem Praxisablauf müssen nicht jedes Mal Ihren Empfang unterbrechen.",
            ],
            [
              "shield",
              "Sie bestimmen den Rahmen.",
              "Wir stimmen Sprache, Begrüßung und erlaubte Abläufe gemeinsam ab. Medizinische Beratung gehört nicht zur Aufgabe der KI.",
            ],
          ].map(([icon, title, copy], i) => (
            <article key={title}>
              <div className="benefit-icon">
                <Icon name={icon} />
              </div>
              <div>
                <span className="index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="process section-pad" id="ablauf">
        <div className="section-heading horizontal">
          <div>
            <p className="eyebrow">PERSÖNLICH EINGERICHTET</p>
            <h2>
              Ihre Praxis.
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
              "Wir konfigurieren Praxiswissen, Gesprächsführung und die passende Anbindung.",
            ],
            [
              "Gemeinsam starten",
              "Sie testen die Abläufe. Danach begleiten wir die Einführung in Ihren Praxisalltag.",
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="integration-note">
          <Icon name="phone" />
          <p>
            <strong>Ihre Nummer. Ihr Praxisalltag.</strong> Wir prüfen Ihre
            Telefonanlage, richten die passende Weiterleitung ein und stimmen
            Öffnungszeiten, Praxiswissen und Übergaben mit Ihnen ab. Kalender-
            und Praxissoftware-Anbindungen klären wir individuell.
          </p>
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
            Mehr Ruhe
            <br />
            am Empfang.
            <br />
            <span>Reden wir darüber.</span>
          </h2>
          <p>
            Erzählen Sie uns von Ihrer Praxis. Wir besprechen, ob und wie eine
            KI-Rezeption Sie unterstützen kann.
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
