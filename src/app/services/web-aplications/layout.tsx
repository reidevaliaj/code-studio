import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Application Development - Code Studio Albania',
  description: 'Professional web application development services from Albania. Custom solutions built with modern technologies.',
  keywords: 'web applications, web development, Next.js, Python, FastAPI, Django, Albania',
  openGraph: {
    title: 'Web Application Development - Code Studio Albania',
    description: 'Professional web application development services from Albania. Custom solutions built with modern technologies.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services/web-aplications',
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
