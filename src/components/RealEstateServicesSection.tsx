'use client';

import { useTranslations } from 'next-intl';
import Section from './Section';
import Button from './Button';

export default function RealEstateServicesSection() {
  const t = useTranslations('realEstateLanding.services');

  const services = [
    {
      icon: '🤖',
      title: t('services.aiAgents.title'),
      description: t('services.aiAgents.description'),
      features: [
        t('services.aiAgents.features.leadManagement'),
        t('services.aiAgents.features.automation'),
        t('services.aiAgents.features.customerSupport'),
        t('services.aiAgents.features.dataAnalysis')
      ]
    },
    {
      icon: '🎨',
      title: t('services.websiteRedesign.title'),
      description: t('services.websiteRedesign.description'),
      features: [
        t('services.websiteRedesign.features.modernDesign'),
        t('services.websiteRedesign.features.mobileOptimization'),
        t('services.websiteRedesign.features.userExperience'),
        t('services.websiteRedesign.features.brandAlignment')
      ]
    },
    {
      icon: '💻',
      title: t('services.websiteDevelopment.title'),
      description: t('services.websiteDevelopment.description'),
      features: [
        t('services.websiteDevelopment.features.customDevelopment'),
        t('services.websiteDevelopment.features.cmsIntegration'),
        t('services.websiteDevelopment.features.propertyListings'),
        t('services.websiteDevelopment.features.searchFunctionality')
      ]
    },
    {
      icon: '🔧',
      title: t('services.websiteMaintenance.title'),
      description: t('services.websiteMaintenance.description'),
      features: [
        t('services.websiteMaintenance.features.regularUpdates'),
        t('services.websiteMaintenance.features.securityMonitoring'),
        t('services.websiteMaintenance.features.performanceOptimization'),
        t('services.websiteMaintenance.features.technicalSupport')
      ]
    },
    {
      icon: '📈',
      title: t('services.seoAdwords.title'),
      description: t('services.seoAdwords.description'),
      features: [
        t('services.seoAdwords.features.seoOptimization'),
        t('services.seoAdwords.features.googleAds'),
        t('services.seoAdwords.features.localSeo'),
        t('services.seoAdwords.features.analytics')
      ]
    }
  ];

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#03283A] rounded-full flex-shrink-0"></div>
            <p className="text-sm font-medium uppercase tracking-widest text-[--accent-hover] font-sans">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#04ADBD] rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button href="#contact" variant="primary" size="lg">
            {t('cta')}
          </Button>
        </div>
      </div>
    </Section>
  );
}
