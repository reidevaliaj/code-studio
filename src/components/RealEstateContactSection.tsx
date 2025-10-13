'use client';

import { useTranslations } from 'next-intl';
import Section from './Section';
import Button from './Button';

export default function RealEstateContactSection() {
  const t = useTranslations('realEstateLanding.contact');

  return (
    <Section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#03283A] rounded-full flex-shrink-0"></div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#03283A] font-sans">
                  {t('subtitle')}
                </p>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-heading">
                {t('title')}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#03283A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('contactMethods.email.title')}</h3>
                  <p className="text-gray-600 mb-2">{t('contactMethods.email.description')}</p>
                  <a href="mailto:info@code-studio.eu" className="text-[#04ADBD] font-semibold hover:text-[#04ADBD]/80 transition-colors duration-200">
                    info@code-studio.eu
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#03283A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('contactMethods.phone.title')}</h3>
                  <p className="text-gray-600 mb-2">{t('contactMethods.phone.description')}</p>
                  <a href="tel:+355675852355" className="text-[#04ADBD] font-semibold hover:text-[#04ADBD]/80 transition-colors duration-200">
                    +355 67 58 52 355
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#03283A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('contactMethods.location.title')}</h3>
                  <p className="text-gray-600 mb-2">{t('contactMethods.location.description')}</p>
                  <p className="text-gray-700">{t('contactMethods.location.address')}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg">
                {t('cta.primary')}
              </Button>
              <Button href="https://wa.me/355675852355" variant="secondary" size="lg" >
                {t('cta.whatsapp')}
              </Button>
            </div>
          </div>

          {/* Right Content - Quick Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-accent-4 mb-2">{t('form.title')}</h3>
                <p className="text-gray-600">{t('form.subtitle')}</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.fields.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04ADBD] focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.fields.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04ADBD] focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.fields.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04ADBD] focus:border-transparent transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.fields.service')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04ADBD] focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">{t('form.fields.servicePlaceholder')}</option>
                    <option value="ai-agents">{t('form.fields.services.aiAgents')}</option>
                    <option value="website-redesign">{t('form.fields.services.websiteRedesign')}</option>
                    <option value="website-development">{t('form.fields.services.websiteDevelopment')}</option>
                    <option value="website-maintenance">{t('form.fields.services.websiteMaintenance')}</option>
                    <option value="seo-adwords">{t('form.fields.services.seoAdwords')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.fields.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04ADBD] focus:border-transparent transition-colors duration-200"
                    placeholder={t('form.fields.messagePlaceholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#04ADBD] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#04ADBD]/90 transition-colors duration-200"
                >
                  {t('form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
