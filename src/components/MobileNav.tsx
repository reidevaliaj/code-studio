'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const t = useTranslations('nav');
  const tServices = useTranslations('footer.services');
  const pathname = usePathname();
  const params = useParams();

  // Get current locale
  const currentLocale = params.locale || 'en';
  const localePrefix = currentLocale === 'de' ? '/de' : '';

  const serviceLinks = [
    { href: `${localePrefix}/services/ai-agents-automations`, label: tServices('aiAgents') },
    { href: `${localePrefix}/services/web-aplications`, label: tServices('webApps') },
    { href: `${localePrefix}/services/wordpress`, label: tServices('wordpress') },
    { href: `${localePrefix}/services/shopify`, label: tServices('shopify') },
    { href: `${localePrefix}/services/typo3`, label: tServices('typo3') },
    { href: `${localePrefix}/services/seo-adwords`, label: tServices('seoAdwords') },
  ];

  const navLinks = [
    { href: `${localePrefix}/`, label: t('home') },
    { href: `${localePrefix}/#about`, label: t('about') },
    { href: `${localePrefix}/partners`, label: t('partners') },
    { href: `${localePrefix}/services`, label: t('services'), hasSubmenu: true },
    { href: `${localePrefix}/contact`, label: t('contact') },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-sm border-b border-white/10">
        {navLinks.map((link) => {
          const isActive = link.href.includes('#about') 
            ? pathname === `${localePrefix}/` && (typeof window !== 'undefined' ? window.location.hash === '#about' : false)
            : pathname === link.href || (link.href !== `${localePrefix}/` && pathname.startsWith(link.href));
          
          if (link.hasSubmenu) {
            return (
              <div key={link.href}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-normal uppercase tracking-wide transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-accent-2 bg-accent-2/10'
                      : 'text-white hover:text-accent-2 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  <svg 
                    className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Services Submenu */}
                {isServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={onClose}
                        className="block px-3 py-2 rounded-md text-sm text-white/80 hover:text-accent-2 hover:bg-white/5 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`block px-3 py-2 rounded-md text-sm font-normal uppercase tracking-wide transition-colors ${
                isActive
                  ? 'text-accent-2 bg-accent-2/10'
                  : 'text-white hover:text-accent-2 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        
        {/* Locale Switcher in mobile menu */}
        <div className="px-3 py-2">
          <div className="text-xs font-normal uppercase tracking-wide text-white/70 mb-2">Language</div>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
