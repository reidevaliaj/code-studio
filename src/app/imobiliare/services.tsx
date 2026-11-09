export const services = [
  {
    id: "sito-web",
    menu: "Sito web",
    title: "Redesign del sito web",
    headline: "Un sito che porta alla visita.",
    price: "500 €",
    description:
      "Rinnoviamo il vostro sito per far trovare gli immobili giusti e rendere semplice il passaggio dalla scheda dell’annuncio alla richiesta di una visita.",
    details: [
      "Grafica coordinata con l’identità della vostra agenzia.",
      "Navigazione e schede immobili pensate anche per smartphone.",
      "Contatti e richiesta di visita in evidenza nelle pagine principali.",
    ],
    note: "Prima del preventivo verifichiamo il sito esistente e le pagine da rinnovare.",
  },
  {
    id: "pubblicazione-annunci",
    menu: "Pubblicazione annunci",
    title: "Pubblicazione automatica degli immobili",
    headline: "Una scheda, più portali.",
    price: "200–800 €",
    description:
      "Inserite foto, prezzo e descrizione una sola volta. La stessa scheda alimenta il sito della vostra agenzia e i portali collegati.",
    details: [
      "Un punto di partenza per creare e aggiornare gli annunci.",
      "Distribuzione sui canali compatibili, come Subito, Immobiliare.it e Idealista.",
      <>
        Possibilità di includere i portali gratuiti{" "}
        <a href="https://www.tuttocasa.it/">TuttoCasa</a> e{" "}
        <a href="https://www.cubocasa.it/faq.php">CuboCasa</a>.
      </>,
    ],
    note: "Utilizziamo i vostri account e verifichiamo quali integrazioni sono disponibili. Gli eventuali abbonamenti ai portali restano separati.",
  },
  {
    id: "social-media",
    menu: "Social media",
    title: "Automazione dei social media",
    headline: "Dal nuovo annuncio al post.",
    price: "100 €",
    description:
      "Quando aggiungete un immobile, l’automazione usa foto e informazioni della scheda per pubblicarlo anche sulle vostre pagine Facebook e Instagram.",
    details: [
      "Collegamento delle pagine social della vostra agenzia.",
      "Modello di post con stile, descrizione e invito al contatto.",
      "Pubblicazione automatica dei nuovi immobili sui canali collegati.",
    ],
    note: "Concordiamo quali annunci pubblicare e quali informazioni mostrare nei post.",
  },
  {
    id: "video-immobiliari",
    menu: "Video immobiliari",
    title: "Video immobiliari con AI",
    headline: "Date un primo tour dell’immobile.",
    price: "50–500 €",
    description:
      "Dalle foto o dalle riprese che ci fornite creiamo un video che accompagna il cliente negli ambienti e mette in evidenza le caratteristiche della proprietà.",
    details: [
      "Montaggio degli ambienti e dei dettagli più significativi.",
      "Testi in video e formato scelto per sito, annunci o social.",
      "Avatar AI facoltativo per raccontare l’immobile con un testo concordato.",
    ],
    note: "Il preventivo dipende da durata, materiale disponibile, formato e uso dell’avatar.",
  },
  {
    id: "receptionist-ai",
    menu: "Receptionist AI",
    title: "Receptionist AI",
    headline: "Rispondete anche durante le visite.",
    price: "200 €",
    description:
      "L’assistente telefonico risponde 24 ore su 24. Può dare le informazioni che gli affidate, raccogliere un contatto e gestire richieste di appuntamento.",
    details: [
      "Risposte su immobili, orari e modalità di visita.",
      "Raccolta delle richieste da inoltrare al vostro team.",
      "Appuntamenti con un calendario compatibile, secondo le regole dell’agenzia.",
    ],
    note: "Definiamo insieme cosa può gestire l’assistente e quando deve passare la richiesta a una persona.",
  },
  {
    id: "receptionist-umano",
    menu: "Assistenza in italiano",
    title: "Receptionist in outsourcing",
    headline: "Una persona per i vostri clienti.",
    price: "1.000 €",
    description:
      "Un servizio di assistenza da remoto in italiano per gestire telefonate e richieste mentre il vostro team è impegnato con clienti e visite.",
    details: [
      "Risposta alle chiamate secondo le istruzioni della vostra agenzia.",
      "Raccolta di messaggi, recapiti e richieste di richiamata.",
      "Coordinamento degli appuntamenti con il vostro team.",
    ],
    note: "Orari di copertura, attività e volumi vengono definiti nel preventivo.",
  },
  {
    id: "email-marketing",
    menu: "Email marketing",
    title: "Email marketing",
    headline: "Fate conoscere i nuovi immobili.",
    price: "120 €",
    description:
      "Creiamo campagne email per presentare novità, selezioni di immobili o aggiornamenti ai clienti già in contatto con la vostra agenzia.",
    details: [
      "Scelta dell’obiettivo, dei destinatari e degli immobili da promuovere.",
      "Scrittura dei testi e creazione di un modello leggibile da smartphone.",
      "Preparazione e gestione dell’invio con invito a contattarvi o a richiedere una visita.",
    ],
    note: "Concordiamo insieme la frequenza degli invii e lo strumento da utilizzare.",
  },
  {
    id: "soluzioni-personalizzate",
    menu: "Soluzioni su misura",
    title: "Soluzioni personalizzate",
    headline: "Collegate gli strumenti che usate già.",
    price: "Su preventivo",
    description:
      "Partiamo da un’attività che oggi fate a mano e progettiamo un’integrazione con il vostro gestionale o uno strumento adatto al vostro flusso di lavoro.",
    details: [
      "Analisi delle attività da automatizzare e dei sistemi già in uso.",
      "Integrazioni tra sito, gestionale e strumenti di lavoro compatibili.",
      "Strumenti su misura per assegnare richieste, tenere traccia dei contatti o coordinare le visite.",
    ],
    note: "Valutiamo accessi e compatibilità prima di concordare cosa realizzare.",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
