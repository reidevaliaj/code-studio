import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {locales, type Locale} from '@/lib/i18n/locales';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    return messages;
  } catch {
    return null;
  }
}

// We only need to statically generate "de" here (EN is already at "/")
export function generateStaticParams() {
  return [{locale: 'de'}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: Locale}>
}) {
  const {locale} = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages(locale);
  if (!messages) notFound();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
