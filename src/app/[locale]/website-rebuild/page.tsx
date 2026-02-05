import { Metadata } from 'next';
import HeroSection from '../../../components/HeroSection';
import ModernTechSection from './ModernTechSection';
import WhyMoveAwaySection from './WhyMoveAwaySection';
import BenefitsSection from './BenefitsSection';
import ProcessSection from './ProcessSection';
import PricingSection from './PricingSection';
import AboutSection from './AboutSection';
import CTASection from './CTASection';

export const metadata: Metadata = {
  title: 'Website Rebuild Service - Faster, SEO-Stronger, Easier to Manage',
  description: 'We rebuild your website using modern web technology that improves speed, SEO performance, and content management — while keeping your current design or redesigning it if you want.',
  keywords: 'website rebuild, website migration, faster website, SEO optimization, website performance',
  openGraph: {
    title: 'Website Rebuild Service - Faster, SEO-Stronger, Easier to Manage',
    description: 'We rebuild your website using modern web technology that improves speed, SEO performance, and content management — while keeping your current design or redesigning it if you want.',
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
      <ModernTechSection />
      <WhyMoveAwaySection />
      <BenefitsSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <CTASection />
    </>
  );
}
