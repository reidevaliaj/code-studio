import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WordPress Development Services - Code Studio Albania',
  description: 'Professional WordPress development from Albania including custom themes, plugins, and full-site solutions.',
  keywords: 'WordPress development, custom themes, plugins, WooCommerce, Elementor, Albania',
  openGraph: {
    title: 'WordPress Development Services - Code Studio Albania',
    description: 'Professional WordPress development from Albania including custom themes, plugins, and full-site solutions.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services/wordpress',
    languages: {
      'en': '/services/wordpress',
      'de': '/de/services/wordpress',
      'x-default': '/services/wordpress',
    },
  },
};

export default function WordPressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
