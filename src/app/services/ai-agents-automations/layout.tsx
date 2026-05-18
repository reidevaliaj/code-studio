import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'White-Label AI Systems, LLM Apps & Automations - Code Studio',
  description: 'White-label AI agents, LLM integrations, voice AI, RAG systems, semantic search, and API automations for software companies and agencies.',
  keywords: 'AI agents, white-label AI, LLM integrations, RAG systems, voice AI, LangChain, LangGraph, FastAPI',
  openGraph: {
    title: 'White-Label AI Systems, LLM Apps & Automations - Code Studio',
    description: 'White-label AI agents, LLM integrations, voice AI, RAG systems, semantic search, and API automations for software companies and agencies.',
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
