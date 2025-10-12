'use client';

import { useTranslations } from 'next-intl';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import HeroSection from '../../../components/HeroSection';
import Section from '../../../components/Section';
import Button from '../../../components/Button';
import Image from 'next/image';

function WhatWeDoSection() {
  const t = useTranslations('serviceDetails.aiAgents.whatWeDo');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.raw('features').map((feature: any, index: number) => (
            <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function UseCasesSection() {
  const t = useTranslations('serviceDetails.aiAgents.useCases');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.raw('cases').map((useCase: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{useCase.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">
                {useCase.title}
              </h3>
              <p className="text-gray-600 text-sm font-sans">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            href="/contact" 
            variant="primary" 
            size="lg"
          >
            {t('cta')}
          </Button>
        </div>
      </div>
    </Section>
  );
}

function HowItWorksSection() {
  const t = useTranslations('serviceDetails.aiAgents.howItWorks');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {t.raw('steps').map((step: any, index: number) => (
            <div key={index} className="text-center relative">
              {index < 4 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-accent transform translate-x-4 -translate-y-1/2 z-0"></div>
              )}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-heading">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TechnologiesSection() {
  const t = useTranslations('serviceDetails.aiAgents.technologies');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {t.raw('techs').map((tech: string, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-sm font-medium text-gray-700 font-sans">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ResultsSection() {
  const t = useTranslations('serviceDetails.aiAgents.results');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.raw('metrics').map((metric: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{metric.icon}</div>
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2 font-heading">
                {metric.value}
              </div>
              <div className="text-gray-600 font-medium font-sans">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  const t = useTranslations('serviceDetails.aiAgents.cta');

  return (
    <Section className="py-20 bg-accent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
          {t('title')}
        </h2>
        <p className="text-xl text-white/90 font-semibold mb-6 font-sans">
          {t('subtitle')}
        </p>
        <p className="text-lg text-white/80 mb-8 font-sans">
          {t('description')}
        </p>
        <Button 
          href="/contact" 
          variant="secondary" 
          size="lg"
        >
          {t('cta')}
        </Button>
      </div>
    </Section>
  );
}

export default function AIAgentsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection ns="serviceDetails.aiAgents.hero" imageSrc="/images/aiagents.png"/>
        <WhatWeDoSection />
        <UseCasesSection />
        <HowItWorksSection />
        <TechnologiesSection />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
