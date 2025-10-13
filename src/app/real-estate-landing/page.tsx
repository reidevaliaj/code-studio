'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '../../components/HeroSection';
import RealEstateAboutSection from '../../components/RealEstateAboutSection';
import RealEstateServicesSection from '../../components/RealEstateServicesSection';
import RealEstateDesignExamplesSection from '../../components/RealEstateDesignExamplesSection';
import RealEstateWhyChooseUsSection from '../../components/RealEstateWhyChooseUsSection';
import RealEstateContactSection from '../../components/RealEstateContactSection';

export default function RealEstateLandingPage() {
  const t = useTranslations('realEstateLanding');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        ns="realEstateLanding.hero"
        imageSrc="/images/realestate-hero.jpg"
        ctaHref="#contact"
      />

      {/* About Us Section */}
      <RealEstateAboutSection />

      {/* Services Section */}
      <RealEstateServicesSection />

      {/* Design Examples Section */}
      <RealEstateDesignExamplesSection />

      {/* Why Choose Us Section */}
      <RealEstateWhyChooseUsSection />

      {/* Contact Section */}
      <RealEstateContactSection />
    </div>
  );
}
