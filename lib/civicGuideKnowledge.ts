import { services } from '@/data/services';
import { GovernmentService } from '@/types/service';

export function getVerifiedServices(): GovernmentService[] {
  return services.filter((service) => service.status === 'verified');
}

export function getVerifiedServiceKnowledge(service: GovernmentService) {
  if (service.status !== 'verified') return undefined;
  return {
    serviceId: service.slug,
    name: service.name,
    purpose: service.shortDescription,
    governmentLevel: service.level,
    category: service.category,
    steps: service.steps ?? [],
    officialSources: service.officialSources ?? [],
    tracking: service.tracking,
    help: service.grievanceHelp,
    lastVerified: service.lastVerified,
    status: service.status,
  };
}

export function getServiceKnowledgeContext() {
  return getVerifiedServices().map(getVerifiedServiceKnowledge).filter(Boolean);
}
