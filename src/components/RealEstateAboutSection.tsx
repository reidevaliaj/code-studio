'use client';

import { useTranslations } from 'next-intl';
import Section from './Section';
import Button from './Button';

export default function RealEstateAboutSection() {
  const t = useTranslations('realEstateLanding.about');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-hover rounded-full  flex-shrink-0"></div>
                <p className="text-sm font-medium uppercase tracking-widest text-accent-hover font-sans">
                  {t('subtitle')}
                </p>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-heading">
                {t('title')}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent-hover rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('benefits.competitivePricing.title')}</h3>
                  <p className="text-gray-600">{t('benefits.competitivePricing.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent-hover rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('benefits.professionalWork.title')}</h3>
                  <p className="text-gray-600">{t('benefits.professionalWork.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent-hover rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('benefits.comprehensiveServices.title')}</h3>
                  <p className="text-gray-600">{t('benefits.comprehensiveServices.description')}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button href="#services" variant="primary" size="lg">
                {t('cta')}
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-accent-4 mb-4">{t('stats.title')}</h3>
                <p className="text-gray-600">{t('stats.subtitle')}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-4 mb-2">200+</div>
                  <div className="text-sm text-gray-600">{t('stats.projects')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-4 mb-2">50+</div>
                  <div className="text-sm text-gray-600">{t('stats.clients')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-boldtext-accent-4 mb-2">5+</div>
                  <div className="text-sm text-gray-600">{t('stats.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-4 mb-2">98%</div>
                  <div className="text-sm text-gray-600">{t('stats.satisfaction')}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.title')}</div>
                  <div className="text-4xl font-bold text-[#04ADBD] mb-2">{t('pricing.amount')}</div>
                  <div className="text-sm text-gray-600">{t('pricing.description')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
