import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO & Google Ads Dienstleistungen - Code Studio Albanien',
  description: 'Professionelle SEO-Optimierung und Google Ads-Management aus Albanien zur Steigerung der Online-Sichtbarkeit und Conversions.',
  keywords: 'SEO, Google Ads, Digital Marketing, Suchoptimierung, PPC, Albanien',
  openGraph: {
    title: 'SEO & Google Ads Dienstleistungen - Code Studio Albanien',
    description: 'Professionelle SEO-Optimierung und Google Ads-Management aus Albanien zur Steigerung der Online-Sichtbarkeit und Conversions.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services/seo-adwords',
    languages: {
      'en': '/services/seo-adwords',
      'de': '/de/services/seo-adwords',
      'x-default': '/services/seo-adwords',
    },
  },
};

export default function SEOAdwordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
