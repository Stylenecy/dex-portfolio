import Image from 'next/image';
import Link from 'next/link';
import { pageMeta } from '@/data/seo';
import { profile, contactChannels } from '@/data/profile';
import { timelineEntries } from '@/data/timeline';
import { skillGroups, roleRecord } from '@/data/record';

export const metadata = pageMeta({
  title: 'About',
  description:
    'Dex Bennett — Information Systems student at UKDW Yogyakarta. What I work on, what I am good at, and the roles behind it.',
  path: '/about',
});

export default function AboutPage() {
  const current = roleRecord.filter((r) => r.current);

  return (
    <>
      <section className="hero shell" aria-labelledby="about-h">
        <p className="mono">(About) — Dex Bennett / Stylenecy</p>
        <h1 id="about-h" className="lines" style={{ fontSize: 'var(--step-5)', marginTop: 'var(--s-4)' }}>
          <span className="ln"><span>I build the</span></span>
          <span className="ln"><span><em className="serif" style={{ color: 'var(--sys)' }}>unglamorous half.</em></span></span>
        </h1>

        <div className="about-top" style={{ marginTop: 'var(--s-7)' }}>
          <div className="portrait">
            <Image
              src="/images/dex/dex-cutout-720.webp"
              alt="Dex Bennett in a black blazer and black T-shirt"
              fill
              sizes="(max-width: 820px) 90vw, 17rem"
              priority
            />
          </div>

          <div className="prose">
            <p>
              I am an Information Systems student at Universitas Kristen Duta Wacana in Yogyakarta,
              in my seventh semester, writing my thesis on Sowan.id. I did not choose the programme out of passion — I chose it
              out of necessity, and then found something in it worth being stubborn about.
            </p>
            <p>
              The pattern in my work was not planned. It showed up on its own. A marketplace where
              elderly people are the paid experts. A bulletin system for church volunteers who were
              coordinating a ministry through group chats. A decision game for high-school students on
              school wifi that does not work. A VR beach for people who cannot make the trip. In every
              one of them, the interesting problem was not the feature list — it was whether the person
              at the other end could actually operate the thing.
            </p>
            <p>
              That makes accessibility and data safety the parts I care about most, and the parts I can
              actually show evidence for. When I redesigned the church system, I measured the contrast
              of every text element in production instead of claiming it was accessible. When I audited
              my own workshop game, I found that I had left participant data readable by anyone holding
              a public key — and the honest version of that story is on this site, because leaving it
              out would make the rest of it less believable.
            </p>
            <p>
              This summer I chaired a 59-student international service programme with Hong Kong
              Polytechnic University, which is mostly an exercise in the thing nobody teaches: getting a
              large group of tired people to the right room at the right time. The same year I presented
              in competition finals more than once, mostly online and in English — a track win at the
              Mantle Turing Test Hackathon, 2nd place at the BMC #12 international final, 1st at a
              national business plan competition.
            </p>
          </div>
        </div>
      </section>

      <section className="sec shell" aria-labelledby="now-h">
        <div className="sec__head">
          <p className="sec__idx">(01) Right now</p>
          <h2 className="sec__title" id="now-h">What I am in the middle of</h2>
        </div>
        <div className="rows">
          {current.map((r) => (
            <div className="row" key={r.id}>
              <span className="row__k">{r.period}</span>
              <span>
                <span className="row__t">{r.title}</span>
                <span className="row__d">
                  {r.org}
                  {r.detail ? ` — ${r.detail}` : ''}
                </span>
              </span>
              <span className="pill pill--live">Active</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="path-h">
        <div className="sec__head">
          <p className="sec__idx">(02) How it went</p>
          <h2 className="sec__title" id="path-h">The short version</h2>
        </div>
        <div className="tl">
          {timelineEntries.map((t) => (
            <div className={`tl__item reveal${t.current ? ' tl__item--now' : ''}`} key={t.id}>
              <span className="tl__y">{t.year}</span>
              <h3 className="tl__t">{t.title}</h3>
              <p className="tl__d">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="skills-h">
        <div className="sec__head">
          <p className="sec__idx">(03) Loadout</p>
          <div>
            <h2 className="sec__title" id="skills-h">What I actually reach for</h2>
            <p className="sec__note">
              Core is what I write comfortably myself. Shipped with is what my live projects are built on.
            </p>
          </div>
        </div>
        <div className="grid-2">
          {skillGroups.map((g) => (
            <div className="panel reveal" key={g.id}>
              <h3>{g.title}</h3>
              <ul className="tags">
                {g.items.map((i) => (
                  <li className="tag" key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="sec shell" aria-labelledby="reach-h">
        <div className="sec__head">
          <p className="sec__idx">(04) Signal</p>
          <h2 className="sec__title" id="reach-h">Open to internships</h2>
        </div>
        <div className="contact">
          <p className="measure">
            {profile.affiliation}. {profile.program}. Based in {profile.location}.
          </p>
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
          <p>
            <Link className="tlink" href="/record">See the full record →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
