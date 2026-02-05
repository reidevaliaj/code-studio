'use client';

import { useTranslations } from 'next-intl';
import Section from '../../../components/Section';

export default function AboutSection() {
  const t = useTranslations('websiteRebuild.about');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('description')}
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('pricing')}
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('focus')}
          </p>
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-lg font-semibold text-gray-900 font-heading">
              {t('founder.name')}
            </p>
            <p className="text-gray-600 font-sans">{t('founder.title')}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
