import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify Development & E-commerce Solutions - Code Studio Albania',
  description: 'Professional Shopify development services from Albania including custom stores, apps, and e-commerce integrations.',
  keywords: 'Shopify development, e-commerce, custom stores, Shopify apps, Liquid, Albania',
  openGraph: {
    title: 'Shopify Development & E-commerce Solutions - Code Studio Albania',
    description: 'Professional Shopify development services from Albania including custom stores, apps, and e-commerce integrations.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services/shopify',
    languages: {
      'en': '/services/shopify',
      'de': '/de/services/shopify',
      'x-default': '/services/shopify',
    },
  },
};

export default function ShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
