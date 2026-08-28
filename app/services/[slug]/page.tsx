import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { getService, services } from '@/data/services';
import { ServiceGuide } from '@/components/ServiceGuide';

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();
  return <><Header /><main className="inner-page guide-page"><ServiceGuide service={service} /></main><footer><span>© 2026 CivicGuide India</span><span>Independent platform. Not a government website.</span></footer></>;
}
