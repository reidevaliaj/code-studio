'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Section from './Section';
import Image from 'next/image';

const PartnersSection = () => {
  const t = useTranslations('home.partners');
  const [currentSlide, setCurrentSlide] = useState(0);

  const partners = [
    { name: 'TechCorp2', logo: '/images/lensandframe.png' },
    { name: 'Innovate2Lab', logo: '/images/econext.png' },
    { name: 'DigitalFlow', logo: '/images/fwg.png' },
    { name: 'WebMaster', logo: '/images/partner4.png' },
    { name: 'CloudTech', logo: '/images/partner5.png' },
    { name: 'DataSync', logo: '/images/partner6.png' },
    { name: 'FutureSoft', logo: '/images/partner7.png' },

  ];

  const slidesPerView = 6;
  const totalSlides = Math.ceil(partners.length / slidesPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const getCurrentPartners = () => {
    const start = currentSlide * slidesPerView;
    return partners.slice(start, start + slidesPerView);
  };

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-blue-600 font-semibold">
            {t('subtitle')}
          </p>
        </div>

        {/* Partners Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                  {partners
                    .slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView)
                    .map((partner, index) => (
                      <div
                        key={`${slideIndex}-${index}`}
                        className="group flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        {/* Logo Placeholder */}
                        <div className="w-full h-16 flex items-center justify-center">
                          <div className="w-32 h-12 bg-gradient-to-r from-blue-700 to-blue-400 rounded flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                            <span className="text-gray-600 font-semibold text-sm group-hover:text-blue-600 transition-colors p-4">
                              <Image src={partner.logo} alt={partner.name} width={200} height={200} />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
          {t('trusted')}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default PartnersSection;
