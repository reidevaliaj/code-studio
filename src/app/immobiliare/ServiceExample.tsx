import Image from "next/image";
import { Icon } from "@/components/Icons";
import type { ServiceId } from "./services";
import styles from "./service-example.module.css";

const captions: Record<ServiceId, string> = {
  "sito-web": "Esempio di scheda immobile con un invito a richiedere una visita.",
  "pubblicazione-annunci": "Una modifica alla scheda si propaga ai canali collegati.",
  "social-media": "Esempio di post ricavato da una scheda immobile.",
  "video-immobiliari": "Esempio di sequenza per un tour: ingresso, ambienti e dettagli.",
  "receptionist-ai": "Esempio di chiamata: informazioni, richiesta di visita e passaggio al team.",
  "receptionist-umano": "L’operatore segue le istruzioni e gli orari concordati con l’agenzia.",
  "email-marketing": "Esempio di email dedicata ai nuovi immobili in vendita.",
  "soluzioni-personalizzate": "Esempio di integrazione tra il sito, il gestionale e il vostro team.",
};

function ExamplePhoto({
  source,
  className,
}: {
  source: "hero" | "interno" | "assistenza";
  className: string;
}) {
  return (
    <div className={className}>
      <Image
        src={`/images/immobiliare-${source}.webp`}
        fill
        alt=""
        sizes="(max-width: 800px) 90vw, 40vw"
      />
    </div>
  );
}

function Illustration({ service }: { service: ServiceId }) {
  switch (service) {
    case "sito-web":
      return (
        <div className={styles.browser}>
          <div className={styles.browserBar}>
            <span /><span /><span />
          </div>
          <ExamplePhoto source="hero" className={styles.listingPhoto} />
          <div className={styles.listingCopy}>
            <div>
              <span className={styles.kicker}>IN VENDITA</span>
              <strong>Casa degli Ulivi</strong>
            </div>
            <span className={styles.sampleAction}>Richiedi una visita</span>
          </div>
        </div>
      );
    case "pubblicazione-annunci":
      return (
        <div className={styles.publish}>
          <div className={styles.source}>
            <Icon name="briefcase" />
            <span>Scheda immobile</span>
          </div>
          <div className={styles.branch} />
          <div className={styles.channels}>
            <div><Icon name="website" /> Sito dell’agenzia</div>
            <div><Icon name="globe" /> Portali collegati</div>
          </div>
          <span className={styles.kicker}>UN SOLO AGGIORNAMENTO</span>
        </div>
      );
    case "social-media":
      return (
        <div className={styles.social}>
          <div className={styles.socialHeader}>
            <Icon name="briefcase" width="17" height="17" />
            <span>La vostra agenzia</span>
          </div>
          <ExamplePhoto source="hero" className={styles.socialPhoto} />
          <div className={styles.socialCopy}>
            <span className={styles.kicker}>NUOVO IMMOBILE</span>
            <strong>Casa degli Ulivi</strong>
            <p>Scoprite la casa e chiedete una visita.</p>
          </div>
          <div className={styles.socialChannels}>
            <span>Facebook</span><span>Instagram</span>
          </div>
        </div>
      );
    case "video-immobiliari":
      return (
        <div className={styles.video}>
          <ExamplePhoto source="interno" className={styles.videoPhoto} />
          <div className={styles.videoTitle}>
            <span className={styles.kicker}>TOUR IMMOBILIARE</span>
            <strong>Dentro Casa degli Ulivi</strong>
          </div>
          <div className={styles.scenes}>
            <span>01 · Ingresso</span><span>02 · Ambienti</span><span>03 · Dettagli</span>
          </div>
        </div>
      );
    case "receptionist-ai":
      return (
        <div className={styles.call}>
          <div className={styles.callHeader}>
            <span className={styles.phoneIcon}><Icon name="phone" /></span>
            <div>
              <span className={styles.kicker}>RECEPTIONIST AI · 24/7</span>
              <strong>«Posso visitare l’immobile?»</strong>
            </div>
          </div>
          <div className={styles.waveform}>
            {[12, 19, 30, 16, 43, 26, 51, 36, 21, 44, 57, 27, 41, 17, 24, 12].map(
              (height, index) => <i key={index} style={{ height }} />,
            )}
          </div>
          <div className={styles.callSteps}>
            <span>Risposta</span><span>Richiesta</span><span>Agenda</span>
          </div>
        </div>
      );
    case "receptionist-umano":
      return (
        <ExamplePhoto source="assistenza" className={styles.supportPhoto} />
      );
    case "email-marketing":
      return (
        <div className={styles.email}>
          <div className={styles.emailHeader}>
            <Icon name="mail" width="17" height="17" />
            <span>Le novità della vostra agenzia</span>
          </div>
          <ExamplePhoto source="interno" className={styles.emailPhoto} />
          <div className={styles.emailCopy}>
            <strong>Nuove case da scoprire</strong>
            <p>Una selezione di immobili da visitare.</p>
            <span className={styles.sampleAction}>Scoprite gli immobili</span>
          </div>
        </div>
      );
    case "soluzioni-personalizzate":
      return (
        <ol className={styles.workflow}>
          <li><Icon name="website" /> Richiesta dal sito</li>
          <li><Icon name="briefcase" /> Contatto nel gestionale</li>
          <li><Icon name="mail" /> Avviso all’agente</li>
        </ol>
      );
  }
}

export function ServiceExample({ service }: { service: ServiceId }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.board} data-example={service} aria-hidden="true">
        <Illustration service={service} />
      </div>
      <figcaption>{captions[service]}</figcaption>
    </figure>
  );
}
