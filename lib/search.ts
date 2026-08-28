import { GovernmentService, GovernmentLevel } from '@/types/service';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'do',
  'for',
  'get',
  'how',
  'i',
  'in',
  'is',
  'me',
  'my',
  'of',
  'the',
  'to',
  'what',
  'where',
  'with',
]);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compact(value: string): string {
  return normalize(value).replace(/\s/g, '');
}

function getSearchWords(value: string): string[] {
  return normalize(value)
    .split(' ')
    .filter(
      (word) =>
        word.length > 1 &&
        !STOP_WORDS.has(word)
    );
}

function scoreService(
  service: GovernmentService,
  query: string
): number {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return 0;
  }

  const queryWords = getSearchWords(query);

  const name = normalize(service.name);
  const description = normalize(service.shortDescription);
  const category = normalize(service.category);

  const keywords = service.keywords.map(normalize);

  const searchableText = [
    name,
    description,
    category,
    ...keywords,
  ].join(' ');

  const queryCompact = compact(normalizedQuery);
  const searchableCompact = compact(searchableText);

  let score = 0;

  // Exact service name.
  if (name === normalizedQuery) {
    score += 100;
  }

  // Query directly appears in service name.
  if (name.includes(normalizedQuery)) {
    score += 60;
  }

  // Handles:
  // "pan card" → "pancard"
  // "pancard" → "pan card"
  // "pan-card" → "pan card"
  if (
    queryCompact.length >= 3 &&
    searchableCompact.includes(queryCompact)
  ) {
    score += 45;
  }

  // Match individual words against the service name.
  for (const word of queryWords) {
    if (name.includes(word)) {
      score += 20;
    }
  }

  // Match individual words against keywords.
  for (const word of queryWords) {
    if (
      keywords.some(
        (keyword) =>
          keyword === word ||
          keyword.includes(word) ||
          word.includes(keyword)
      )
    ) {
      score += 15;
    }
  }

  // Match description and category.
  for (const word of queryWords) {
    if (description.includes(word)) {
      score += 5;
    }

    if (category.includes(word)) {
      score += 5;
    }
  }

  return score;
}

export function searchServices(
  records: GovernmentService[],
  query: string,
  level: GovernmentLevel | 'All' = 'All',
  category = 'All'
): GovernmentService[] {
  const normalizedQuery = normalize(query);

  return records
    .filter((service) => {
      const matchesLevel =
        level === 'All' ||
        service.level === level;

      const matchesCategory =
        category === 'All' ||
        service.category === category;

      return (
        matchesLevel &&
        matchesCategory
      );
    })
    .map((service) => ({
      service,
      score: scoreService(
        service,
        normalizedQuery
      ),
    }))
    .filter(({ score }) => {
      return (
        !normalizedQuery ||
        score > 0
      );
    })
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .map(({ service }) => service);
}