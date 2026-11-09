import Image from "next/image";
import { Icon } from "@/components/Icons";
import styles from "./imobiliare.module.css";

const services = [
  {
    name: "Redesign del sito web",
    price: "500 €",
    description:
      "Rinnoviamo grafica e navigazione per presentare meglio la vostra agenzia e i vostri immobili, anche da smartphone.",
  },
  {
    name: "Pubblicazione automatica degli immobili",
    price: "200–800 €",
    description: (
      <>
        Un unico sistema per pubblicare e aggiornare gli annunci sul vostro sito
        e sui portali compatibili con i vostri account, come Subito,
        Immobiliare.it e Idealista. Possiamo includere portali gratuiti per
        agenzie come{" "}
        <a href="https://www.tuttocasa.it/">TuttoCasa</a> e{" "}
        <a href="https://www.cubocasa.it/faq.php">CuboCasa</a>. Eventuali
        abbonamenti ai portali restano separati.
      </>
    ),
  },
  {
    name: "Automazione dei social media",
    price: "100 €",
    description:
      "Pubblicate automaticamente i nuovi immobili su Facebook e Instagram, con immagini e descrizioni.",
  },
  {
    name: "Video immobiliari con AI",
    price: "50–500 €",
    description:
      "Creiamo video per presentare i vostri immobili, anche con avatar AI che ne illustrano caratteristiche e punti di forza.",
  },
  {
    name: "Receptionist AI",
    price: "200 €",
    description:
      "Un assistente telefonico attivo 24 ore su 24 per rispondere alle domande, raccogliere contatti e fissare appuntamenti.",
  },
  {
    name: "Receptionist in outsourcing",
    price: "1.000 €",
    description:
      "Supporto umano da remoto, in italiano, per gestire telefonate, richieste dei clienti e appuntamenti.",
  },
  {
    name: "Email marketing",
    price: "120 €",
    description:
      "Creiamo e gestiamo campagne email per presentare gli immobili e mantenere il contatto con i vostri clienti.",
  },
  {
    name: "Soluzioni personalizzate",
    price: "Su preventivo",
    description:
      "Integriamo il vostro gestionale e sviluppiamo strumenti sulle esigenze della vostra agenzia.",
  },
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
            <span>i vostri immobili.</span>
          </h1>
          <p className="hero-description">
            Siti web, automazioni e intelligenza artificiale per far risparmiare
            tempo alla vostra agenzia e ridurre i costi.
          </p>
          <div className="hero-actions">
            <a className="button" href="#servizi">
              Scoprite i servizi <Icon name="arrow" />
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

      <section
        id="servizi"
        className={`section-pad ${styles.services}`}
        aria-labelledby="servizi-title"
      >
        <div className="section-heading horizontal">
          <div>
            <p className="eyebrow">L’OFFERTA CODE-STUDIO</p>
            <h2 id="servizi-title">Servizi e prezzi</h2>
          </div>
          <p>
            Potete partire anche da un solo servizio. I prezzi sono indicativi
            e il preventivo dipende dal lavoro concordato.
          </p>
        </div>
        <ol className={styles.serviceList} role="list">
          {services.map(({ name, price, description }, index) => (
            <li key={name}>
              <span className={styles.serviceNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{name}</h3>
              <p>{description}</p>
              <span className={styles.price}>{price}</span>
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
