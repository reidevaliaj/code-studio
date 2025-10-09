import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TYPO3-Entwicklungsdienstleistungen - Code Studio Albanien',
  description: 'Professionelle TYPO3 CMS-Entwicklung aus Albanien für Enterprise-Websites und großangelegte Anwendungen.',
  keywords: 'TYPO3-Entwicklung, CMS, Enterprise, Content Management, Fluid, Extbase, Albanien',
  openGraph: {
    title: 'TYPO3-Entwicklungsdienstleistungen - Code Studio Albanien',
    description: 'Professionelle TYPO3 CMS-Entwicklung aus Albanien für Enterprise-Websites und großangelegte Anwendungen.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services/typo3',
    languages: {
      'en': '/services/typo3',
      'de': '/de/services/typo3',
      'x-default': '/services/typo3',
    },
  },
};

export default function TYPO3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
