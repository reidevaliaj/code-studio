import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};
export default function Page() {
  return (
    <LegalPage title="Impressum">
      <h2>Anbieter</h2>
      <address>
        Code-Studio
        <br />
        Rej Aliaj
        <br />
        Rue du Trône 100, 3rd floor
        <br />
        1050 Brussels
        <br />
        Belgien
      </address>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:info@cod-st.com">info@cod-st.com</a>
        <br />
        Website: <a href="https://www.cod-st.com">www.cod-st.com</a>
      </p>
      <h2>Inhaltlich verantwortlich</h2>
      <p>Rej Aliaj, Anschrift wie oben.</p>
      <h2>Zum Angebot</h2>
      <p>
        cod-st ist das Angebot von Code-Studio für KI-gestützte
        Rezeptionsassistenz. Die Website richtet sich an gewerbliche
        Interessenten. Die öffentlich zugänglichen Praxis-Demos dienen der
        Veranschaulichung; sie sind keine medizinische Dienstleistung und
        ermöglichen keine echten Terminbuchungen.
      </p>
    </LegalPage>
  );
}
