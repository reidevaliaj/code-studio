'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Section from './Section';
import Button from './Button';

const ServicesSection = () => {
  const t = useTranslations('home.services');
  const tServices = useTranslations('footer.services');
  const params = useParams();
  const locale = params?.locale;
  const localePrefix = locale ? `/${locale}` : '';

  const services = [
    {
      key: 'aiAgents',
      title: tServices('aiAgents'),
      description: 'Intelligent automation solutions that work 24/7 to streamline your business operations and boost productivity.',
      icon: '🤖',
      href: `${localePrefix}/services/ai-agents-automations`
    },
    {
      key: 'webApps',
      title: tServices('webApps'),
      description: 'Custom web applications built with modern technologies, designed to scale with your business growth.',
      icon: '💻',
      href: `${localePrefix}/services/web-aplications`
    },
    {
      key: 'wordpress',
      title: tServices('wordpress'),
      description: 'Professional WordPress development including custom themes, plugins, and full-site solutions.',
      icon: '📝',
      href: `${localePrefix}/services/wordpress`
    },
    {
      key: 'shopify',
      title: tServices('shopify'),
      description: 'E-commerce solutions that convert visitors into customers with custom Shopify stores and integrations.',
      icon: '🛒',
      href: `${localePrefix}/services/shopify`
    },
    {
      key: 'typo3',
      title: tServices('typo3'),
      description: 'Enterprise-grade content management solutions for large-scale websites and applications.',
      icon: '🏢',
      href: `${localePrefix}/services/typo3`
    },
    {
      key: 'seoAdwords',
      title: tServices('seoAdwords'),
      description: 'Comprehensive SEO optimization and Google Ads management to increase your online visibility.',
      icon: '📈',
      href: `${localePrefix}/services/seo-adwords`
    }
  ];

  return (
    <Section className="py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl section-subtitle font-semibold mb-6">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={service.key}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Learn More Link */}
              <Button 
                href={service.href}
                variant="outline"
                size="sm"
                className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
              >
                Learn More →
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}

      </div>
    </Section>
  );
};

export default ServicesSection;
