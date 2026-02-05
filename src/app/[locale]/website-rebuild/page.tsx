'use client';

import HeroSection from '../../../components/HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import BenefitsSection from './BenefitsSection';
import ProcessSection from './ProcessSection';
import PricingSection from './PricingSection';
import AboutSection from './AboutSection';
import CTASection from './CTASection';

export default function WebsiteRebuildPage() {
  return (
    <>
      <HeroSection 
        ns="websiteRebuild.hero"
        imageSrc="/images/webaplication.jpg"
        ctaHref="#cta-section"
      />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <CTASection />
    </>
  );
}
