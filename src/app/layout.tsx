import type { Metadata } from "next";
import { Play, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

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
    const messages = (await import(`../messages/en.json`)).default;
    return messages;
  } catch {
    return {};
  }
}

export const metadata: Metadata = {
  title: "Code Studio - Web Design, Development & Automation",
  description: "We create exceptional web experiences through innovative design, development, and automation solutions.",
  keywords: "web design, web development, automation, AI agents, WordPress, Shopify, TYPO3, SEO",
  authors: [{ name: "Code Studio" }],
  openGraph: {
    title: "Code Studio - Web Design, Development & Automation",
    description: "We create exceptional web experiences through innovative design, development, and automation solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Studio - Web Design, Development & Automation",
    description: "We create exceptional web experiences through innovative design, development, and automation solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${play.variable} ${nunitoSans.variable} antialiased`}>
        <NextIntlClientProvider locale="en" messages={messages}>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
