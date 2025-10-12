import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Button from '../../components/Button';
import ServicesSection from '../../components/ServicesSection';
import PartnersSection from '../../components/PartnersSection';
import HeroSection from '../../components/HeroSection';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Partner with Code Studio - International Web Development Partnership',
  description: 'Become a Code Studio partner and benefit from professional web development services at competitive prices from Albania.',
  keywords: 'web development partner, Albania development, international partnership, web agency partner',
  openGraph: {
    title: 'Partner with Code Studio - International Web Development Partnership',
    description: 'Become a Code Studio partner and benefit from professional web development services at competitive prices from Albania.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/partners',
    languages: {
      'en': '/partners',
      'de': '/de/partners',
      'x-default': '/partners',
    },
  },
};

function PartnerHero() {
  const t = useTranslations('partners.hero');

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            {t('title')}
          </h1>
          <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-sans">
            {t('description')}
          </p>
          <Button 
            href="#contact-form" 
            variant="primary" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
          >
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyPartnerSection() {
  const t = useTranslations('partners.whyPartner');

  return (
    <Section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
                {t('title')}
              </h2>
              <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
                {t('subtitle')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-sans">
                {t('description')}
              </p>
            </div>
            
            {/* Benefits List */}
            <div className="space-y-4">
              {t.raw('benefits').map((benefit: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-sans">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <ImageWithIcon imageSrc="/images/partnership.jpg" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function WhyChooseUsSection() {
  const t = useTranslations('partners.whyChooseUs');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-xl text-accent font-semibold font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.raw('items').map((item: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ContactFormSection() {
  const t = useTranslations('partners.contactForm');

  return (
    <Section className="py-20" id="contact-form">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
                {t('title')}
              </h2>
              <p className="text-xl section-subtitle font-semibold mb-6 font-sans">
                {t('subtitle')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-sans">
                {t('description')}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-sans">info@code-studio.eu</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-sans">+355 67 58 52 355</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  {t('form.country')}
                </label>
                <select
                  id="country"
                  name="country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                >
                  <option value="">Select Country</option>
                  <option value="germany">Germany</option>
                  <option value="switzerland">Switzerland</option>
                  <option value="usa">United States</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="services" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  {t('form.services')}
                </label>
                <select
                  id="services"
                  name="services"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                >
                  <option value="">Select Services</option>
                  <option value="web-development">Web Development</option>
                  <option value="web-design">Web Design</option>
                  <option value="wordpress">WordPress Development</option>
                  <option value="shopify">Shopify Development</option>
                  <option value="ai-automation">AI Automation</option>
                  <option value="seo">SEO & Google Ads</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-sans"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full py-4 text-lg font-semibold"
              >
                {t('form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ImageWithIcon({
  imageSrc,
}: {
  imageSrc: string;
}) {
  return (
    <div className="relative w-[400px] h-[300px] md:w-[450px] md:h-[350px]">
      {/* Image card */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt="Partnership with Code Studio"
          width={450}
          height={350}
          className="w-full h-full object-cover"
          priority
        />

        {/* soft bottom gradient like the reference */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Overlapping icon + pill (bottom-left) */}
      <div className="absolute -bottom-1 -left-1 flex items-center gap-3">
        {/* circular icon badge */}
        <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center ring-4 ring-white shadow-lg">
          <span className="text-2xl font-bold font-heading">&lt;/&gt;</span>
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection ns="partners.hero" videoSrc="/videos/partnervideo.mp4" />
        <WhyPartnerSection />
        <WhyChooseUsSection />
        <ServicesSection />
        <ContactFormSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
