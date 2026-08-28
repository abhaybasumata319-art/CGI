export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface AssistantResponseShape {
  answer: string;
  relevantServices: Array<{ serviceId: string; reason: string }>;
  officialSources: Array<{ title: string; url: string; organization: string }>;
  caution?: string;
  nextSteps: string[];
  noticeHelpUrl?: string;
}
