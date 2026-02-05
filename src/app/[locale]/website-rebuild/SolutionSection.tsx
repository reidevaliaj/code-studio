'use client';

import { useTranslations } from 'next-intl';
import Section from '../../../components/Section';

export default function SolutionSection() {
  const t = useTranslations('websiteRebuild.solution');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.raw('points').map((point: string, index: number) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-accent-2 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✓</span>
              </div>
              <p className="text-gray-800 font-semibold font-sans">{point}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent text-white p-8 rounded-lg">
          <p className="text-xl font-semibold mb-6 font-heading">{t('result')}</p>
          <ul className="space-y-3">
            {t.raw('benefits').map((benefit: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-2 text-xl">•</span>
                <span className="font-sans">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-lg text-gray-700 mt-8 font-sans">
          {t('conclusion')}
        </p>
      </div>
    </Section>
  );
}
