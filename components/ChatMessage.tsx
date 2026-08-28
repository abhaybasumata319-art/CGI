import { ChatMessage as ChatMessageType } from '@/types/chat';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  return <article className={`chat-message ${message.role}`} aria-label={`${message.role === 'user' ? 'Your message' : 'CivicGuide message'}: ${message.content}`}><div className="message-label">{message.role === 'user' ? 'You' : 'CivicGuide Assistant'}</div><p>{message.content}</p><time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</time></article>;
}
