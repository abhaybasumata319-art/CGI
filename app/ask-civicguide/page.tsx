import Link from 'next/link';
import { Header } from '@/components/Header';
import { AskCivicGuide } from '@/components/AskCivicGuide';
import { getService } from '@/data/services';

export default function AskCivicGuidePage({ searchParams }: { searchParams: { serviceId?: string; documentType?: string; confidence?: string } }) {
  const contextService = searchParams.serviceId ? getService(searchParams.serviceId) : undefined;
  return <><Header /><main className="inner-page assistant-page"><AskCivicGuide contextService={contextService} documentContext={searchParams.documentType ? { type: searchParams.documentType, confidence: searchParams.confidence } : undefined} /></main><footer><span>© 2026 CivicGuide India</span><span>Independent platform. Not a government website.</span></footer></>;
}