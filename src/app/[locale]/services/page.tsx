import { Metadata } from 'next';
import HeroSection from '../../../components/HeroSection';
import ServicesSection from '../../../components/ServicesSection';

export const metadata: Metadata = {
  title: 'Leistungen - Code Studio Professionelle Webentwicklung',
  description: 'Entdecken Sie Code Studios professionelle Webentwicklungs-, Design-, Automatisierungs- und Digitalmarketing-Dienstleistungen aus Albanien.',
  keywords: 'webentwicklung dienstleistungen, webdesign, ki automatisierung, wordpress entwicklung, shopify entwicklung, typo3, seo, albanien',
  openGraph: {
    title: 'Leistungen - Code Studio Professionelle Webentwicklung',
    description: 'Entdecken Sie Code Studios professionelle Webentwicklungs-, Design-, Automatisierungs- und Digitalmarketing-Dienstleistungen aus Albanien.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services',
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
      <HeroSection ns="services.hero" videoSrc="/videos/hero-background1.mp4" />
      <ServicesSection />
    </>
  );
}