import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WordPress-Entwicklungsdienstleistungen - Code Studio Albanien',
  description: 'Professionelle WordPress-Entwicklung aus Albanien einschließlich maßgeschneiderter Themes, Plugins und vollständiger Website-Lösungen.',
  keywords: 'WordPress-Entwicklung, maßgeschneiderte Themes, Plugins, WooCommerce, Elementor, Albanien',
  openGraph: {
    title: 'WordPress-Entwicklungsdienstleistungen - Code Studio Albanien',
    description: 'Professionelle WordPress-Entwicklung aus Albanien einschließlich maßgeschneiderter Themes, Plugins und vollständiger Website-Lösungen.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services/wordpress',
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
