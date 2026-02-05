'use client';

import { useTranslations } from 'next-intl';
import Section from '../../../components/Section';

export default function BenefitsSection() {
  const t = useTranslations('websiteRebuild.benefits');

  const benefits = [
    { key: 'speed', icon: '⚡' },
    { key: 'seo', icon: '🔍' },
    { key: 'maintenance', icon: '🔧' },
    { key: 'content', icon: '📝' }
  ];

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.key} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                    {t(`items.${benefit.key}.title`)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-sans">
                    {t(`items.${benefit.key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
