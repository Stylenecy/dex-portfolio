import Image from 'next/image';
import type { Metadata } from 'next';
import {
  competitions,
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
        <p className="mono">Record</p>
        <h1 id="rec-h" style={{ fontSize: 'var(--step-4)', marginTop: 'var(--s-4)' }}>
          The paperwork
        </h1>
        <p className="hero__sub">
          Results, roles and certificates. Everything here was checked against a document on{' '}
          {profile.verifiedOn}. Where a result has not happened yet, it says so.
        </p>
      </section>

      <section className="sec shell" aria-labelledby="comp-h">
        <div className="sec__head">
          <p className="sec__idx">01 / Competitions</p>
          <h2 className="sec__title" id="comp-h">Results</h2>
        </div>
        <div className="rows">
          {competitions.map((c) => (
            <div className="row" key={c.id}>
              <span className="row__k">{c.outcomeLabel}</span>
              <span>
                <span className="row__t">{c.name}</span>
                <span className="row__d">
                  {c.organiser} · {c.date}
                  {c.project ? ` · ${c.project}` : ''}
                  {c.note ? ` — ${c.note}` : ''}
                </span>
              </span>
              <span className={`pill${c.outcome === 'pending' ? ' pill--pending' : ''}`}>
                {c.outcome === 'pending' ? 'Undecided' : 'Confirmed'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="roles-h">
        <div className="sec__head">
          <p className="sec__idx">02 / Roles</p>
          <h2 className="sec__title" id="roles-h">Where I have been responsible for something</h2>
        </div>
        <div className="rows">
          {roleRecord.map((r) => (
            <div className="row" key={r.id}>
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
          <p className="sec__idx">03 / Certificates</p>
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
          <p className="sec__idx">04 / Design</p>
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
