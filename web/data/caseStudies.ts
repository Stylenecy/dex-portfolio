/**
 * CASE STUDIES — the long-form record.
 *
 * RULE FOR ANY FUTURE EDITOR (human or AI):
 * every number and every claim in this file traces to a file on disk, listed in
 * `sources`. If you cannot point at the source, do not write the sentence.
 * Claims that were deliberately left out (and why) are logged in
 * `.agent/changelogs/SESSION_CHANGELOG_2026-08-02.md`.
 */

export type CaseAccent = 'cyan' | 'amber' | 'violet' | 'green';
export type CaseStatus = 'live' | 'shipped' | 'building' | 'concept';

export interface CaseMetric {
  value: string;
  label: string;
  note?: string;
}

export interface CaseDecision {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** One line, plain language: who this was built for. */
  forWhom: string;
  year: string;
  role: string;
  status: CaseStatus;
  statusLabel: string;
  accent: CaseAccent;
  /** Shown on the home page. Two sentences maximum. */
  summary: string;
  url?: string;
  urlLabel?: string;
  stack: string[];
  metrics: CaseMetric[];
  problem: string[];
  decisions: CaseDecision[];
  result: string[];
  /** What is not done, or not true yet. Never delete this section. */
  honest: string[];
  sources: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'leap-2036',
    name: 'LEAP 2036',
    forWhom: 'High-school students in a three-day workshop',
    year: '2026',
    role: 'Designed and built it · workshop facilitator',
    status: 'live',
    statusLabel: 'Live — used in the field 3–5 Aug 2026',
    accent: 'cyan',
    featured: true,
    summary:
      'A decision game that compresses ten years of adult life into forty-five minutes, built for students on their own phones with bad school wifi. Then I audited it and found I had left their data readable by anyone.',
    url: 'https://leap-2036.vercel.app',
    urlLabel: 'leap-2036.vercel.app',
    stack: ['Vanilla JS', 'PWA / Service Worker', 'Supabase Postgres', 'Row Level Security', 'Vercel Functions'],
    metrics: [
      { value: '12', label: 'decision rounds', note: '2026 → 2036' },
      { value: '7', label: 'endings', note: 'no winning one' },
      { value: '0', label: 'external dependencies', note: 'no CDN, no fonts, no npm' },
      { value: '8 / 8', label: 'engine parity tests pass', note: 'scoring cannot drift' },
    ],
    problem: [
      'I was the overall chair of a 59-student community service programme run with Hong Kong Polytechnic University, and my group had to run one workshop session per class across two high schools. Every class was met exactly once. There was no second chance and no dress rehearsal.',
      'The workshop had to make a teenager feel the weight of a ten-year decision — money, energy, mental health — in a single school period. A slideshow cannot do that. A game can.',
      'Three constraints made this harder than a normal web app. School wifi could not be trusted, so it had to run offline. It ran on the students\' own phones, so it had to install like an app and survive a dead connection mid-session. And it involved minors, so it could not collect names.',
    ],
    decisions: [
      {
        title: 'The scoring engine never touches the DOM',
        body:
          'All scoring lives in one pure module: resource deltas, a hard clamp between 0 and 200, the phase-one total captured at the seam, and a classifier that resolves one of seven 2036 profiles from invariants, votes and tie-breakers. Nothing about the display can change a score. That meant I could redesign the entire interface for the workshop without risking the numbers.',
      },
      {
        title: 'A parity test suite guards the maths',
        body:
          'Eight cases — invariants, votes, the phase-two bet payoff, running clamps, chaos-card seams, and full A/B sweeps — are checked against the original reference implementation. I ran it before and after every change to the visual layer. If a redesign ever silently altered an outcome, the suite fails instead of a student getting the wrong ending.',
      },
      {
        title: 'Zero dependencies, so it survives the worst room',
        body:
          'No CDN, no web fonts, no npm packages, system fonts only. The consequence is that the game opens straight from a file on a USB stick with no server and no internet. Installed as a PWA, the whole shell is cached and plays fully offline. The facilitator dashboard and the live data calls are deliberately excluded from that cache so the classroom board never shows stale numbers.',
      },
      {
        title: 'Codes, never names',
        body:
          'Each student gets a printed pseudonymous code. What is stored is the code, the three scores, the profile, and the values/DISC/goal answers — nothing that identifies a child. If the network drops mid-session the run is queued in local storage and retried on reconnect, so a bad signal costs nobody their result.',
      },
      {
        title: 'The security audit — and what it found',
        body:
          'I ran a self-audit on my own live system before the workshop. Anyone holding the public key could read every participant row straight from the REST endpoint. I confirmed it with a single request: HTTP 200, real rows, without ever opening the dashboard. The dashboard\'s password was a plain string sitting in the page source and was never protecting anything — the actual read policy underneath was open to anyone.',
      },
      {
        title: 'How I closed it',
        body:
          'I dropped the open read policy so the public key can now only insert, never read back. All reads moved behind a serverless function that holds the privileged key server-side and compares the password with a timing-safe check. I added database CHECK constraints so impossible values are rejected at the last layer regardless of which path they arrive through. Then I re-verified in production: reading anonymously returns an empty set, all three constraints reject bad data, a legitimate game submission still succeeds, and the old password is refused by the server.',
      },
    ],
    result: [
      'Used for the workshop on 3–5 August 2026 across two high schools, with 210 pre-printed pseudonymous codes for my group\'s five classes.',
      'The hole was found by me, on my own project, before anyone else was affected — and closed, applied to production, and re-verified rather than written down as a to-do.',
      'The offline path is not theoretical: the same folder plays from a USB stick with no network at all.',
    ],
    honest: [
      'The engine is deterministic and tested; the classroom outcome is not something software can measure. Whether a student actually felt anything is not a number I have.',
      'I only know the security hole existed for as long as the open policy did. I cannot prove nobody read the data before I closed it.',
    ],
    sources: [
      'leap-2036/AUDIT_HANDOFF_REPORT.md §8 — security fix, discovery, fix, and production re-verification',
      'leap-2036/README.md — dependency and privacy claims',
      'leap-2036/migration_2026-07-31_security_fix.sql — the applied migration',
      'Semester 6/7. KKN/PROJECT_MASTER.md — chair role, 59 students, workshop schedule',
      'Semester 6/7. KKN/docs/workshop/ — class schedule, code cards (v2, 210 codes)',
    ],
  },

  {
    slug: 'space-youth-gkkk',
    name: 'Space Youth GKKK',
    forWhom: 'Volunteers running a church youth ministry',
    year: '2026',
    role: 'Designed and built it',
    status: 'live',
    statusLabel: 'Live — running in demo data',
    accent: 'amber',
    featured: true,
    summary:
      'A weekly bulletin that happens to be an admin system, for volunteers who were coordinating a ministry through spreadsheets and group chats. The measurable part of this project is accessibility: the old palette failed WCAG on every line of body text.',
    url: 'https://youth-gkkk-ms.vercel.app',
    urlLabel: 'youth-gkkk-ms.vercel.app',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Supabase', 'ISR on Vercel'],
    metrics: [
      { value: '0', label: 'text elements failing WCAG AA', note: '100 audited in production' },
      { value: '4.56:1', label: 'worst contrast ratio', note: 'was 2.20:1' },
      { value: '134 KB', label: 'font payload', note: 'down from 262 KB' },
      { value: '0', label: 'third-party requests', note: 'was 3' },
    ],
    problem: [
      'A youth ministry runs on rhythm: a midweek meeting, two Saturday services, small groups. The coordination for all of it lived in spreadsheets, chat threads and documents that nobody could find six months later. Who is serving this week, what was decided in the last meeting, where the money went.',
      'The first version I inherited was a generic SaaS landing page wearing cream colours. It described a product. What the people actually needed was to see this week.',
      'And the volunteers are volunteers. If the tool is not pleasant, it goes unused and everything goes back to the group chat.',
    ],
    decisions: [
      {
        title: 'Design the bulletin, not the dashboard',
        body:
          'The front page headline is this week\'s service theme, not the name of the product. The people serving are listed by name and role, because being named is the point of a stewardship roster — not decorative initial circles. A "rhythm of the week" section carries the structure. One dark section gives the page weight so it does not read as an endless scroll of cards.',
      },
      {
        title: 'Fix the contrast before anything else',
        body:
          'The palette I started from failed WCAG AA outright. The muted ink used for all body copy measured 3.57:1 and the caption tone measured 2.20:1 against the paper background. Every foreground token was retuned to clear 4.5:1 against both paper tones. The result was then audited in production rather than asserted: 100 text elements checked, zero failures, worst ratio 4.56:1.',
      },
      {
        title: 'Three bugs that made the app unusable, not just imperfect',
        body:
          'Nine of ten routes returned HTTP 500 whenever the database environment was empty, because middleware asserted non-null on an undefined value on every single request. All dates rendered in the server timezone, so a Saturday evening service could display as Sunday to a user in Jakarta. And the dashboard sidebar was desktop-only, which meant a phone user had no way to move between modules at all. All three are fixed; dates are now pinned to Asia/Jakarta in one place.',
      },
      {
        title: 'Always render something',
        body:
          'The data layer runs dual-mode: real database when configured, seed data otherwise. The site is never a blank error screen. The front page is served from cache with hourly revalidation, so it is fast but "this Saturday" is never more than an hour stale.',
      },
      {
        title: 'Deliberately not shown',
        body:
          'Member detail pages do not display phone numbers, because any signed-in user can open them and those numbers belong to the members, not to the app. The dashboard and login routes are excluded from search engines. Chat exports, member spreadsheets and personal notes are excluded from the deployment entirely.',
      },
    ],
    result: [
      'Ten of ten routes verified returning HTTP 200 in production on 1 August 2026.',
      'Front page around 300 KB across 13 requests, with fonts self-hosted and no third-party connections at all.',
      'Accessibility verified by measurement in production, not by claim: skip link, global focus-visible, touch targets of at least 44px, associated labels, clean reflow at 320px, reduced-motion and contrast preferences respected.',
    ],
    honest: [
      'The live site is running on seed data. The database is not connected yet — that step needs account access I do not have.',
      'Forms can add records but cannot yet edit or delete them.',
      'There are no automated tests. Verification so far has been computed styles and programmatic audits, not screenshots and not a test suite.',
      'One decision is still open and is not mine to make: once real data is connected, the public front page would show members\' real names. That is normal for a bulletin, but it is the ministry\'s call.',
    ],
    sources: [
      'Youth-GKKK_MS/PROJECT_MASTER.md — deploy log, accessibility audit numbers, performance table, bug list, open decisions',
    ],
  },

  {
    slug: 'sowan',
    name: 'Sowan',
    forWhom: 'Elderly Indonesians with knowledge and no route to income',
    year: '2025 — present',
    role: 'Platform builder (CTO in the team) · thesis build author',
    status: 'live',
    statusLabel: 'Live demo · thesis build in progress',
    accent: 'violet',
    featured: true,
    summary:
      'A marketplace where elderly people are the paid experts, not the beneficiaries. It won a national business plan competition, and the backend I later wrote for the thesis version assumes I will make mistakes.',
    url: 'https://sowan-app.vercel.app',
    urlLabel: 'sowan-app.vercel.app',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'PostgreSQL', 'Supabase RLS', 'Postgres RPC'],
    metrics: [
      { value: '1st', label: 'place, national business plan competition', note: 'KSE Juara 2026, announced 2 May' },
      { value: '8', label: 'server functions hold every write', note: 'the browser holds none' },
      { value: '10', label: 'security holes found and closed', note: 'before the backend ever ran' },
      { value: '30 / 70', label: 'platform / mentor revenue split', note: 'computed server-side' },
    ],
    problem: [
      'An older Indonesian may hold a regional language, a craft, or three decades of professional judgement — and no way to turn any of it into income. The usual framing puts elderly people on the receiving end of a programme. This one puts them on the earning end.',
      'That inverts the design problem. If the expert is 65, the interface is the barrier, not the subject matter. Small text, dense navigation and low-contrast greys are the reason the person cannot work, not their age.',
      'And the moment money enters a marketplace, the browser stops being a place you can trust with anything.',
    ],
    decisions: [
      {
        title: 'Accessibility as a hard constraint, not a nice-to-have',
        body:
          'The design rules were fixed before layout: minimum 18px text, touch targets of at least 56px, contrast of at least 4.5:1, and navigation that never needs more than one click to reach the next step. These are constraints the rest of the design has to fit around.',
      },
      {
        title: 'The browser is given no write permission at all',
        body:
          'In the thesis build, the client has no insert, update or delete grant on any table — not blocked by policy, revoked at the grant level. The only way to write anything is through eight server-side functions. Reads are limited by row-level security: the mentor catalogue and reviews are public, bookings, transactions and balances are yours only.',
      },
      {
        title: 'Price is read from the database, never from the request',
        body:
          'When a booking is created, the function reads the price and tier from the mentors table itself. It checks that a slot remains, that you are not booking yourself, that the time does not collide, and that you do not already hold five active sessions. It takes a per-mentor lock so two people cannot take the same slot in the same instant. The 30/70 split and the mentor balance are computed by database trigger, not by anything the browser can influence.',
      },
      {
        title: 'The privileged key is never created',
        body:
          'This build deliberately has no all-access database key anywhere — not in the environment, not on the host, not in the repository. A key that does not exist cannot be committed by accident. That decision came directly from what I found in my own workshop project a month earlier.',
      },
      {
        title: 'Ten real holes, found by auditing my own schema',
        body:
          'The audit was against my own earlier code, and it was not a clean bill of health. The purchase amount was being sent from the browser, so a session priced at Rp350,000 could be paid at Rp1. Learners could update transaction rows, so cycling a payment from released to held and back minted mentor balance on every loop. Payouts were never checked against the available balance. The profile table was readable by anyone, which would have exposed the real name of every research participant, elderly mentors included. Account role was taken from signup metadata, so anyone could register as a mentor. And a permissions gap meant every booking would have failed silently in the first place — the likely reason the backend appeared never to work.',
      },
      {
        title: 'Write the rules twice on purpose',
        body:
          'The same rule exists in the browser for a fast, kind error message and in the database for safety. The browser copy is treated as untrusted by design. When they disagree, the database wins.',
      },
    ],
    result: [
      '1st place — Business Plan Competition, KSE Juara national level 2026 (Karya Salemba Empat, Universitas Sumatera Utara), announced 2 May 2026 in Medan.',
      'Top 15 semifinalist — Business Plan Competition EURECA 2026, Universitas Prasetiya Mulya.',
      'Top 10 finalist — Solve-It Challenge 2026, UKRIDA, final round 13 June 2026.',
      'The demo build is public and runs in five languages.',
    ],
    honest: [
      'Escrow is simulated. There is no payment gateway and no real money moves — that boundary is set by the thesis scope, and I am not going to blur it.',
      'The thesis backend is written and reviewed but not yet running: its database project has not been created, so none of it has served a real request.',
      'Session times are still text labels rather than real timestamps, so collision checking only holds within a single day. That is logged as phase-two work, not hidden.',
      'Payout state is advanced manually. There is no admin panel, because there is exactly one operator.',
      'The competition results belong to a team of three. I built the platform; the business case was not mine alone.',
    ],
    sources: [
      'Semester 7/Tugas Akhir/sowan-skripsi/BACKEND.md — architecture, the eight functions, the ten-hole audit, the stated limits',
      'All of SOWAN Business Plan/Informasi-Biro/Draft-Artikel-Prestasi-Dex_16Jun.md — competition results with certificate numbers',
      'All of SOWAN Business Plan/Competition-KSE/Info-Detail_KSE.txt — organiser and competition scope',
      'All of SOWAN Business Plan/Competition-PNB/PROJECT_MASTER.md §5 — gerontechnology design rules, 30/70 split',
      'All of SOWAN Business Plan/PETA-SOWAN_1-Ags-2026.md — which build is which',
    ],
  },

  {
    slug: 'vr-inclusive-tourism',
    name: 'VR Inclusive Tourism',
    forWhom: 'People with disabilities, excluded from tourism',
    year: '2025 – 2026',
    role: 'Research assistant — 3D assets, scene setup, field deployment',
    status: 'shipped',
    statusLabel: 'Completed — Jun 2025 to Feb 2026',
    accent: 'green',
    summary:
      'A beach you can visit regardless of whether your body can get you there. My part was the 3D work and, more usefully, sitting with people while they tried a headset for the first time.',
    stack: ['Unity', '3D modelling', 'VR', 'Field research'],
    metrics: [
      { value: '8 mo', label: 'research assistantship', note: 'to the head of Information Systems' },
    ],
    problem: [
      'Tourism assumes a body that travels. A beach is one of the most common things an Indonesian family does together and one of the least accessible if you cannot make the trip.',
    ],
    decisions: [
      {
        title: 'Build the place, then go where the people are',
        body:
          'I contributed the 3D asset modelling and scene setup. The part that mattered more was field deployment: teaching community members with disabilities to use the headset in person, rather than assuming a first-time VR user will work it out from a menu.',
      },
    ],
    result: [
      'Completed as part of a research assistantship to the head of the Information Systems programme at UKDW, June 2025 to February 2026.',
    ],
    honest: [
      'I was one contributor on a research project, not its lead. The scope of my work was assets, scenes and field sessions.',
      'I do not have published outcome measures for this project, so I am not claiming any.',
    ],
    sources: ['dex-portfolio/web/data/timeline.ts and roles.ts — role and dates as previously recorded'],
  },

  {
    slug: 'emitra',
    name: 'Emitra',
    forWhom: 'Small exporters facing EU carbon border rules',
    year: '2026',
    role: 'Technical lead — architecture, prototype',
    status: 'live',
    statusLabel: 'Top 15 semifinalist — final round 20 Aug 2026',
    accent: 'cyan',
    summary:
      'Carbon border compliance is a paperwork wall that large exporters can pay to climb and small ones cannot. A prototype and a business case, currently through to the final of an international competition.',
    url: 'https://emitra-app.vercel.app',
    urlLabel: 'emitra-app.vercel.app',
    stack: ['React', 'TypeScript', 'Vite', 'Vercel'],
    metrics: [
      { value: 'Top 15', label: 'of the international field', note: 'announced 24 Jul 2026' },
    ],
    problem: [
      'European carbon border rules require importers to document the emissions embedded in what they buy. A large exporter hires a consultancy. A small producer has no such option, and the compliance cost quietly becomes an export ban.',
    ],
    decisions: [
      {
        title: 'A prototype, because a slide deck is not a claim',
        body:
          'The submission is backed by a deployed frontend rather than mockups. In a business plan competition judged partly on demonstration, having something a judge can open is the difference between describing a product and showing one.',
      },
    ],
    result: [
      'Confirmed Top 15 semifinalist in the BMC #12 international business plan competition, announced 24 July 2026.',
    ],
    honest: [
      'The final round is on 20 August 2026. It has not happened. There is no result to report beyond reaching the last fifteen.',
      'This is a competition prototype, not a production compliance tool. It has not processed a real shipment.',
    ],
    sources: [
      'All of Project/Competition-PNB/PROJECT_MASTER.md §12 — Top 15 confirmation 24 Jul 2026, final round 20 Aug 2026',
    ],
  },

  {
    slug: 'peran-gendis',
    name: 'Peran Gendis',
    forWhom: 'A women\'s community programme run with SriKandi UGM',
    year: '2026',
    role: 'Design and IT team',
    status: 'live',
    statusLabel: 'Live',
    accent: 'amber',
    summary:
      'A public site with a real database behind it for a community organisation — the kind of work where the interesting problem is that a volunteer has to be able to update it next year without me.',
    url: 'https://perangendis-web.vercel.app',
    urlLabel: 'perangendis-web.vercel.app',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    metrics: [],
    problem: [
      'Community organisations get a website built for them once, by someone who then graduates. What survives is whatever the next volunteer can operate.',
    ],
    decisions: [
      {
        title: 'Real submissions, real database',
        body:
          'Forms write to a production database rather than sending email into a void, so the organisation owns its own records.',
      },
    ],
    result: ['Deployed and publicly reachable.'],
    honest: [
      'I am on the design and IT team, not the sole builder, and a redesign of this site is currently mid-flight and not yet reviewed by the organisation. I am describing what is live, not what is in progress.',
    ],
    sources: ['Verified live 2 Aug 2026 (HTTP 200). Role per dex-portfolio/web/data/roles.ts.'],
  },
];

export const featuredCases = caseStudies.filter((c) => c.featured);

export function getCase(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
