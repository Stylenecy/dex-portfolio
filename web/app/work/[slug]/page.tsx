import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { caseStudies, getCase, type CaseStudy } from '@/data/caseStudies';

const ACCENT_VAR: Record<CaseStudy['accent'], string> = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  violet: 'var(--violet)',
  green: 'var(--green)',
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: 'Not found' };
  return {
    title: `${c.name} — ${c.forWhom}`,
    description: c.summary,
    openGraph: { title: `${c.name} — Dex Bennett`, description: c.summary },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const style = { ['--accent' as string]: ACCENT_VAR[c.accent] } as CSSProperties;
  const idx = caseStudies.findIndex((x) => x.slug === c.slug) + 1;

  return (
    <div style={style}>
      <article>
        <header className="case-hero shell">
          <p className="mono">
            Case {String(idx).padStart(2, '0')} · {c.year}
          </p>
          <h1 style={{ marginTop: 'var(--s-4)', fontSize: 'var(--step-4)' }}>{c.name}</h1>
          <p className="case-hero__for">{c.forWhom}</p>
          <p className="case-hero__sum">{c.summary}</p>

          <dl className="case-facts">
            <div>
              <dt>Status</dt>
              <dd>{c.statusLabel}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{c.role}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{c.stack.join(' · ')}</dd>
            </div>
            {c.url && (
              <div>
                <dt>Live</dt>
                <dd>
                  <a className="tlink" href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.urlLabel ?? c.url} ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>

        {c.metrics.length > 0 && (
          <section className="sec sec--tight shell" aria-label="Key numbers">
            <div className="metrics reveal">
              {c.metrics.map((m) => (
                <div className="metric" key={m.label}>
                  <span className="metric__v">{m.value}</span>
                  <span className="metric__l">{m.label}</span>
                  {m.note && <span className="metric__n">{m.note}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="sec shell" aria-labelledby="h-problem">
          <div className="sec__head">
            <p className="sec__idx">01 / The problem</p>
            <h2 className="sec__title" id="h-problem">What was actually in the way</h2>
          </div>
          <div className="prose reveal">
            {c.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="sec shell" aria-labelledby="h-decisions">
          <div className="sec__head">
            <p className="sec__idx">02 / Decisions</p>
            <h2 className="sec__title" id="h-decisions">What I chose, and why</h2>
          </div>
          <div className="blocks">
            {c.decisions.map((d, i) => (
              <div className="block reveal" key={d.title}>
                <h3 className="block__t">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {d.title}
                </h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec shell" aria-labelledby="h-result">
          <div className="sec__head">
            <p className="sec__idx">03 / Result</p>
            <h2 className="sec__title" id="h-result">What is true now</h2>
          </div>
          <ul className="bullets reveal">
            {c.result.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="sec shell" aria-labelledby="h-honest">
          <div className="sec__head">
            <p className="sec__idx">04 / Not done</p>
            <h2 className="sec__title" id="h-honest">What is unfinished or untrue yet</h2>
          </div>
          <div className="honest reveal">
            <ul className="bullets">
              {c.honest.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec shell" aria-labelledby="h-src">
          <div className="sec__head">
            <p className="sec__idx">05 / Sources</p>
            <div>
              <h2 className="sec__title" id="h-src">Where these claims come from</h2>
              <p className="sec__note">
                Working documents on my own machine, not marketing copy. Listed so the numbers above
                can be challenged.
              </p>
            </div>
          </div>
          <div className="sources reveal">
            {c.sources.map((s, i) => (
              <span key={i}>— {s}</span>
            ))}
          </div>
        </section>

        <section className="sec shell">
          <div className="btn-row">
            <Link className="btn" href="/">← All work</Link>
            {c.url && (
              <a className="btn btn--primary" href={c.url} target="_blank" rel="noopener noreferrer">
                Open {c.name} ↗
              </a>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
