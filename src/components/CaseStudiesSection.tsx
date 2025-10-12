'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Section from './Section';
import Button from './Button';
import Image from 'next/image';

const CaseStudiesSection = () => {
  const t = useTranslations('home.caseStudies');
  const params = useParams();
  const locale = params?.locale;
  const localePrefix = locale ? `/${locale}` : '';

  const caseStudies = [
    {
      title: 'Lens & Frame: Premium Eyewear E-commerce',
      description: 'Built a successful glasses retailer in Los Angeles with custom Shopify development, API integrations, and HubSpot connections.',
      image: '/images/lensandframe.png',
      category: 'E-commerce',
      results: ['Significant Sales Increase', 'Streamlined Operations', 'Enhanced Customer Experience'],
      href: `${localePrefix}/case-studies/lensandframe`
    },
    {
      title: 'E-Connext: Advanced Job Scraping System',
      description: 'Created an advanced Next.js and FastAPI system that scrapes Swiss job websites, giving recruiting agencies a competitive advantage.',
      image: '/images/econext.png',
      category: 'Data Intelligence',
      results: ['Faster Job Discovery', 'Competitive Advantage', 'Automated Processing'],
      href: `${localePrefix}/case-studies/econext`
    },
    {
      title: 'Future Wealth Group: AI Knowledge Management',
      description: 'Developed an AI-powered chat system for internal knowledge sharing and banking resource management with n8n integration.',
      image: '/images/fwg.png',
      category: 'AI & Automation',
      results: ['Improved Knowledge Sharing', 'Faster Resource Access', 'Enhanced Collaboration'],
      href: `${localePrefix}/case-studies/futurewealth`
    }
  ];

  return (
    <Section className="py-20 bg-gray-50">
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

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Placeholder */}
{/* Case Study Image with overlay gradient and badge */}
<div className="relative aspect-video   items-center justify-center text-center bg-accent-hover overflow-hidden">
  {/* Image itself */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
  <Image
    src={study.image}
    alt={study.title}
    width={200}
    height={200}
    className="object-cover transition-transform duration-500 group-hover:scale-105"
  />
  </div>
  {/* Optional gradient overlay to keep text readable */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

  {/* Category Badge */}
  <div className="absolute top-4 left-4">
    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
      {study.category}
    </span>
  </div>

</div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {study.description}
                </p>
                
                {/* Results */}
                <div className="space-y-2 mb-6">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {result}
                    </div>
                  ))}
                </div>

                <Button 
                  href={study.href}
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </Section>
  );
};

export default CaseStudiesSection;
