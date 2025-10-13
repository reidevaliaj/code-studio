import type { Metadata } from "next";
import { Play, Nunito_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

const play = Play({
  variable: "--font-play",
  subsets: ["latin"],
  weight: ["700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400"],
});

async function getMessages() {
  try {
    const messages = (await import(`../../messages/en.json`)).default;
    return messages;
  } catch {
    return {};
  }
}

export const metadata: Metadata = {
  title: "Real Estate Web Solutions - Code Studio",
  description: "Transform your real estate business with professional web solutions. AI automation, website redesign, development, maintenance, and SEO services from Albania.",
  keywords: "real estate web design, real estate website development, AI automation real estate, real estate SEO, property website",
  authors: [{ name: "Code Studio" }],
  openGraph: {
    title: "Real Estate Web Solutions - Code Studio",
    description: "Transform your real estate business with professional web solutions. AI automation, website redesign, development, maintenance, and SEO services from Albania.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Web Solutions - Code Studio",
    description: "Transform your real estate business with professional web solutions. AI automation, website redesign, development, maintenance, and SEO services from Albania.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RealEstateLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${play.variable} ${nunitoSans.variable} antialiased`}>
        <NextIntlClientProvider locale="en" messages={messages}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
