import { GovernmentService } from '@/types/service';
import { getVerifiedServices } from './civicGuideKnowledge';

const ignoredWords = new Set(['a', 'an', 'and', 'can', 'do', 'for', 'get', 'how', 'i', 'in', 'is', 'my', 'of', 'the', 'to', 'what', 'where']);

function words(value: string) {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2 && !ignoredWords.has(word));
}

export function findRelevantServices(query: string): GovernmentService[] {
  const queryWords = words(query);
  if (!queryWords.length) return [];
  return getVerifiedServices()
    .map((service) => {
      const searchable = words([service.name, service.category, service.shortDescription, ...service.keywords].join(' '));
      const score = queryWords.reduce((total, queryWord) => total + (searchable.some((word) => word.includes(queryWord) || queryWord.includes(word)) ? 1 : 0), 0);
      return { service, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .map(({ service }) => service);
}
