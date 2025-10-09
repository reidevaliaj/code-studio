import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import AnimatedSeparator from '../components/AnimatedSeparator';
import TestimonialsSection from '../components/TestimonialsSection';
import PartnersSection from '../components/PartnersSection';

export const metadata: Metadata = {
  title: 'Code Studio - Web Design, Development & Automation',
  description: 'Professional web design, development, and automation services. Get a quote for your next project.',
  keywords: 'web design, web development, automation, AI agents, WordPress, Shopify, TYPO3, SEO',
  openGraph: {
    title: 'Code Studio - Web Design, Development & Automation',
    description: 'Professional web design, development, and automation services. Get a quote for your next project.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'de': '/de',
      'x-default': '/',
    },
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CaseStudiesSection />
        <AnimatedSeparator />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}