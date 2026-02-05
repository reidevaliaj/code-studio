'use client';

import { useTranslations } from 'next-intl';
import Section from '../../../components/Section';

export default function WhyMoveAwaySection() {
  const t = useTranslations('websiteRebuild.whyMoveAway');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('intro')}
          </p>
          
          <p className="text-lg font-semibold text-gray-900 mb-6 font-sans">
            {t('modernBenefits')}
          </p>
          
          <ul className="space-y-4 mb-8">
            {t.raw('benefits').map((benefit: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-2 text-xl mt-1">•</span>
                <span className="text-gray-700 font-sans">{benefit}</span>
              </li>
            ))}
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed font-sans">
            {t('conclusion')}
          </p>
        </div>
      </div>
    </Section>
  );
}
