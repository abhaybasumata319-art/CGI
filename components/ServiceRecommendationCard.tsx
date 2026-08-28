import Link from 'next/link';
import { GovernmentService } from '@/types/service';

export function ServiceRecommendationCard({ service, reason }: { service: GovernmentService; reason?: string }) {
  const isVerified = service.status === 'verified';
  return <article className="recommendation-card"><div><span className="recommendation-status">{isVerified ? 'Source verified' : 'Demo guide'}</span><h3>{service.name}</h3><p>{reason || service.shortDescription}</p><small>{service.level} · {service.category}</small></div><Link href={`/services/${service.slug}`}>View guide <span aria-hidden="true">→</span></Link>{!isVerified && <small className="recommendation-warning">Detailed government information is not yet verified.</small>}</article>;
}
