'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getService } from '@/data/services';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { GovernmentService } from '@/types/service';
import { ChatMessage } from './ChatMessage';
import { ServiceRecommendationCard } from './ServiceRecommendationCard';

const popularQuestions = ['Register to vote', 'File a grievance', 'Find a Tamil Nadu service', 'Check an application'];
const contextQuestions = ['How do I register?', 'What documents do I need?', 'How do I track my application?'];
const fallbackError = 'I couldn\'t complete that request right now. Please try again or open the official service guide.';

interface AssistantResponse { answer: string; relevantServices: Array<{ serviceId: string; reason: string }>; officialSources: Array<{ title: string; url: string; organization: string }>; nextSteps: string[]; caution: string; noticeHelpUrl?: string; }
interface DocumentContext { type: string; confidence?: string; }

export function AskCivicGuide({ contextService, documentContext }: { contextService?: GovernmentService; documentContext?: DocumentContext }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<AssistantResponse>();

  async function submitQuestion(event: React.FormEvent) {
    event.preventDefault();
    const content = question.trim();
    if (!content || isSending) return;
    const createdAt = new Date().toISOString();
    const nextMessages = [...messages, { id: `${createdAt}-user`, role: 'user' as const, content, createdAt }];
    setQuestion(''); setError(''); setResponse(undefined); setIsSending(true); setMessages(nextMessages);
    try {
      const result = await fetch('/api/ask-civicguide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: content, conversation: messages.slice(-12).map(({ role, content: messageContent }) => ({ role, content: messageContent })), serviceId: contextService?.slug, documentContext }) });
      const payload = await result.json() as AssistantResponse | { error?: string };
      if (!result.ok) throw new Error('error' in payload && payload.error ? payload.error : fallbackError);
      const assistantResponse = payload as AssistantResponse;
      setResponse(assistantResponse); setMessages([...nextMessages, { id: `${createdAt}-assistant`, role: 'assistant', content: assistantResponse.answer, createdAt: new Date().toISOString() }]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : '';
      setError(message === 'The CivicGuide assistant is not configured yet. Please open the official service guide.' ? message : fallbackError);
    } finally { setIsSending(false); }
  }

  function clearConversation() { setMessages([]); setResponse(undefined); setError(''); setQuestion(''); }
  const prompts = contextService?.status === 'verified' ? contextQuestions : popularQuestions;
  const recommendedServices = response?.relevantServices.map(({ serviceId, reason }) => ({ service: getService(serviceId), reason })).filter((item): item is { service: GovernmentService; reason: string } => item.service?.status === 'verified') ?? [];

  return <section className="assistant-shell" aria-label="CivicGuide Assistant">
    <div className="assistant-heading"><div><p className="eyebrow">CivicGuide Assistant</p><h1>Tell me what you need help with.</h1><p>You don&apos;t need to know the department or form number. Just describe your problem in plain language.</p></div>{messages.length > 0 && <button className="clear-button" type="button" onClick={clearConversation}>Clear conversation</button>}</div>
    {contextService && <div className={`context-banner ${contextService.status}`}><span aria-hidden="true">↳</span><div>You&apos;re asking about:<strong>{contextService.name}</strong>{contextService.status !== 'verified' && <small>Demo guide. Detailed government information is not yet verified.</small>}</div></div>}
    {documentContext && <div className="context-banner document-context"><span aria-hidden="true">▱</span><div>You&apos;re continuing from a document analysis:<strong>{documentContext.type}</strong>{documentContext.confidence && <small>{documentContext.confidence} confidence. The original document is not stored in this conversation.</small>}</div></div>}
    <div className="assistant-workspace"><div className="conversation" aria-live="polite">
      {messages.length === 0 ? <div className="conversation-empty"><span className="assistant-mark" aria-hidden="true">✦</span><h2>Start with a question.</h2><p>We&apos;ll help you find the right verified guide when the assistant is connected.</p></div> : messages.map((message) => <ChatMessage message={message} key={message.id} />)}
      {isSending && <p className="sending-state">CivicGuide is checking the relevant verified guidance...</p>}
      {error && <div className="assistant-error" role="alert"><strong>{error}</strong><span>Try again or open the official service guide.</span></div>}
      {response && <div className="assistant-response"><div className="response-section"><p className="eyebrow">Next steps</p>{response.nextSteps.length ? <ol>{response.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol> : <p>No verified next step is available yet.</p>}</div>{response.caution && <p className="response-caution">{response.caution}</p>}{recommendedServices.length > 0 && <div className="recommendations"><p className="eyebrow">Relevant verified guides</p>{recommendedServices.map(({ service, reason }) => <ServiceRecommendationCard service={service} reason={reason} key={service.slug} />)}</div>}{response.officialSources.length > 0 && <div className="response-sources"><p className="eyebrow">Official sources</p>{response.officialSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.title} <span aria-hidden="true">↗</span><small>{source.organization}</small></a>)}</div>}{response.noticeHelpUrl === '/notice-explainer' && <Link className="notice-response-link" href="/notice-explainer">Open Notice Explainer <span aria-hidden="true">→</span></Link>}</div>}
    </div><aside className="assistant-side"><div className="popular-questions"><p className="eyebrow">{contextService ? 'Ask about this service' : 'Popular questions'}</p>{prompts.map((prompt) => <button type="button" key={prompt} onClick={() => setQuestion(prompt)}>{prompt}<span aria-hidden="true">↗</span></button>)}</div><div className="notice-entry"><p className="eyebrow">Need help with a notice?</p><h2>Received a government notice?</h2><p>Describe it and we&apos;ll help identify where to check the official response process.</p><Link href="/notice-explainer">Explain a notice <span aria-hidden="true">→</span></Link></div><div className="document-entry"><strong>Have a government document?</strong><p>Tell CivicGuide what it says and we&apos;ll help identify what it is.</p><Link href="/notice-explainer">Describe a document <span aria-hidden="true">→</span></Link></div></aside></div>
    <form className="assistant-composer" onSubmit={submitQuestion}><label className="sr-only" htmlFor="assistant-question">What do you need help with?</label><input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="What do you need help with?" autoComplete="off" /><button className="button button-dark" type="submit" disabled={!question.trim() || isSending}>Send <span aria-hidden="true">↗</span></button></form><p className="assistant-safety">CivicGuide is an independent guide. We use official government sources for verified guides. Always confirm the latest details on the official government portal.</p>
  </section>;
}
