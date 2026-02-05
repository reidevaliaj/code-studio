import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/locales';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'websiteRebuild' });
  
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: 'website rebuild, website migration, faster website, SEO optimization, website performance',
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
    },
  };
}
