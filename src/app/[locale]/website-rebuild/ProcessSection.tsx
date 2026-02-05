'use client';

import { useTranslations } from 'next-intl';
import Section from '../../../components/Section';

export default function ProcessSection() {
  const t = useTranslations('websiteRebuild.process');

  const steps = [
    { key: 'review', number: '01' },
    { key: 'rebuild', number: '02' },
    { key: 'testing', number: '03' },
    { key: 'launch', number: '04' }
  ];

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.key} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-accent-2 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold font-heading">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="text-gray-700 text-sm font-sans">
                {t(`steps.${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
