import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { profile, contactChannels } from '@/data/profile';
import { caseStudies } from '@/data/caseStudies';
import {
  competitions,
  alsoEntered,
  hackathonNow,
  hackathonBuilds,
  liveBuilds,
  roleRecord,
  skillGroups,
} from '@/data/record';
import { timelineEntries } from '@/data/timeline';
import Intro from '@/components/home/Intro';
import HeroScan from '@/components/home/HeroScan';
import LiveClock from '@/components/home/LiveClock';

/** Inline stagger index for the CSS reveal system (motion.css). */
const i = (n: number) => ({ ['--i' as string]: n }) as CSSProperties;

const HUD = () => (
  <>
    <span className="hud__c hud__c--tl" aria-hidden="true" />
    <span className="hud__c hud__c--tr" aria-hidden="true" />
    <span className="hud__c hud__c--bl" aria-hidden="true" />
    <span className="hud__c hud__c--br" aria-hidden="true" />
  </>
);

/** Heading split into masked lines; each line slides up on reveal. */
function Lines({ lines, accent }: { lines: string[]; accent?: string }) {
  return (
    <>
      {lines.map((l, n) => (
        <span className="ln" key={l} style={i(n)}>
          <span>
            {accent && n === lines.length - 1 ? (
              <>
                {l} <em className="serif">{accent}</em>
              </>
            ) : (
              l
            )}
          </span>
        </span>
      ))}
    </>
  );
}

/** Numbers in the status counters. Each one names its source. */
function stats() {
  const placed = competitions.length;
  return [
    { v: '59', n: 59, l: 'students led across 10 groups — KKN STEM 2026 overall chair', s: 'roleRecord kkn-chair' },
    { v: '2,029', n: 2029, l: 'pupils reached by vision screening, 7 schools', s: 'roleRecord kkn-chair, 21–27 Jul 2026' },
    { v: String(liveBuilds.length), n: liveBuilds.length, l: 'builds live on the internet right now', s: `liveBuilds — HTTP 200 on ${profile.verifiedOn}` },
    { v: String(placed), n: placed, l: 'competition results, three of them podiums', s: 'competitions — prestasi.md' },
    { v: '10', n: 10, l: 'security holes found in my own backend, and closed', s: 'caseStudies — Sowan, ten-hole self-audit' },
  ];
}

