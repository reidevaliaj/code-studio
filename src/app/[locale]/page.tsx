import { Metadata } from 'next';
import HeroSection from '../../components/HeroSection';
import AboutSection from '../../components/AboutSection';
import ServicesSection from '../../components/ServicesSection';
import CaseStudiesSection from '../../components/CaseStudiesSection';
import AnimatedSeparator from '../../components/AnimatedSeparator';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';

export const metadata: Metadata = {
  title: 'Code Studio - Webdesign, Entwicklung & Automatisierung',
  description: 'Professionelle Webdesign-, Entwicklungs- und Automatisierungsdienstleistungen. Holen Sie sich ein Angebot für Ihr nächstes Projekt.',
  keywords: 'webdesign, webentwicklung, automatisierung, ki-agenten, wordpress, shopify, typo3, seo',
  openGraph: {
    title: 'Code Studio - Webdesign, Entwicklung & Automatisierung',
    description: 'Professionelle Webdesign-, Entwicklungs- und Automatisierungsdienstleistungen. Holen Sie sich ein Angebot für Ihr nächstes Projekt.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de',
    languages: {
      'en': '/',
      'de': '/de',
      'x-default': '/',
    },
  },
};

export default function LocalizedHome() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CaseStudiesSection />
      <AnimatedSeparator />
      <TestimonialsSection />
      <PartnersSection />
    </>
  );
}
