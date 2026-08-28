'use client';

import { useState } from 'react';
import { services } from '@/data/services';
import { searchServices } from '@/lib/search';
import { GovernmentLevel } from '@/types/service';
import { ServiceCard } from './ServiceCard';

const levels: Array<GovernmentLevel | 'All'> = ['All', 'Central', 'Tamil Nadu'];
const categories = ['All', ...Array.from(new Set(services.map((service) => service.category)))];

export function ServiceExplorer({ initialQuery = '', initialLevel = 'All', initialCategory = 'All' }: { initialQuery?: string; initialLevel?: GovernmentLevel | 'All'; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [level, setLevel] = useState<GovernmentLevel | 'All'>(initialLevel);
  const [category, setCategory] = useState(initialCategory);
  const results = searchServices(services, query, level, category);

  return (
    <section className="explorer" id="explore">
      <div className="section-heading"><div><p className="eyebrow">Start here</p><h2>What do you need help with?</h2></div><span className="result-count">{results.length} guides</span></div>
      <div className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by what you need" aria-label="Search government services" /></div>
      <div className="filter-row" aria-label="Service filters">
        <div className="filter-group">{levels.map((item) => <button className={level === item ? 'filter active' : 'filter'} onClick={() => setLevel(item)} key={item} type="button">{item}</button>)}</div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
          {categories.map((item) => <option key={item} value={item}>{item === 'All' ? 'All categories' : item}</option>)}
        </select>
        {(query || level !== 'All' || category !== 'All') && <button className="reset-filter" type="button" onClick={() => { setQuery(''); setLevel('All'); setCategory('All'); }}>Reset filters</button>}
      </div>
      <div className="service-grid">{results.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      {results.length === 0 && <div className="empty-state"><h3>No guide yet</h3><p>Try a different phrase. We are adding more verified services over time.</p></div>}
    </section>
  );
}
