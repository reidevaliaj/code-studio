'use client';

import { useTranslations } from 'next-intl';
import Section from './Section';

export default function RealEstateWhyChooseUsSection() {
  const t = useTranslations('realEstateLanding.whyChooseUs');

  const reasons = [
    {
      icon: '💰',
      title: t('reasons.competitivePricing.title'),
      description: t('reasons.competitivePricing.description')
    },
    {
      icon: '🏆',
      title: t('reasons.provenExperience.title'),
      description: t('reasons.provenExperience.description')
    },
    {
      icon: '⚡',
      title: t('reasons.modernTechnology.title'),
      description: t('reasons.modernTechnology.description')
    },
    {
      icon: '🤝',
      title: t('reasons.dedicatedSupport.title'),
      description: t('reasons.dedicatedSupport.description')
    },
    {
      icon: '🌍',
      title: t('reasons.internationalExperience.title'),
      description: t('reasons.internationalExperience.description')
    },
    {
      icon: '📈',
      title: t('reasons.resultsDriven.title'),
      description: t('reasons.resultsDriven.description')
    }
  ];

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#03283A] rounded-full flex-shrink-0"></div>
            <p className="text-sm font-medium uppercase tracking-widest text-[#03283A] font-sans">
              {t('subtitle')}
            </p>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-heading mb-6">
            {t('title')}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{reason.icon}</div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {reason.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="text-center">
            <div className="text-6xl text-[#03283A] mb-6">"</div>
            <blockquote className="text-xl lg:text-2xl text-gray-700 italic leading-relaxed mb-8 max-w-4xl mx-auto">
              {t('testimonial.quote')}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-[#03283A] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {t('testimonial.author.initials')}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('testimonial.author.name')}</div>
                <div className="text-gray-600">{t('testimonial.author.position')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
