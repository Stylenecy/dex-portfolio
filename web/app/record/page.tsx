import type React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  competitions,
  alsoEntered,
  hackathonNow,
  hackathonBuilds,
  roleRecord,
  certificates,
  posters,
  unpublishedPrograms,
} from '@/data/record';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Record',
  description:
    'The full record: competition results, organisational roles, certificates, and graphic design work — with what is verified and what is still undecided.',
};

export default function RecordPage() {
  return (
    <>
      <section className="hero shell" aria-labelledby="rec-h">
        <p className="mono">(Record) — the dashboard layer</p>
        <h1 id="rec-h" className="lines" style={{ fontSize: 'var(--step-5)', marginTop: 'var(--s-4)' }}>
          <span className="ln"><span>The</span></span>
          <span className="ln"><span><em className="serif" style={{ color: 'var(--sys)' }}>paperwork.</em></span></span>
        </h1>
        <p className="hero__sub">
          Results, roles and certificates. Everything here was checked against a document on{' '}
          {profile.verifiedOn}. Where a result has not happened yet, it says so.
        </p>
      </section>

      <section className="sec shell" aria-labelledby="comp-h">
        <div className="sec__head">
          <p className="sec__idx">(01) Competitions</p>
          <h2 className="sec__title" id="comp-h">Results</h2>
        </div>
        <div className="rows">
          {competitions.map((c, n) => (
            <div className="row reveal draw" style={{ ['--i' as string]: n } as React.CSSProperties} key={c.id} title={`Source: ${c.source}`}>
              <span className="row__k">{c.outcomeLabel}</span>
              <span>
                <span className="row__t">{c.name}</span>
                <span className="row__d">
                  {c.organiser} · {c.date}
                  {c.project ? ` · ${c.project}` : ''}
                  {c.role ? ` — ${c.role}` : ''}
                  {c.note ? `. ${c.note}` : ''}
                </span>
              </span>
              {c.url ? (
                <a className="row__a tlink" href={c.url} target="_blank" rel="noopener noreferrer">Open ↗</a>
              ) : (
                <span className="pill">Confirmed</span>
              )}
            </div>
          ))}
        </div>

        <h3 className="mono" style={{ margin: 'var(--s-7) 0 var(--s-3)' }}>Entered, did not place</h3>
        <div className="rows">
          {alsoEntered.map((e) => (
            <div className="row reveal" key={e.id} title={`Source: ${e.source}`}>
              <span className="row__k">{e.date}</span>
              <span>
                <span className="row__t">{e.name}</span>
                <span className="row__d">{e.what}</span>
              </span>
              {e.url ? (
                <a className="row__a tlink" href={e.url} target="_blank" rel="noopener noreferrer">Read ↗</a>
              ) : (
                <span className="row__a">Submitted</span>
              )}
            </div>
          ))}
        </div>

        <h3 className="mono" style={{ margin: 'var(--s-7) 0 var(--s-3)' }}>
          Building now — {hackathonNow.event}
        </h3>
        <div className="rows">
          {hackathonBuilds.map((b) => (
            <div className="row reveal" key={b.id} title={`Source: ${b.source}`}>
              <span className="row__k">Oct 2026</span>
              <span>
                <span className="row__t">{b.name}</span>
                <span className="row__d">{b.line} {b.credit}</span>
              </span>
              <span className="pill pill--pending">Results pending</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="roles-h">
        <div className="sec__head">
          <p className="sec__idx">(02) Roles</p>
          <h2 className="sec__title" id="roles-h">Where I have been responsible for something</h2>
        </div>
        <div className="rows">
          {roleRecord.map((r) => (
            <div className="row reveal" key={r.id} title={`Source: ${r.source}`}>
              <span className="row__k">{r.period}</span>
              <span>
                <span className="row__t">{r.title}</span>
                <span className="row__d">
                  {r.org}
                  {r.detail ? ` — ${r.detail}` : ''}
                </span>
              </span>
              {r.current ? <span className="pill pill--live">Active</span> : <span className="row__a">Done</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="cert-h">
        <div className="sec__head">
          <p className="sec__idx">(03) Certificates</p>
          <div>
            <h2 className="sec__title" id="cert-h">Scans</h2>
            <p className="sec__note">
              Only the {certificates.length} certificates whose scan actually ships with this site are
              shown. Certificates for {unpublishedPrograms.length} further programmes exist on file and
              are available on request.
            </p>
          </div>
        </div>
        <ul className="grid-3">
          {certificates.map((c) => (
            <li key={c.id}>
              <div className="thumb reveal">
                <div className="thumb__box">
                  <Image
                    src={c.image}
                    alt={`Certificate: ${c.name}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 13rem"
                    loading="lazy"
                  />
                </div>
                <p className="thumb__cap">
                  {c.name}
                  <span>{c.context}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mono" style={{ marginTop: 'var(--s-5)' }}>
          Also attended: {unpublishedPrograms.join(' · ')}
        </p>
      </section>

      <section className="sec shell" aria-labelledby="poster-h">
        <div className="sec__head">
          <p className="sec__idx">(04) Design</p>
          <div>
            <h2 className="sec__title" id="poster-h">Graphic work</h2>
            <p className="sec__note">
              Posters, banners and event graphics for student organisations and a church youth ministry.
              Photographs of people were removed from this gallery: this is a public page and those
              faces are not mine to publish.
            </p>
          </div>
        </div>
        <ul className="grid-3">
          {posters.map((p) => (
            <li key={p.src}>
              <div className="thumb thumb--poster reveal">
                <div className="thumb__box">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 50vw, 13rem" loading="lazy" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
