import { Metadata } from 'next';
import HeroSection from '../../../components/HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import BenefitsSection from './BenefitsSection';
import ProcessSection from './ProcessSection';
import PricingSection from './PricingSection';
import AboutSection from './AboutSection';
import CTASection from './CTASection';

export const metadata: Metadata = {
  title: 'Website Rebuild Service - Faster, SEO-Stronger, Easier to Manage',
  description: 'We rebuild your current website using new technology that makes it load faster, rank better on Google, and become easier to manage — while keeping your existing layout and content.',
  keywords: 'website rebuild, website migration, faster website, SEO optimization, website performance',
  openGraph: {
    title: 'Website Rebuild Service - Faster, SEO-Stronger, Easier to Manage',
    description: 'We rebuild your current website using new technology that makes it load faster, rank better on Google, and become easier to manage — while keeping your existing layout and content.',
    type: 'website',
  },
};

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
