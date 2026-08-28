import Link from 'next/link';

const categories = [
  ['Identity & documents', 'Identity'], ['Money & tax', 'Money'], ['Certificates', 'Certificates'], ['Travel & passport', 'Travel'],
  ['Driving & vehicles', 'Vehicles'], ['Education', 'Education'], ['Jobs & employment', 'Jobs'], ['Benefits & welfare', 'Benefits'], ['Property & land', 'Property'], ['Complaints & grievances', 'Complaints'],
];

export function CategoryNav() {
  return <section className="category-section"><div className="section-heading"><div><p className="eyebrow">Browse by need</p><h2>Start with what you need.</h2></div></div><div className="category-grid">{categories.map(([label, filter], index) => <Link className="category-link" href={`/services?category=${encodeURIComponent(filter)}`} key={label}><span className={`category-number n${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><span>{label}</span><span aria-hidden="true">↗</span></Link>)}</div><p className="category-note">Some categories are still being built. We only show details when they are verified.</p></section>;
}
