import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO & Google Ads Services - Code Studio Albania',
  description: 'Professional SEO optimization and Google Ads management from Albania to increase online visibility and drive conversions.',
  keywords: 'SEO, Google Ads, digital marketing, search optimization, PPC, Albania',
  openGraph: {
    title: 'SEO & Google Ads Services - Code Studio Albania',
    description: 'Professional SEO optimization and Google Ads management from Albania to increase online visibility and drive conversions.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services/seo-adwords',
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
