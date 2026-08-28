import Link from 'next/link';

export function GovernmentLevels() {
  return <section className="levels-section"><div className="level-intro"><p className="eyebrow">Choose your starting point</p><h2>Services for where you are.</h2><p>Government level matters. Start with services available across India or those specific to Tamil Nadu.</p></div><div className="level-grid"><Link className="level-card central" href="/services?level=Central"><span>01</span><h3>Central Government</h3><p>Services available across India.</p><b>Explore services <span aria-hidden="true">↗</span></b></Link><Link className="level-card tamil" href="/services?level=Tamil%20Nadu"><span>02</span><h3>Tamil Nadu Government</h3><p>Services specific to Tamil Nadu.</p><b>Explore services <span aria-hidden="true">↗</span></b></Link></div></section>;
}
