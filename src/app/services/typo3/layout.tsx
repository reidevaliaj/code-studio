import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TYPO3 Development Services - Code Studio Albania',
  description: 'Professional TYPO3 CMS development from Albania for enterprise websites and large-scale applications.',
  keywords: 'TYPO3 development, CMS, enterprise, content management, Fluid, Extbase, Albania',
  openGraph: {
    title: 'TYPO3 Development Services - Code Studio Albania',
    description: 'Professional TYPO3 CMS development from Albania for enterprise websites and large-scale applications.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services/typo3',
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
