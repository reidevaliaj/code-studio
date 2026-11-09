import Link from "next/link";
export default function NotFound() {
  return (
    <main id="inhalt" className="not-found">
      <p className="eyebrow">404 · SEITE NICHT GEFUNDEN</p>
      <h1>
        Hier ist gerade
        <br />
        niemand am Empfang.
      </h1>
      <p>Unsere KI-Rezeption finden Sie auf der Startseite.</p>
      <Link className="button" href="/">
        Zur Startseite →
      </Link>
    </main>
  );
}
