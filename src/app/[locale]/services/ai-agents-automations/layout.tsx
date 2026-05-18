import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'White-Label AI-Systeme, LLM-Anwendungen & Automatisierungen - Code Studio',
  description: 'White-Label AI Agents, LLM-Integrationen, Voice-AI, RAG-Systeme, semantische Suche und API-Automatisierungen für Softwareunternehmen und Agenturen.',
  keywords: 'AI Agents, White-Label AI, LLM-Integrationen, RAG-Systeme, Voice AI, LangChain, LangGraph, FastAPI',
  openGraph: {
    title: 'White-Label AI-Systeme, LLM-Anwendungen & Automatisierungen - Code Studio',
    description: 'White-Label AI Agents, LLM-Integrationen, Voice-AI, RAG-Systeme, semantische Suche und API-Automatisierungen für Softwareunternehmen und Agenturen.',
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
