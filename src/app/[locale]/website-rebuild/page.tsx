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

function ProblemSection() {
  const t = useTranslations('websiteRebuild.problem');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans">
          {t('description')}
        </p>
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8 text-left">
          <p className="text-lg font-semibold text-gray-900 mb-6 font-sans">
            You might recognize this:
          </p>
          <ul className="space-y-4">
            {t.raw('issues').map((issue: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-2 text-xl mt-1">•</span>
                <span className="text-gray-700 font-sans">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xl font-semibold text-gray-900 font-heading">
          {t('conclusion')}
        </p>
      </div>
    </Section>
  );
}

function SolutionSection() {
  const t = useTranslations('websiteRebuild.solution');

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.raw('points').map((point: string, index: number) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-accent-2 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✓</span>
              </div>
              <p className="text-gray-800 font-semibold font-sans">{point}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent text-white p-8 rounded-lg">
          <p className="text-xl font-semibold mb-6 font-heading">{t('result')}</p>
          <ul className="space-y-3">
            {t.raw('benefits').map((benefit: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-2 text-xl">•</span>
                <span className="font-sans">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-lg text-gray-700 mt-8 font-sans">
          {t('conclusion')}
        </p>
      </div>
    </Section>
  );
}

function BenefitsSection() {
  const t = useTranslations('websiteRebuild.benefits');

  const benefits = [
    { key: 'speed', icon: '⚡' },
    { key: 'seo', icon: '🔍' },
    { key: 'maintenance', icon: '🔧' },
    { key: 'content', icon: '📝' }
  ];

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.key} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                    {t(`items.${benefit.key}.title`)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-sans">
                    {t(`items.${benefit.key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProcessSection() {
  const t = useTranslations('websiteRebuild.process');

  const steps = [
    { key: 'review', number: '01' },
    { key: 'rebuild', number: '02' },
    { key: 'testing', number: '03' },
    { key: 'launch', number: '04' }
  ];

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.key} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-accent-2 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold font-heading">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="text-gray-700 text-sm font-sans">
                {t(`steps.${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PricingSection() {
  const t = useTranslations('websiteRebuild.pricing');

  return (
    <Section className="py-20 bg-accent text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-heading">
          {t('title')}
        </h2>
        <p className="text-lg mb-8 leading-relaxed font-sans">
          {t('description')}
        </p>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-8">
          <ul className="space-y-4 text-left max-w-2xl mx-auto">
            {t.raw('guarantees').map((guarantee: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-2 text-xl">✔</span>
                <span className="font-sans">{guarantee}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-semibold font-sans">
          {t('conclusion')}
        </p>
      </div>
    </Section>
  );
}

function AboutSection() {
  const t = useTranslations('websiteRebuild.about');

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading">
            {t('title')}
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('description')}
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('focus')}
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
            {t('clients')}
          </p>
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-lg font-semibold text-gray-900 font-heading">
              {t('founder.name')}
            </p>
            <p className="text-gray-600 font-sans">{t('founder.title')}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  const t = useTranslations('websiteRebuild.cta');
  const [formData, setFormData] = useState({
    websiteUrl: '',
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/website-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          websiteUrl: '',
          name: '',
          email: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Section id="cta-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-sans">
            {t('description')}
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                {t('form.websiteUrl')}
              </label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                required
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent font-sans"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent font-sans"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent font-sans"
                />
              </div>
            </div>

            <div className="text-center">
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-sans">
                  Website review request sent successfully! We will contact you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-sans">
                  Error sending request. Please try again or contact us directly.
                </div>
              )}
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : t('form.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
