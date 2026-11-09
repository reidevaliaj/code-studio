import Image from "next/image";
import { Icon } from "@/components/Icons";
import { ServiceExample } from "./ServiceExample";
import { services } from "./services";
import styles from "./imobiliare.module.css";

const projectSteps = [
  ["Raccontateci come lavorate", "Partiamo dal sito, dai portali o dagli strumenti che usate oggi e dall’attività che vi fa perdere più tempo."],
  ["Definiamo il primo intervento", "Vi proponiamo cosa realizzare, con un preventivo che chiarisce cosa è incluso e quali strumenti servono."],
  ["Mettiamolo in funzione", "Una volta concordato il lavoro, realizziamo il servizio e lo proviamo insieme su un caso della vostra agenzia."],
];

export default function ImmobiliarePage() {
  return (
    <main id="inhalt">
      <section
        id="inizio"
        className={`hero ${styles.hero}`}
        aria-labelledby="hero-title"
      >
        <Image
          src="/images/immobiliare-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot" /> SOLUZIONI PER AGENZIE IMMOBILIARI
          </p>
          <h1 id="hero-title">
            Più tempo per
            <br />
            <span>le visite.</span>
          </h1>
          <p className="hero-description">
            Presentate meglio gli immobili, pubblicate gli annunci una sola
            volta e gestite le richieste con meno lavoro manuale.
          </p>
          <div className="hero-actions">
            <a className="button" href="#servizi">
              Esplorate i servizi <Icon name="arrow" />
            </a>
            <a className="text-link" href="#contatti">
              Parlate con Rei <Icon name="arrow" width="17" height="17" />
            </a>
          </div>
        </div>
      </section>

      <div className={`intro-line ${styles.intro}`}>
        <p>
          <strong>Code-Studio</strong> · Esperienza tecnica e prezzi accessibili,
          da Tirana, in Albania.
        </p>
        <span>Siti web <i /> Automazioni <i /> AI</span>
      </div>

      <section id="servizi" className={`section-pad ${styles.directory}`} aria-labelledby="servizi-title">
        <div className="section-heading horizontal">
          <div>
            <p className="eyebrow">SERVIZI PER LA VOSTRA AGENZIA</p>
            <h2 id="servizi-title">Dall’annuncio alla visita.</h2>
          </div>
          <p>
            Scegliete da dove partire. Potete affidarci anche un solo servizio,
            in base alle priorità della vostra agenzia.
          </p>
        </div>
        <nav className={styles.serviceNav} aria-label="Esplora i servizi">
          {services.map(({ id, menu }, index) => (
            <a key={id} href={`#${id}`}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {menu}
              <Icon name="arrow" width="16" height="16" />
            </a>
          ))}
        </nav>
      </section>

      <div className={styles.services}>
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={styles.service}
            aria-labelledby={`${service.id}-title`}
          >
            <div className={styles.serviceInner}>
              <div className={styles.serviceCopy}>
                <p className={`eyebrow ${styles.serviceLabel}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {service.title}
                </p>
                <h2 id={`${service.id}-title`}>{service.headline}</h2>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.details} role="list">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>
                      <Icon name="check" width="18" height="18" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.note}>{service.note}</p>
                <div className={styles.serviceOffer}>
                  <div>
                    {service.price !== "Su preventivo" && <span>Prezzo indicativo</span>}
                    <strong>{service.price}</strong>
                  </div>
                  <a
                    className="text-link"
                    href={`mailto:info@cod-st.com?subject=${encodeURIComponent(service.title)}`}
                    aria-label={`Chiedete un preventivo per ${service.title}`}
                  >
                    Chiedete un preventivo <Icon name="arrow" width="17" height="17" />
                  </a>
                </div>
              </div>
              <ServiceExample service={service.id} />
            </div>
          </section>
        ))}
      </div>

      <section
        id="come-lavoriamo"
        className={`section-pad ${styles.process}`}
        aria-labelledby="process-title"
      >
        <div className="section-heading">
          <p className="eyebrow">COME LAVORIAMO</p>
          <h2 id="process-title">Iniziamo da ciò che vi serve.</h2>
        </div>
        <ol className={styles.steps} role="list">
          {projectSteps.map(([title, description], index) => (
            <li key={title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="contatti"
        className={`section-pad ${styles.contact}`}
        aria-labelledby="contatti-title"
      >
        <div className="section-heading">
          <p className="eyebrow">PARLIAMONE</p>
          <h2 id="contatti-title">Cosa serve alla vostra agenzia?</h2>
          <p>
            Raccontatemi cosa vorreste migliorare. Vediamo insieme quale
            servizio può aiutarvi e prepariamo un preventivo.
          </p>
        </div>
        <div className={styles.contactDetails}>
          <div>
            <h3>Rei Aliaj</h3>
            <p>Code-Studio · Tirana, Albania</p>
          </div>
          <a
            className="button button-light"
            href="mailto:info@cod-st.com?subject=Soluzioni%20per%20agenzie%20immobiliari"
          >
            info@cod-st.com <Icon name="mail" width="19" height="19" />
          </a>
          <a className="text-link" href="tel:+355675852355">
            <Icon name="phone" width="17" height="17" /> +355 67 5852355
          </a>
        </div>
      </section>
    </main>
  );
}
