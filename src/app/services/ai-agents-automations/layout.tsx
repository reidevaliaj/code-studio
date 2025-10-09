import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agents & Automation Services - Code Studio Albania',
  description: 'Custom AI agents and automation solutions from Albania to streamline your business operations and boost productivity.',
  keywords: 'AI agents, automation, chatbots, workflow automation, business intelligence, Albania',
  openGraph: {
    title: 'AI Agents & Automation Services - Code Studio Albania',
    description: 'Custom AI agents and automation solutions from Albania to streamline your business operations and boost productivity.',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/services/ai-agents-automations',
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
