import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
export const metadata: Metadata = {
  title: "Beratung anfragen",
  alternates: { canonical: "/kontakt" },
};
export default function Page() {
  return (
    <main id="inhalt" className="contact-page">
      <section className="contact-section section-pad">
        <div className="contact-intro">
          <p className="eyebrow">CODE-STUDIO · PERSÖNLICH FÜR SIE DA</p>
          <h1>
            Ihre Praxis.
            <br />
            Unser Gespräch.
          </h1>
          <p>
            Sie möchten wissen, ob eine KI-Rezeption zu Ihrer Praxis passt?
            Schreiben Sie uns. Sie erhalten ein individuelles Angebot.
          </p>
          <a className="contact-mail" href="mailto:info@cod-st.com">
            info@cod-st.com ↗︎
          </a>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
