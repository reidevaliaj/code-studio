'use client';

import { useTranslations } from 'next-intl';
import Section from './Section';
import Image from 'next/image';

export default function RealEstateDesignExamplesSection() {
  const t = useTranslations('realEstateLanding.designExamples');

  const designExamples = [
    {
      title: 'Houzez Real Estate',
      description: 'Modern real estate theme with advanced search and property listings',
      url: 'https://demo01.houzez.co/',
      image: '/images/design-examples/houzez.png',
      features: ['Property Search', 'Advanced Filters', 'Agent Profiles', 'Property Management']
    },
    {
      title: 'RealHomes Ultra',
      description: 'Premium real estate solution with gallery layouts and property showcases',
      url: 'https://ultra.realhomes.io/',
      image: '/images/design-examples/realhomes.png',
      features: ['Gallery Layouts', 'Property Showcases', 'Agent Directory', 'Contact Forms']
    },
    {
      title: 'MyHome Real Estate',
      description: 'Clean and professional design with property listings and search functionality',
      url: 'https://myhome1.tangiblewp.com/',
      image: '/images/design-examples/myhome.png',
      features: ['Property Listings', 'Search Functionality', 'Clean Design', 'Mobile Responsive']
    },
    {
      title: 'HomePress Real Estate',
      description: 'Modern real estate theme with video backgrounds and property showcases',
      url: 'https://homepress.stylemixthemes.com/home-real-estate-v2/',
      image: '/images/design-examples/homepress.png',
      features: ['Video Backgrounds', 'Property Showcases', 'Modern Design', 'Interactive Elements']
    },
    {
      title: 'FindHouses Real Estate',
      description: 'Professional real estate website with advanced property search and filtering',
      url: 'https://code-theme.com/html/findhouses/index.html',
      image: '/images/design-examples/findhouses.png',
      features: ['Advanced Search', 'Property Filtering', 'Professional Layout', 'User Experience']
    },
    {
      title: 'Resido Real Estate',
      description: 'Premium real estate solution with multiple layouts and property management',
      url: 'https://resido-v2.smartdemowp.com/home-layout-8/?header_layout=2_1',
      image: '/images/design-examples/resido.png',
      features: ['Multiple Layouts', 'Property Management', 'Premium Design', 'Customization']
    }
  ];

  return (
    <Section className="py-20 bg-white">
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

        {/* Design Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designExamples.map((example, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Image Container with Hover Effect */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                {/* Main Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={example.image}
                    alt={`${example.title} website screenshot`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div class="text-center text-gray-500">
                              <div class="text-4xl mb-2">🏠</div>
                              <div class="text-sm">Design Preview</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#04ADBD]/20 to-transparent z-10"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                    <a
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                    >
                      View Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-accent-4 mb-2">
                  {example.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {example.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {example.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#04ADBD] rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={example.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#04ADBD] font-semibold hover:text-[#04ADBD]/80 transition-colors duration-200"
                >
                  View Live Demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            {t('bottomText')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#04ADBD] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#04ADBD]/90 transition-colors duration-200"
          >
            {t('cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </Section>
  );
}
