'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { searchServices } from '@/lib/search';

const prompts = [
  'How do I get an income certificate?',
  'I lost my PAN card',
  'I need to renew my driving licence',
  'I received an Income Tax notice',
];

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    router.push(
      `/services?q=${encodeURIComponent(
        trimmedQuery
      )}`
    );
  }

  const matches = searchServices(
    services,
    query
  );

  return (
    <div className="hero-search-wrap">
      <form
        className="hero-search"
        onSubmit={handleSubmit}
      >
        <span
          className="search-icon"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          id="hero-search"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="What do you need help with?"
          aria-label="What do you need help with"
        />

        <button
          className="search-submit"
          type="submit"
        >
          Search{' '}
          <span aria-hidden="true">
            ↗
          </span>
        </button>
      </form>

      <div
        className="prompt-list"
        aria-label="Example questions"
      >
        {prompts.map((prompt) => (
          <button
            type="button"
            key={prompt}
            onClick={() =>
              setQuery(prompt)
            }
          >
            {prompt}
          </button>
        ))}
      </div>

      {query.trim() && (
        <p
          className="search-hint"
          aria-live="polite"
        >
          {matches.length > 0
            ? `${matches.length} ${
                matches.length === 1
                  ? 'guide'
                  : 'guides'
              } found`
            : 'No guide found yet. Try another phrase.'}
        </p>
      )}
    </div>
  );
}