import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify-Entwicklung & E-Commerce-Lösungen - Code Studio Albanien',
  description: 'Professionelle Shopify-Entwicklungsdienstleistungen aus Albanien einschließlich maßgeschneiderter Stores, Apps und E-Commerce-Integrationen.',
  keywords: 'Shopify-Entwicklung, E-Commerce, maßgeschneiderte Stores, Shopify-Apps, Liquid, Albanien',
  openGraph: {
    title: 'Shopify-Entwicklung & E-Commerce-Lösungen - Code Studio Albanien',
    description: 'Professionelle Shopify-Entwicklungsdienstleistungen aus Albanien einschließlich maßgeschneiderter Stores, Apps und E-Commerce-Integrationen.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services/shopify',
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
