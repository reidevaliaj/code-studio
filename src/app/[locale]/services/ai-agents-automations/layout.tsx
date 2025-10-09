import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KI-Agenten & Automatisierungsdienstleistungen - Code Studio Albanien',
  description: 'Maßgeschneiderte KI-Agenten und Automatisierungslösungen aus Albanien zur Optimierung Ihrer Geschäftsabläufe und Steigerung der Produktivität.',
  keywords: 'KI-Agenten, Automatisierung, Chatbots, Workflow-Automatisierung, Business Intelligence, Albanien',
  openGraph: {
    title: 'KI-Agenten & Automatisierungsdienstleistungen - Code Studio Albanien',
    description: 'Maßgeschneiderte KI-Agenten und Automatisierungslösungen aus Albanien zur Optimierung Ihrer Geschäftsabläufe und Steigerung der Produktivität.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: '/de/services/ai-agents-automations',
    languages: {
      'en': '/services/ai-agents-automations',
      'de': '/de/services/ai-agents-automations',
      'x-default': '/services/ai-agents-automations',
    },
  },
};

export default function AIAgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
