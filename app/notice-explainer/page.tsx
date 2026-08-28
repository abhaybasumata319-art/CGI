import Link from 'next/link';
import { Header } from '@/components/Header';
import { DocumentUploader } from '@/components/DocumentUploader';

export default function NoticeExplainerPage() {
  return <><Header /><main className="inner-page notice-page"><div className="page-intro"><p className="eyebrow">Document understanding</p><h1>Got a government notice or document?</h1><p>Upload it or describe what you received. CivicGuide can help explain what it appears to mean and where to check the official information.</p></div><DocumentUploader /><div className="boundary-note"><strong>Information, not legal or tax advice.</strong> CivicGuide helps explain documents and find official sources. For important decisions, verify details with the issuing authority or a qualified professional. <Link href="/">Return home</Link></div></main><footer><span>© 2026 CivicGuide India</span><span>Independent platform. Not a government website.</span></footer></>;
}
