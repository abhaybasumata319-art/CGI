import Link from 'next/link';

export function NoticeCallout() {
  return (
    <section className="notice-callout">
      <div className="notice-icon" aria-hidden="true">✦</div>
      <div><p className="eyebrow">Not sure what you received?</p><h2>Make sense of a government notice.</h2><p>Paste the text of a notice and get a plain-language explanation of dates, actions, and official next steps.</p></div>
      <Link className="button button-light" href="/notice-explainer">Explain a notice <span aria-hidden="true">→</span></Link>
    </section>
  );
}
