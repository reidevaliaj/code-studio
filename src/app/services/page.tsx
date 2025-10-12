import { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import ServicesSection from '../../components/ServicesSection';

export const metadata: Metadata = {
  title: 'Services - Code Studio Professional Web Development',
  description: 'Discover Code Studio\'s professional web development, design, automation, and digital marketing services from Albania.',
  keywords: 'web development services, web design, AI automation, WordPress development, Shopify development, TYPO3, SEO, Albania',
  openGraph: {
    title: 'Services - Code Studio Professional Web Development',
    description: 'Discover Code Studio\'s professional web development, design, automation, and digital marketing services from Albania.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services',
    languages: {
      'en': '/services',
      'de': '/de/services',
      'x-default': '/services',
    },
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection ns="services.hero" videoSrc="/videos/hero-background1.mp4" />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
