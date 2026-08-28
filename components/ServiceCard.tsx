import Link from 'next/link';
import Image from 'next/image';
import { GovernmentService } from '@/types/service';

export function ServiceCard({ service }: { service: GovernmentService }) {
  return <Link className="service-card" href={`/services/${service.slug}`}><div className="service-card-image">{service.image ? <Image src={service.image} alt={`${service.name} service`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 33vw, 370px" /> : <div className="image-fallback" aria-label={`${service.category} service illustration`}><span aria-hidden="true">✦</span></div>}</div><div className="service-card-body"><div className="card-topline"><span className="category-label">{service.category}</span><span className={`content-status ${service.status}`}>{service.status === 'verified' ? 'Source verified' : 'Demo guide'}</span><span className="arrow" aria-hidden="true">↗</span></div><h3>{service.name}</h3><p>{service.shortDescription}</p><div className="card-footer"><span>{service.level === 'Tamil Nadu' ? 'Tamil Nadu · State Government' : 'Central · Government of India'}</span><span className="view-guide">View guide <span aria-hidden="true">→</span></span></div></div></Link>;
}
