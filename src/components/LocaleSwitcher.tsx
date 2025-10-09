'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LocaleSwitcher = () => {
  const t = useTranslations('locale');
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 120);
    onScroll(); // set initial state on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    let newPath = pathname;

    // Remove current locale prefix if it exists
    if (params.locale) {
      newPath = pathname.replace(`/${params.locale}`, '');
    }

    // Ensure we don't have double slashes and handle root path
    newPath = newPath.replace(/\/+/g, '/');
    if (newPath === '') {
      newPath = '/';
    }

    // Add new locale prefix for German
    if (newLocale === 'de') {
      newPath = `/de${newPath}`;
    }

    // Handle root path for English
    if (newLocale === 'en' && newPath === '/') {
      newPath = '/';
    }

    router.push(newPath);
  };

  const currentLocale = params.locale || 'en';

  // Colors switch: white-on-hero initially, dark-on-white after scroll
  const linkColor = isScrolled ? 'text-slate-900 hover:text-accent-hover' : 'text-white hover:text-accent';
  const activeColor = isScrolled ? 'text-accent' : 'text-accent';
  const separatorColor = isScrolled ? 'text-slate-300' : 'text-white/30';

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => switchLocale('en')}
        disabled={currentLocale === 'en'}
        className={`px-2 py-1 text-xs font-normal uppercase tracking-wide transition-colors ${
          currentLocale === 'en'
            ? activeColor + ' cursor-default'
            : linkColor
        }`}
        aria-label="Switch to English"
      >
        {t('en')}
      </button>
      <span className={separatorColor}>|</span>
      <button
        onClick={() => switchLocale('de')}
        disabled={currentLocale === 'de'}
        className={`px-2 py-1 text-xs font-normal uppercase tracking-wide transition-colors ${
          currentLocale === 'de'
            ? activeColor + ' cursor-default'
            : linkColor
        }`}
        aria-label="Switch to German"
      >
        {t('de')}
      </button>
    </div>
  );
};

export default LocaleSwitcher;
