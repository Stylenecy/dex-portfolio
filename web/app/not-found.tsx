import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell nf">
      <p className="mono">404</p>
      <h1 style={{ fontSize: 'var(--step-4)' }}>That page is not here</h1>
      <p className="measure">
        The old dashboard routes were retired when this site was rebuilt. The work is
        all still here, in one list.
      </p>
      <div className="btn-row">
        <Link className="btn btn--primary" href="/#work">Go to the work</Link>
        <Link className="btn" href="/record">Full record</Link>
      </div>
    </section>
  );
}
