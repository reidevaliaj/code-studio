'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '../../../../components/HeroSection';
import Section from '../../../../components/Section';
import Button from '../../../../components/Button';
import Image from 'next/image';

function ProjectDescriptionSection() {
  const t = useTranslations('caseStudies.lensandframe.description');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
              {t('title')}
            </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-sans">
              {t('content')}
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-8">
              <Image
                src="/images/case-studies/lensandframe-dashboard.jpg"
                alt="Lens & Frame Shopify Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Herausforderungen</h3>
            <ul className="space-y-2">
              {t.raw('challenges').map((challenge: string, index: number) => (
                <li key={index} className="text-gray-600 flex items-start font-sans">
                  <span className="text-accent mr-2">•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Lösungen</h3>
            <ul className="space-y-2">
              {t.raw('solutions').map((solution: string, index: number) => (
                <li key={index} className="text-gray-600 flex items-start font-sans">
                  <span className="text-accent mr-2">•</span>
                  {solution}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Ergebnisse</h3>
            <ul className="space-y-2">
              {t.raw('results').map((result: string, index: number) => (
                <li key={index} className="text-gray-600 flex items-start font-sans">
                  <span className="text-accent mr-2">•</span>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  const t = useTranslations('caseStudies.lensandframe.hero');

  return (
    <Section className="py-20 bg-accent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
          Bereit, Ihren E-Commerce-Erfolg aufzubauen?
        </h2>
        <p className="text-xl text-white/90 font-semibold mb-6 font-sans">
          Lassen Sie uns besprechen, wie wir eine ähnliche Lösung für Ihr Unternehmen erstellen können
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            href="/contact" 
            variant="secondary" 
            size="lg"
          >
            {t('secondaryCta')}
          </Button>
          <Button 
            href="https://lensandframe.co" 
            variant="outline" 
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white hover:text-accent"
          >
            Live-Website ansehen
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function LensAndFrameCaseStudy() {
  return (
    <>
      <HeroSection ns="caseStudies.lensandframe.hero" videoSrc="/videos/lensandframe-bg.mp4" />
      <ProjectDescriptionSection />
      <CTASection />
    </>
  );
}
