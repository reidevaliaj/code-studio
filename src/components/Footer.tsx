'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const Footer = () => {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params?.locale;
  const localePrefix = locale ? `/${locale}` : '';

  const serviceLinks = [
    { href: `${localePrefix}/services/ai-agents-automations`, label: t('services.aiAgents') },
    { href: `${localePrefix}/services/web-aplications`, label: t('services.webApps') },
    { href: `${localePrefix}/services/wordpress`, label: t('services.wordpress') },
    { href: `${localePrefix}/services/shopify`, label: t('services.shopify') },
    { href: `${localePrefix}/services/typo3`, label: t('services.typo3') },
    { href: `${localePrefix}/services/seo-adwords`, label: t('services.seoAdwords') },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg text-white font-semibold">{t('company.title')}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('company.description')}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('services.title')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contact.title')}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="hover:text-white transition-colors"
                >
                  {t('contact.email')}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${t('contact.phone')}`}
                  className="hover:text-white transition-colors"
                >
                  {t('contact.phone')}
                </a>
              </div>
              <div className="leading-relaxed">
                {t('contact.address')}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
