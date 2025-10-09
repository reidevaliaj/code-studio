'use client';

import { useTranslations } from 'next-intl';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import HeroSection from '../../../components/HeroSection';
import Section from '../../../components/Section';
import Button from '../../../components/Button';

function WhatWeDoSection() {
  const t = useTranslations('serviceDetails.seoAdwords.whatWeDo');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl text-accent font-semibold mb-6 font-sans">
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

function PortfolioSection() {
  const t = useTranslations('serviceDetails.seoAdwords.portfolio');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl text-accent font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {t.raw('websites').slice(0, 24).map((website: string, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">S</span>
              </div>
              <p className="text-sm font-medium text-gray-700 font-sans truncate" title={website}>
                {website}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 font-sans">
            <span className="font-bold text-accent">150+</span> successful SEO and Google Ads campaigns
          </p>
        </div>
      </div>
    </Section>
  );
}

function TechnologiesSection() {
  const t = useTranslations('serviceDetails.seoAdwords.technologies');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl text-accent font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.raw('categories').map((category: any, index: number) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-heading">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.items.map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="text-sm text-gray-600 font-sans">
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ExpectationsSection() {
  const t = useTranslations('serviceDetails.seoAdwords.expectations');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl text-accent font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.raw('benefits').map((benefit: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">
                {benefit.title}
              </h3>
              <p className="text-gray-600 font-sans">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  const t = useTranslations('serviceDetails.seoAdwords.cta');

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

export default function SEOAdwordsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection ns="serviceDetails.seoAdwords.hero" imageSrc="/images/seo.jpg" />
        <WhatWeDoSection />
        <PortfolioSection />
        <TechnologiesSection />
        <ExpectationsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}