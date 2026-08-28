import { Header } from '@/components/Header';
import { ServiceExplorer } from '@/components/ServiceExplorer';

export default function ServicesPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    level?: 'Central' | 'Tamil Nadu';
  };
}) {
  return (
    <>
      <Header />

      <main className="inner-page">
        <div className="page-intro">
          <p className="eyebrow">
            Service library
          </p>

          <h1>
            Find your next step.
          </h1>

          <p>
            Explore service guides by
            government level and category.
            Sample records are clearly
            labelled until their details
            are verified.
          </p>
        </div>

        <ServiceExplorer
          initialQuery={
            searchParams.q ?? ''
          }
          initialCategory={
            searchParams.category ?? 'All'
          }
          initialLevel={
            searchParams.level ?? 'All'
          }
        />
      </main>

      <footer>
        <span>
          © 2026 CivicGuide India
        </span>

        <span>
          Independent platform. Not a
          government website.
        </span>
      </footer>
    </>
  );
}