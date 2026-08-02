import Link from 'next/link';
import type { CSSProperties } from 'react';
import { profile, contactChannels } from '@/data/profile';
import { caseStudies, type CaseStudy } from '@/data/caseStudies';
import { liveBuilds, competitions } from '@/data/record';

const ACCENT_VAR: Record<CaseStudy['accent'], string> = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  violet: 'var(--violet)',
  green: 'var(--green)',
};

function accentStyle(accent: CaseStudy['accent']): CSSProperties {
  return { ['--accent' as string]: ACCENT_VAR[accent] } as CSSProperties;
}

function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  return (
    <article className="case-card reveal" style={accentStyle(c.accent)}>
      <div className="case-card__top">
        <span className="case-card__num">{String(index + 1).padStart(2, '0')}</span>
        <span className={`pill${c.status === 'live' ? ' pill--live' : ''}`}>{c.statusLabel}</span>
      </div>

      <h3 className="case-card__title">
        <Link href={`/work/${c.slug}`}>{c.name}</Link>
      </h3>
      <p className="case-card__for">{c.forWhom}</p>
      <p className="case-card__sum">{c.summary}</p>

      {c.metrics.length > 0 && (
        <div className="metrics">
          {c.metrics.slice(0, 4).map((m) => (
            <div className="metric" key={m.label}>
              <span className="metric__v">{m.value}</span>
              <span className="metric__l">{m.label}</span>
              {m.note && <span className="metric__n">{m.note}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="case-card__foot">
        <div className="tags">
          {c.stack.slice(0, 4).map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <span className="case-card__go" aria-hidden="true">Read the case →</span>
      </div>
    </article>
  );
}

export default function HomePage() {
  const featured = caseStudies.filter((c) => c.featured);
  const rest = caseStudies.filter((c) => !c.featured);
  const wins = competitions.filter((c) => c.outcome !== 'pending');

  return (
    <>
      <section className="hero shell" aria-labelledby="title">
        <p className="mono">Yogyakarta, Indonesia · Information Systems, semester 7 · open to internships</p>

        <h1 className="hero__name" id="title">Dex<br />Bennett</h1>

        <p className="hero__thesis">
          Most of what I build ends up in the hands of people software usually skips —{' '}
          <em>elderly mentors, church volunteers, high-school students, people who cannot travel.</em>
        </p>

        <p className="hero__sub">
          I am a student, so I say this plainly: none of this is a product with a revenue line. What it
          is, is software that real people opened on their own phones — and that I went back and audited
          afterwards, including the time I found I had left participant data readable by anyone.
        </p>

        <div className="hero__meta">
          <div>
            <span className="mono">Live builds</span>
            <b>{liveBuilds.length} reachable today</b>
          </div>
          <div>
            <span className="mono">Competitions</span>
            <b>1 national win, 3 finals</b>
          </div>
          <div>
            <span className="mono">Currently</span>
            <b>Chairing a 59-student service programme</b>
          </div>
        </div>
      </section>

      <section className="sec shell" aria-labelledby="work-h">
        <div className="sec__head">
          <p className="sec__idx">01 / Selected work</p>
          <div>
            <h2 className="sec__title" id="work-h">Three projects worth reading in full</h2>
            <p className="sec__note">
              Each one includes what went wrong and what is still unfinished. If a section is missing
              from a case, it is because I could not point at a document that proved it.
            </p>
          </div>
        </div>

        <div className="cases">
          {featured.map((c, i) => (
            <CaseCard key={c.slug} c={c} index={i} />
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="more-h">
        <div className="sec__head">
          <p className="sec__idx">02 / Also mine</p>
          <div>
            <h2 className="sec__title" id="more-h">Shorter entries</h2>
            <p className="sec__note">
              Real, smaller in scope, or work where I was one contributor rather than the builder.
            </p>
          </div>
        </div>

        <div className="rows">
          {rest.map((c) => (
            <Link className="row" href={`/work/${c.slug}`} key={c.slug}>
              <span className="row__k">{c.year}</span>
              <span>
                <span className="row__t">{c.name}</span>
                <span className="row__d">{c.forWhom} — {c.role}</span>
              </span>
              <span className="row__a">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="live-h">
        <div className="sec__head">
          <p className="sec__idx">03 / On the internet right now</p>
          <div>
            <h2 className="sec__title" id="live-h">Everything you can open</h2>
            <p className="sec__note">
              All {liveBuilds.length} URLs were checked and returned HTTP 200 on {profile.verifiedOn}.
            </p>
          </div>
        </div>

        <div className="rows">
          {liveBuilds.map((b) => (
            <a className="row" key={b.id} href={b.url} target="_blank" rel="noopener noreferrer">
              <span className="row__k">{b.tags[0]}</span>
              <span>
                <span className="row__t">{b.name}</span>
                <span className="row__d">{b.desc}</span>
              </span>
              <span className="row__a">Open ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="rec-h">
        <div className="sec__head">
          <p className="sec__idx">04 / Record</p>
          <div>
            <h2 className="sec__title" id="rec-h">Competitions, verified</h2>
            <p className="sec__note">
              {wins.length} results confirmed against certificates and official announcements. One more
              is still undecided and is listed as undecided.
            </p>
          </div>
        </div>

        <div className="rows">
          {competitions.map((c) => (
            <div className="row" key={c.id}>
              <span className="row__k">{c.outcomeLabel}</span>
              <span>
                <span className="row__t">{c.name}</span>
                <span className="row__d">{c.organiser} · {c.date}{c.project ? ` · ${c.project}` : ''}</span>
              </span>
              <span className={`pill${c.outcome === 'pending' ? ' pill--pending' : ''}`}>
                {c.outcome === 'pending' ? 'Undecided' : 'Confirmed'}
              </span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 'var(--s-5)' }}>
          <Link className="tlink" href="/record">Full record — roles, certificates, design work →</Link>
        </p>
      </section>

      <section className="sec shell" aria-labelledby="contact-h">
        <div className="sec__head">
          <p className="sec__idx">05 / Contact</p>
          <div>
            <h2 className="sec__title" id="contact-h">I am looking for an internship</h2>
            <p className="sec__note">
              Yogyakarta or remote. I am most useful where a real user has to be able to operate the
              thing — accessibility, data modelling, and the boring parts of shipping.
            </p>
          </div>
        </div>

        <div className="contact">
          <div className="btn-row">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>Email me</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>

          <div className="contact__lines">
            {contactChannels.map((ch) => (
              <a
                className="contact__line"
                key={ch.name}
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noopener noreferrer' : undefined}
              >
                <b>{ch.name}</b>
                <span>{ch.value} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
