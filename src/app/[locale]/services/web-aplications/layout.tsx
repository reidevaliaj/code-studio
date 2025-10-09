import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webanwendungsentwicklung - Code Studio Albanien',
  description: 'Professionelle Webanwendungsentwicklungsdienstleistungen aus Albanien. Maßgeschneiderte Lösungen mit modernen Technologien.',
  keywords: 'Webanwendungen, Webentwicklung, Next.js, Python, FastAPI, Django, Albanien',
  openGraph: {
    title: 'Webanwendungsentwicklung - Code Studio Albanien',
    description: 'Professionelle Webanwendungsentwicklungsdienstleistungen aus Albanien. Maßgeschneiderte Lösungen mit modernen Technologien.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services/web-aplications',
    languages: {
      'en': '/services/web-aplications',
      'de': '/de/services/web-aplications',
      'x-default': '/services/web-aplications',
    },
  },
};

export default function WebAppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
