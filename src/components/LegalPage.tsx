import Link from "next/link";
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main id="inhalt" className="legal-page">
      <Link className="back-link" href="/">
        ← Zurück zur Startseite
      </Link>
      <p className="eyebrow">CODE-STUDIO · COD-ST</p>
      <h1>{title}</h1>
      {children}
    </main>
  );
}
