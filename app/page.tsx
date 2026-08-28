import Link from 'next/link';
import { Header } from '@/components/Header';
import { NoticeCallout } from '@/components/NoticeCallout';
import { ServiceExplorer } from '@/components/ServiceExplorer';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryNav } from '@/components/CategoryNav';
import { GovernmentLevels } from '@/components/GovernmentLevels';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';

export default function Home() {
  return <><Header /><main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">A clearer way to get things done</p><h1>Government services,<br /><em>explained simply.</em></h1><p className="hero-lede">Find the right service, understand what you need, and know what to do next.</p><HeroSearch /></div><div className="hero-aside"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-note"><span>01</span><strong>One clear<br />next step</strong><small>for every question</small></div></div></section>
    <div className="trust-strip"><span><b className="dot green" />Independent citizen assistance</span><span>Built around official sources</span><span>Starting with Central + Tamil Nadu</span></div>
    <section className="popular"><div className="section-heading"><div><p className="eyebrow">Popular right now</p><h2>People are looking for</h2></div><Link href="/services">See all services <span aria-hidden="true">↗</span></Link></div><div className="service-grid">{services.filter((service) => service.popular).map((service) => <ServiceCard service={service} key={service.slug} />)}</div></section>
    <CategoryNav /><GovernmentLevels />
    <NoticeCallout />
    <section className="principles" id="how-it-works"><p className="eyebrow">How CivicGuide works</p><div className="principle-grid"><div><span>01</span><h3>Tell us what you need</h3><p>Ask your question in everyday words.</p></div><div><span>02</span><h3>Find the right service</h3><p>We point you to a clear, relevant guide.</p></div><div><span>03</span><h3>Follow the steps</h3><p>Know what to do before visiting an official site.</p></div></div></section>
    <section className="trust-section"><div><p className="eyebrow">Trust & transparency</p><h2>Built to make government information easier to understand.</h2></div><ul><li>Official government sources are linked where available</li><li>Service information is organized in plain language</li><li>CivicGuide is independent and is not a government website</li></ul></section>
  </main><footer><span>© 2026 CivicGuide India</span><span>Independent platform. Not a government website.</span></footer></>;
}