export default function HomePage() {
  const featured = caseStudies.filter((c) => c.featured);
  const rest = caseStudies.filter((c) => !c.featured);
  const shotFor = (slug: string) => liveBuilds.find((b) => b.caseSlug === slug)?.image;
  const guilds = roleRecord.filter((r) => r.current);

  return (
    <>
      <Intro />

      {/* ===== 1 · HERO — figure scanned by scroll ===================== */}
      <section className="lp-hero" id="top" aria-labelledby="hero-name">
        <HeroScan targetId="top" />
        <div className="lp-stage">
          <div className="lp-bg" aria-hidden="true" />

          <div className="lp-fig" aria-hidden="true">
            <Image
              className="lp-fig__img"
              src="/images/dex/dex-cutout.webp"
              alt=""
              width={1200}
              height={1562}
              priority
              sizes="(max-width: 1023px) 80vw, 46vw"
            />
            <span className="lp-fig__scan" />
          </div>

          <ul className="lp-calls" aria-label="Status read-out">
            <li className="lp-call" style={{ ['--at' as string]: 0.06 } as CSSProperties}>
              Class<b>Creative technologist</b>
            </li>
            <li className="lp-call" style={{ ['--at' as string]: 0.18 } as CSSProperties}>
              Guild<b>Information Systems · UKDW ’23</b>
            </li>
            <li className="lp-call" style={{ ['--at' as string]: 0.3 } as CSSProperties}>
              Base<b>Yogyakarta, Indonesia</b>
            </li>
            <li className="lp-call" style={{ ['--at' as string]: 0.42 } as CSSProperties}>
              Titles<b>Track winner · 2nd intl · 1st national</b>
            </li>
          </ul>

          <div className="shell lp-copy">
            <p className="mono lp-meta">
              <span className="lp-live">(00) Operator profile</span>
              <span>Yogyakarta, ID</span>
              <LiveClock />
            </p>
            <h1 className="lp-name" id="hero-name">
              <span className="ln"><span>Dex</span></span>
              <span className="ln"><span>Bennett</span></span>
            </h1>
            <p className="lp-sig">
              I design and build <em className="serif">{profile.signature}</em>
            </p>
            <p className="lp-role">{profile.program} · UKDW, Yogyakarta</p>
            <div className="btn-row lp-cta">
              <a className="btn btn--primary" href="#work">
                See the work <span className="btn__arrow" aria-hidden="true">↓</span>
              </a>
              <a className="btn" href="#arena">See the results</a>
            </div>
          </div>

          <div className="lp-hud" aria-hidden="true">
            <HUD />
          </div>
          <div className="lp-bar" aria-hidden="true">
            <span className="mono">Scroll to scan <span className="lp-down">↓</span></span>
            <span className="mono lp-bar__mid">07°47′ S · 110°22′ E</span>
            <span className="mono">v5 · Reforged</span>
          </div>
        </div>
      </section>

      {/* ===== 2 · STATUS WINDOW ======================================= */}
      <section className="sec shell" id="status" aria-labelledby="status-h">
        <div className="sec__head">
          <p className="sec__idx">(01) Status</p>
          <div>
            <h2 className="sec__title lines" id="status-h">
              <Lines lines={['The short version,']} accent="verified." />
            </h2>
            <p className="sec__note reveal">
              Every line below points at a document. If I could not prove it, it is not on this page.
            </p>
          </div>
        </div>

        <div className="status reveal">
          <div className="status__bar">
            <span className="mono">[ Status window ]</span>
            <span className="mono">Verified · {profile.verifiedOn}</span>
          </div>
          <dl className="status__grid">
            <div className="status__item"><dt>Name</dt><dd data-decode>Dex Bennett</dd></div>
            <div className="status__item"><dt>Alias</dt><dd data-decode>Stylenecy</dd></div>
            <div className="status__item"><dt>Class</dt><dd>Creative technologist — design, build, pitch</dd></div>
            <div className="status__item"><dt>Base</dt><dd>{profile.location}</dd></div>
            <div className="status__item status__item--wide"><dt>Guild</dt><dd>{profile.program}, UKDW</dd></div>
            <div className="status__item status__item--wide"><dt>Quest</dt><dd>Thesis — {profile.thesisTitle}</dd></div>
          </dl>
          <ul className="status__titles" aria-label="Titles">
            {competitions
              .filter((c) => c.outcome === 'won' || c.outcome === 'runner-up')
              .map((c) => (
                <li className="title-chip" key={c.id}>
                  <b>{c.rank}</b> {c.name.replace(' — KSE Juara, national level', ' — KSE, national')}
                </li>
              ))}
          </ul>
        </div>

        <ul className="counters">
          {stats().map((s, n) => (
            <li className="counter reveal" style={i(n)} key={s.l} title={`Source: ${s.s}`}>
              <span className="counter__v" data-count={s.n}>{s.v}</span>
              <span className="counter__l">{s.l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== 3 · ARENA ================================================ */}
      <section className="sec shell" id="arena" aria-labelledby="arena-h">
        <div className="sec__head">
          <p className="sec__idx">(02) Arena</p>
          <div>
            <h2 className="sec__title lines" id="arena-h">
              <Lines lines={['Where the work', 'was']} accent="judged." />
            </h2>
            <p className="sec__note reveal">
              Results exactly as announced — a track win is not rounded up to a first place, and an entry that
              did not place is listed as one.
            </p>
          </div>
        </div>

        <ol className="arena">
          {competitions.map((c, n) => (
            <li className="arena__row reveal draw" style={i(n)} key={c.id}>
              <span
                className={`arena__rank${c.outcome === 'won' || c.outcome === 'runner-up' ? ' is-win' : ''}${c.outcome === 'mention' ? ' is-low' : ''}`}
              >
                {c.rank}
              </span>
              <div>
                <h3 className="arena__name">{c.name}</h3>
                <p className="arena__meta">{c.organiser} · {c.date}</p>
                {(c.project || c.role) && (
                  <p className="arena__role">
                    {c.project && <b>{c.project}</b>}
                    {c.project && c.role ? ' — ' : ''}
                    {c.role}
                    {c.note ? `. ${c.note}` : ''}
                  </p>
                )}
              </div>
              {c.url ? (
                <a className="tlink arena__link" href={c.url} target="_blank" rel="noopener noreferrer">
                  Open {c.project ?? 'project'} ↗
                </a>
              ) : (
                <span className="row__a">{c.outcomeLabel}</span>
              )}
            </li>
          ))}
        </ol>

        <p className="mono arena__also reveal">
          Also entered, did not place —{' '}
          {alsoEntered.map((e, n) => (
            <span key={e.id}>
              {e.url ? (
                <a href={e.url} target="_blank" rel="noopener noreferrer">{e.name}</a>
              ) : (
                e.name
              )}{' '}
              ({e.date}){n < alsoEntered.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>

        <div className="now">
          <div className="now__head">
            <h3 className="reveal">Building now — {hackathonNow.event}</h3>
            <span className="pill pill--pending reveal">{hackathonNow.status}</span>
          </div>
          <div className="builds">
            {hackathonBuilds.map((b, n) => (
              <article className="build reveal" style={i(n)} key={b.id}>
                <a className="build__shot wipe" style={i(n)} href={b.url} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${b.name} live demo`}>
                  <Image src={b.image} alt={`${b.name} — live site screenshot`} width={1280} height={800} sizes="(max-width: 900px) 100vw, 40vw" />
                </a>
                <div className="build__body">
                  <h4 className="build__name">{b.name}</h4>
                  <p className="build__line">{b.line}</p>
                  <p className="build__mine">{b.mine}</p>
                  <p className="build__credit">{b.credit}</p>
                  <div className="btn-row">
                    <a className="tlink" href={b.url} target="_blank" rel="noopener noreferrer">Open the live demo ↗</a>
                    <a className="tlink" href={b.repo} target="_blank" rel="noopener noreferrer">Read the code ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4 · WORK ================================================= */}
      <section className="sec shell" id="work" aria-labelledby="work-h">
        <div className="sec__head">
          <p className="sec__idx">(03) Selected work</p>
          <div>
            <h2 className="sec__title lines" id="work-h">
              <Lines lines={['Three projects worth', 'reading']} accent="in full." />
            </h2>
            <p className="sec__note reveal">
              Each one includes what went wrong and what is still unfinished. If a section is missing from a
              case, it is because I could not point at a document that proved it.
            </p>
          </div>
        </div>

        <div className="works">
          {featured.map((c, n) => {
            const shot = shotFor(c.slug);
            return (
              <article className="work" key={c.slug}>
                {shot && (
                  <Link className="work__shot hud wipe" href={`/work/${c.slug}`} aria-label={`Read the ${c.name} case study`}>
                    <Image src={shot} alt={`${c.name} — live site screenshot`} width={1280} height={800} sizes="(max-width: 960px) 100vw, 56vw" />
                    {c.urlLabel && <span className="work__url">{c.urlLabel}</span>}
                    <HUD />
                  </Link>
                )}
                <div className="work__body">
                  <div className="work__top reveal">
                    <span className="work__num">{String(n + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
                    <span className={`pill${c.status === 'live' ? ' pill--live' : ''}`}>{c.statusLabel}</span>
                  </div>
                  <h3 className="work__title reveal">
                    <Link href={`/work/${c.slug}`}>{c.name}</Link>
                  </h3>
                  <p className="work__for reveal">{c.forWhom}</p>
                  <p className="work__sum reveal">{c.summary}</p>
                  {c.metrics.length > 0 && (
                    <div className="metrics reveal">
                      {c.metrics.slice(0, 4).map((m) => (
                        <div className="metric" key={m.label}>
                          <span className="metric__v" {...(/^\d+$/.test(m.value) ? { 'data-count': m.value } : {})}>
                            {m.value}
                          </span>
                          <span className="metric__l">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="reveal">
                    <Link className="tlink" href={`/work/${c.slug}`}>Read the {c.name} case study →</Link>
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="sub-h">
          <h3 className="reveal">Shorter entries</h3>
          <span className="mono reveal">Smaller in scope, or one contributor among several</span>
        </div>
        <div className="rows">
          {rest.map((c, n) => (
            <Link className="row reveal" style={i(n)} href={`/work/${c.slug}`} key={c.slug}>
              <span className="row__k">{c.year}</span>
              <span>
                <span className="row__t">{c.name}</span>
                <span className="row__d">{c.forWhom} — {c.role}</span>
              </span>
              <span className="row__a">Read →</span>
            </Link>
          ))}
        </div>

        <div className="sub-h">
          <h3 className="reveal">Everything you can open</h3>
          <span className="mono reveal">{liveBuilds.length} URLs · all HTTP 200 on {profile.verifiedOn}</span>
        </div>
        <ul className="lives">
          {liveBuilds.map((b, n) => (
            <li key={b.id} className="reveal" style={i(n % 4)}>
              <a className="live" href={b.url} target="_blank" rel="noopener noreferrer">
                <span className={`live__shot${b.image ? '' : ' live__shot--none'}`}>
                  {b.image ? (
                    <Image src={b.image} alt="" width={1280} height={800} sizes="(max-width: 640px) 100vw, 20rem" loading="lazy" />
                  ) : (
                    <span className="mono">{b.tags[0]}</span>
                  )}
                </span>
                <span className="live__body">
                  <span className="live__name">{b.name}<span>Open ↗</span></span>
                  <span className="live__desc">{b.desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== 5 · PATH ================================================= */}
      <section className="sec shell" id="path" aria-labelledby="path-h">
        <div className="sec__head">
          <p className="sec__idx">(04) Path</p>
          <div>
            <h2 className="sec__title lines" id="path-h">
              <Lines lines={['How it']} accent="went." />
            </h2>
          </div>
        </div>
        <div className="tl">
          {timelineEntries.map((t, n) => (
            <div className={`tl__item reveal${t.current ? ' tl__item--now' : ''}`} style={i(n % 3)} key={t.id}>
              <span className="tl__y">{t.year}</span>
              <h3 className="tl__t">{t.title}</h3>
              <p className="tl__d">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6 · GUILDS =============================================== */}
      <section className="sec shell" id="guilds" aria-labelledby="guilds-h">
        <div className="sec__head">
          <p className="sec__idx">(05) Guilds</p>
          <div>
            <h2 className="sec__title lines" id="guilds-h">
              <Lines lines={['Where I show up', 'every']} accent="week." />
            </h2>
            <p className="sec__note reveal">Current roles — work, campus, and community.</p>
          </div>
        </div>
        <div className="guilds">
          {guilds.map((g, n) => (
            <div className="panel guild hud reveal" style={i(n % 2)} key={g.id}>
              <HUD />
              <span className="guild__k">{g.kind === 'community' ? 'Community' : 'Campus & work'} · {g.period}</span>
              <h3 className="guild__t">{g.title}</h3>
              <p className="guild__o">{g.org}</p>
              {g.detail && <p className="guild__d">{g.detail}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== 7 · LOADOUT ============================================== */}
      <section className="sec shell" id="loadout" aria-labelledby="loadout-h">
        <div className="sec__head">
          <p className="sec__idx">(06) Loadout</p>
          <div>
            <h2 className="sec__title lines" id="loadout-h">
              <Lines lines={['What I actually']} accent="reach for." />
            </h2>
            <p className="sec__note reveal">
              Core is what I write comfortably myself. Shipped with is what the live projects above are built on.
              Both are true; they are not the same claim.
            </p>
          </div>
        </div>
        <div className="grid-2">
          {skillGroups.map((g, n) => (
            <div className="panel reveal" style={i(n % 2)} key={g.id}>
              <h3>{g.title}</h3>
              <ul className="tags">
                {g.items.map((it) => (
                  <li className="tag" key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 8 · SIGNAL =============================================== */}
      <section className="sec shell" id="contact" aria-labelledby="contact-h">
        <div className="signal hud reveal">
          <HUD />
          <p className="mono">(07) Signal</p>
          <h2 className="signal__t lines" id="contact-h" style={{ marginTop: 'var(--s-4)' }}>
            <Lines lines={['Let’s build something', 'people']} accent="actually use." />
          </h2>
          <p className="signal__p">
            Open to internships, collaborations and hackathon teams — Yogyakarta or remote. I am most useful
            where a real person has to be able to operate the thing.
          </p>
          <div className="btn-row">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              Email Dex <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Open LinkedIn profile ↗</a>
            <Link className="btn" href="/record">See the full record</Link>
          </div>
          <div className="contact__lines signal__lines">
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
