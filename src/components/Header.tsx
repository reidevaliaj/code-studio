'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import MobileNav from './MobileNav';
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const t = useTranslations('nav');
  const tServices = useTranslations('footer.services');
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 120);
    onScroll(); // set initial state on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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

  // Colors switch: white-on-hero initially, dark-on-white after scroll
  const linkColor = isScrolled ? 'text-slate-900 hover:text-accent-hover' : 'text-white hover:text-accent';
  const activeColor = isScrolled ? 'text-accent' : 'text-accent';

  return (
    <>
      <header
        className={[
          // position behavior
          isScrolled ? 'fixed' : 'absolute',
          'top-0 left-0 right-0  pt-[20px] pb-[20px] z-50 transition-all duration-300',
          // backgrounds & borders
          isScrolled
            ? 'bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm'
            : 'bg-transparent mb-[-56px] border-b border-white/10',
        ].join(' ')}
      >
        <div className="max-w-[1220px] mx-auto px-3">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href={`${localePrefix}/`}
                 className={[
                   'text-lg font-medium transition-colors',
                   isScrolled ? 'text-slate-900' : 'text-accent-2',
                   isScrolled ? 'hover:text-accent-hover' : 'hover:text-accent-2',
                 ].join(' ')}
              >
                <Image
                    src={isScrolled ? '/images/logodark.png' : '/images/logowhite.png'}
                    alt="Code Studio"
                    width={325}
                    height={60}   // adjust to your logo’s intrinsic ratio
                    className="w-[110px] sm:w-[150px] md:w-[150px] lg:w-[325px] h-auto"
                    priority      // optional: avoids layout shift for header logo
                    />
                                
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="dark-section hidden lg:flex items-center">
              <ul className="flex items-center space-x-8 list-none m-0 p-0">
                {navLinks.map((link) => {
                  const isActive = link.href.includes('#about') 
                    ? pathname === `${localePrefix}/` && (typeof window !== 'undefined' ? window.location.hash === '#about' : false)
                    : pathname === link.href || (link.href !== `${localePrefix}/` && pathname.startsWith(link.href));
                  
                  if (link.hasSubmenu) {
                    return (
                      <li key={link.href} className="list-none relative group">
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={[
                            'text-sm font-normal uppercase tracking-wide transition-colors flex items-center',
                            linkColor,
                            isActive ? activeColor : '',
                          ].join(' ')}
                        >
                          {link.label}
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Services Dropdown */}
                        {isServicesOpen && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                {service.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }
                  
                  return (
                    <li key={link.href} className="list-none">
                      <Link
                        href={link.href}
                        className={[
                          'text-sm font-normal uppercase tracking-wide transition-colors',
                          linkColor,
                          isActive ? activeColor : '',
                        ].join(' ')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="list-none ml-4">
                  <LocaleSwitcher />
                </li>
              </ul>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              <LocaleSwitcher />
              <button
                onClick={toggleMobileMenu}
                 className={[
                   'inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-colors',
                   isScrolled ? 'text-slate-900 hover:text-accent-hover' : 'text-white hover:text-accent',
                 ].join(' ')}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      </header>
     
    </>
  );
};

export default Header;
