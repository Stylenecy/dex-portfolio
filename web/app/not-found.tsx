import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell nf">
      <p className="mono">404</p>
      <h1 style={{ fontSize: 'var(--step-4)' }}>That page is not here</h1>
      <p className="measure">
        This site was rebuilt on 2 August 2026 and the old dashboard routes were retired. The work is
        all still here, in one list.
      </p>
      <div className="btn-row">
        <Link className="btn btn--primary" href="/">Go to the work</Link>
        <Link className="btn" href="/record">Full record</Link>
      </div>
    </section>
  );
}
