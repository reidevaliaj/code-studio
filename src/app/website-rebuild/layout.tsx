import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('websiteRebuild');
  
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
