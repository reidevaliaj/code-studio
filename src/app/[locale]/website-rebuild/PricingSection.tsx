'use client';

import { useTranslations } from 'next-intl';
import Section from '../../../components/Section';

export default function PricingSection() {
  const t = useTranslations('websiteRebuild.pricing');

  return (
    <Section className="py-20 bg-accent text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-heading">
          {t('title')}
        </h2>
        <p className="text-lg mb-8 leading-relaxed font-sans">
          {t('description')}
        </p>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-8">
          <ul className="space-y-4 text-left max-w-2xl mx-auto">
            {t.raw('guarantees').map((guarantee: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-2 text-xl">✔</span>
                <span className="font-sans">{guarantee}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-semibold font-sans">
          {t('conclusion')}
        </p>
      </div>
    </Section>
  );
}
