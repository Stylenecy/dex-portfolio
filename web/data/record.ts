/**
 * RECORD — competitions, roles, other live builds, and the certificate archive.
 * Same rule as caseStudies.ts: if there is no source on disk, it does not go here.
 */

export type CompetitionOutcome = 'won' | 'runner-up' | 'finalist' | 'semifinalist' | 'mention' | 'pending';

export interface Competition {
  id: string;
  name: string;
  organiser: string;
  outcome: CompetitionOutcome;
  outcomeLabel: string;
  /** Short badge for the arena ladder on the home page. */
  rank: string;
  date: string;
  project?: string;
  /** What Dex did on the team. Plain, no inflation. */
  role?: string;
  url?: string;
  note?: string;
  certImage?: string;
  source: string;
}

/** Ordered by weight, not by date. Results exactly as recorded — nothing rounded up. */
export const competitions: Competition[] = [
  {
    id: 'mantle-2026',
    name: 'Mantle Turing Test Hackathon',
    organiser: 'Mantle — international, online',
    outcome: 'won',
    outcomeLabel: 'Track winner — Consumer & Viral DApps',
    rank: 'Track winner',
    date: 'Announced 10 Jul 2026',
    project: 'Cult of the Digital Oracle',
    role: 'UI assets, GitBook docs and the six-minute pitch, on a team of three',
    url: 'https://cult-oracle.vercel.app',
    note: 'One of six track winners.',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #4; Dex-Brain/PAPAN.md — Selesai',
  },
  {
    id: 'bmc-12',
    name: 'BMC #12 International Business Plan Competition',
    organiser: 'Politeknik Negeri Bali',
    outcome: 'runner-up',
    outcomeLabel: '2nd place — 1st runner-up',
    rank: '2nd',
    date: 'Announced 21 Aug 2026',
    project: 'Emitra',
    role: 'Co-presenter in the live English final — team MAKOSAN',
    url: 'https://emitra-app.vercel.app',
    note: 'One of 15 international finalist teams; three prizes awarded.',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #5; Dex-Brain/20-PROJEK/bmc-emitra.md',
  },
  {
    id: 'kse-2026',
    name: 'Business Plan Competition — KSE Juara, national level',
    organiser: 'Karya Salemba Empat × Universitas Sumatera Utara',
    outcome: 'won',
    outcomeLabel: '1st place',
    rank: '1st',
    date: 'Announced 2 May 2026',
    project: 'Sowan',
    role: 'Built the platform — team MAKOSAN',
    note: 'Certificate on file.',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #1',
  },
  {
    id: 'ukrida-2026',
    name: 'Solve-It Challenge 2026',
    organiser: 'Universitas Kristen Krida Wacana (UKRIDA)',
    outcome: 'finalist',
    outcomeLabel: 'Top 10 finalist',
    rank: 'Top 10',
    date: 'Final round 13 Jun 2026',
    project: 'Sowan',
    role: 'Team MAKOSAN',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #3',
  },
  {
    id: 'eureca-2026',
    name: 'Business Plan Competition EURECA 2026',
    organiser: 'Universitas Prasetiya Mulya, Tangerang',
    outcome: 'semifinalist',
    outcomeLabel: 'Top 15 semifinalist',
    rank: 'Top 15',
    date: 'Apr 2026',
    project: 'Sowan',
    certImage: '/images/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).webp',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #2; certificate scan in this repo',
  },
  {
    id: 'victus-valorant',
    name: 'Victus Campus Heroes — Valorant, Yogyakarta',
    organiser: 'HP Indonesia × Universitas Atma Jaya Yogyakarta',
    outcome: 'mention',
    outcomeLabel: 'Honourable mention (Juara Harapan III)',
    rank: 'Harapan III',
    date: 'Nov 2023',
    note: 'Certificate on file.',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #9',
  },
];

export interface EnteredEntry {
  id: string;
  name: string;
  date: string;
  what: string;
  url?: string;
  source: string;
}

/** Entered and submitted, did not place. Listed because the work is real. */
export const alsoEntered: EnteredEntry[] = [
  {
    id: 'mantle-research',
    name: 'Mantle Research Challenge',
    date: 'Jul 2026',
    what: 'Essay — "The Distribution Paradox", published on the BCC UKDW blog',
    url: 'https://blog.bccukdw.xyz/the-distribution-paradox',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #6',
  },
  {
    id: 'hack-a-agent',
    name: 'Hack-A-Agent Hackathon',
    date: 'Jul 2026',
    what: 'Solo entry — Sowan: Almanac',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #6 (Hack-A-Agent)',
  },
  {
    id: '0g-apac',
    name: '0G APAC Hackathon 2026',
    date: 'May 2026',
    what: 'Team of three — I wrote the documentation',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #7',
  },
  {
    id: 'gmtf',
    name: 'Gadjah Mada Tourism Fair 2026',
    date: 'Apr 2026',
    what: 'Two-person team, organised by UGM',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kompetisi #8',
  },
];

export interface HackathonBuild {
  id: string;
  name: string;
  line: string;
  /** Whose work this stands on. Written as it is, never omitted. */
  credit: string;
  mine: string;
  url: string;
  repo: string;
  image: string;
  tags: string[];
  source: string;
}

/**
 * Building right now — Indonesia Web3 Hackathon 2026 (BNB Chain), October 2026.
 * No result exists yet. Do not label these as winners, finalists or even
 * "submitted" until the Brain records it with proof.
 */
export const hackathonNow = {
  event: 'Indonesia Web3 Hackathon 2026 — BNB Chain',
  status: 'Built Oct 2026 · results pending',
  source: 'Dex-Brain/PAPAN.md — Aktif #1 DRIFT, Aktif #3 Cermin Saku (6 Oct 2026)',
};

export const hackathonBuilds: HackathonBuild[] = [
  {
    id: 'drift',
    name: 'DRIFT',
    line: 'Risk rules for a trading bot that anyone can check on-chain — the bot cannot overrule the guard.',
    credit: 'My fork of a BCC UKDW seed project; the upstream core was written by others.',
    mine: 'Solo entry: my own guard contract on BNB Smart Chain Testnet, a rebuilt web front end, and the demo.',
    url: 'https://drift-macroguard.vercel.app',
    repo: 'https://github.com/Stylenecy/seed-bnb/tree/dex/drift',
    image: '/images/work/drift.webp',
    tags: ['Solidity', 'BSC Testnet', 'Next.js'],
    source: 'Dex-Brain/20-PROJEK/drift-bnb-2026.md (lines 20–29); Dex-Brain/PAPAN.md Aktif #1',
  },
  {
    id: 'cermin-saku',
    name: 'Cermin Saku',
    line: 'A scheduled allowance paid from a BNB vault — and refused by the contract when the position is not safe.',
    credit: 'Builds on Cermin by Kiel (MIT licence, 1st place at the Mezo Hackathon).',
    mine: 'New in Cermin Saku: the scheduled allowance with two on-chain safety gates, and a Rupiah-first interface.',
    url: 'https://cermin-saku.vercel.app',
    repo: 'https://github.com/Stylenecy/cermin-saku',
    image: '/images/work/cermin.webp',
    tags: ['Solidity', 'BSC Testnet', 'Rupiah UI'],
    source: 'Dex-Brain/20-PROJEK/cermin-saku.md (lines 13, 16, 21, 41); Dex-Brain/PAPAN.md Aktif #3',
  },
];

export interface RoleEntry {
  id: string;
  title: string;
  org: string;
  period: string;
  detail?: string;
  current?: boolean;
  kind: 'work' | 'lead' | 'community';
  source: string;
}

export const roleRecord: RoleEntry[] = [
  {
    id: 'sowan-builder',
    title: 'Platform builder',
    org: 'Sowan.id — student venture, and my thesis',
    period: '2026 – now',
    detail: 'Architecture, database design and the build, across the competition track and the thesis version.',
    current: true,
    kind: 'work',
    source: 'Dex-Brain/40-REKAM-JEJAK/pengalaman.md — Eksternal (Sowan); prestasi.md — Skripsi',
  },
  {
    id: 'ta-sem7',
    title: 'Teaching assistant — Software Engineering & Programming Fundamentals lab',
    org: 'Information Systems, UKDW',
    period: 'Semester 7 · 2026',
    current: true,
    kind: 'work',
    source: 'Dex-Brain/PAPAN.md — Rutin (Asdos RPL, Asdos DDP)',
  },
  {
    id: 'kp-fk',
    title: 'Internship (Kerja Praktik) — agreement-reminder automation',
    org: 'Faculty of Medicine, UKDW — Microsoft 365',
    period: '2026 – now',
    detail: 'Automatic reminders before partnership agreements (MOU/MOA) expire. Two test runs worked; still in progress.',
    current: true,
    kind: 'work',
    source: 'Dex-Brain/PAPAN.md — Aktif #6 KP RPA-FK',
  },
  {
    id: 'kkn-chair',
    title: 'Overall chair — KKN Tematik STEM 2026',
    org: 'UKDW × Hong Kong Polytechnic University',
    period: 'Jul – Aug 2026',
    detail:
      'Led 59 students across 10 groups and acted as direct liaison to the Hong Kong PolyU supervisors and students. Two programmes: vision screening across 7 schools reaching 2,029 pupils (21–27 July 2026), and the LEAP 2036 high-school workshop (3–5 August 2026).',
    kind: 'lead',
    source: 'web/data/caseStudies.ts — LEAP 2036 sources; v3 record (2 Aug 2026)',
  },
  {
    id: 'synapse',
    title: 'Fullstack developer, intern',
    org: 'Synapse Labs — AFED × BPD HIPMI DIY',
    period: 'Feb – May 2026',
    kind: 'work',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kerja & Internship',
  },
  {
    id: 'ra',
    title: 'Research assistant',
    org: 'Head of Information Systems, UKDW — VR Inclusive Tourism',
    period: 'Jun 2025 – Feb 2026',
    detail: '3D assets and scenes for an accessible VR beach, and teaching community members to use it.',
    kind: 'work',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Research Assistant note',
  },
  {
    id: 'bpm',
    title: 'Coordinator, Aspirations Division',
    org: 'BPM FTI UKDW',
    period: 'Feb 2025 – Apr 2026',
    detail:
      'Ran three "FTI Mendengar" forums, bringing 50+ students into direct dialogue with the faculty leadership and following the outcomes through to concrete changes.',
    kind: 'lead',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kepengurusan; v3 record',
  },
  {
    id: 'ta-math',
    title: 'Teaching assistant — Mathematics for Information Systems',
    org: 'Information Systems, UKDW',
    period: 'Feb – Jun 2025',
    kind: 'work',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Pekerjaan & Profesional',
  },
  {
    id: 'dibarsi',
    title: 'Chair — DIBARSI',
    org: 'Peer discussion programme, Information Systems',
    period: '2025',
    kind: 'lead',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kepengurusan',
  },
  {
    id: 'fticamp',
    title: 'PR coordinator — FTI Camp 2025',
    org: 'Faculty of Information Technology, UKDW',
    period: '2025',
    kind: 'lead',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kepengurusan; certificate scan in this repo',
  },
  {
    id: 'iscd',
    title: 'Secretary — ISCD 2024 "Python Coding Adventure"',
    org: 'Information Systems, UKDW',
    period: '2024',
    kind: 'lead',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kepengurusan; certificate scan in this repo',
  },
  {
    id: 'perangendis',
    title: 'Design & IT team · GeMar volunteer teacher',
    org: 'Peran Gendis — community for women, children, gender and disability, Yogyakarta',
    period: 'Jan 2026 – now',
    current: true,
    kind: 'community',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Komunitas; 20-PROJEK/peran-gendis-gemar.md',
  },
  {
    id: 'bcc',
    title: 'Member',
    org: 'BCC UKDW — the campus Web3 student community',
    period: '2026 – now',
    detail: 'Technical & events crew; my Mantle Research essay is on the community blog.',
    current: true,
    kind: 'community',
    source: 'bccukdw.xyz (checked 6 Oct 2026); Dex-Brain/20-PROJEK/drift-bnb-2026.md:23; 40-REKAM-JEJAK/kalender.md (W3W Roadshow)',
  },
  {
    id: 'gkkk',
    title: 'Youth commission board — PDD division',
    org: 'GKKK Yogyakarta',
    period: '2026 – 2028',
    detail: 'On the Pemerhati team 2024–2026. Also plays drums and keys for services.',
    current: true,
    kind: 'community',
    source: 'Dex-Brain/40-REKAM-JEJAK/prestasi.md — Kepengurusan & Pelayanan Gereja',
  },
];

export interface LiveBuild {
  id: string;
  name: string;
  desc: string;
  url: string;
  tags: string[];
  caseSlug?: string;
  image?: string;
}

/** Everything reachable on the public internet. All returned HTTP 200 on 6 Oct 2026. */
export const liveBuilds: LiveBuild[] = [
  {
    id: 'leap',
    name: 'LEAP 2036',
    desc: 'Offline-capable decision game used in a high-school workshop.',
    url: 'https://leap-2036.vercel.app',
    tags: ['Vanilla JS', 'PWA', 'Supabase'],
    caseSlug: 'leap-2036',
    image: '/images/work/leap.webp',
  },
  {
    id: 'ygms',
    name: 'Space Youth GKKK',
    desc: 'Weekly bulletin and admin system for a church youth ministry.',
    url: 'https://youth-gkkk-ms.vercel.app',
    tags: ['Next.js 16', 'Tailwind v4', 'Supabase'],
    caseSlug: 'space-youth-gkkk',
    image: '/images/work/ygms.webp',
  },
  {
    id: 'sowan',
    name: 'Sowan',
    desc: 'Marketplace connecting learners with elderly mentors. Five languages.',
    url: 'https://sowan-app.vercel.app',
    tags: ['Next.js 16', 'TypeScript', 'Postgres'],
    caseSlug: 'sowan',
    image: '/images/work/sowan.webp',
  },
  {
    id: 'emitra',
    name: 'Emitra',
    desc: 'Carbon border compliance prototype for small exporters.',
    url: 'https://emitra-app.vercel.app',
    tags: ['React', 'Vite'],
    caseSlug: 'emitra',
    image: '/images/work/emitra.webp',
  },
  {
    id: 'perangendis',
    name: 'Peran Gendis',
    desc: 'Public site with a production database for a community programme.',
    url: 'https://perangendis-web.vercel.app',
    tags: ['Next.js', 'Supabase'],
    caseSlug: 'peran-gendis',
    image: '/images/work/perangendis.webp',
  },
  {
    id: 'drift',
    name: 'DRIFT',
    desc: 'On-chain risk guard for a trading bot — hackathon build, Oct 2026.',
    url: 'https://drift-macroguard.vercel.app',
    tags: ['Solidity', 'BSC Testnet'],
    image: '/images/work/drift.webp',
  },
  {
    id: 'cermin-saku',
    name: 'Cermin Saku',
    desc: 'Scheduled allowance with on-chain safety gates — hackathon build, Oct 2026.',
    url: 'https://cermin-saku.vercel.app',
    tags: ['Solidity', 'BSC Testnet'],
    image: '/images/work/cermin.webp',
  },
  {
    id: 'kknhub',
    name: 'KKN STEM Hub',
    desc: 'Coordination site for the 59-student service programme.',
    url: 'https://kknstem.vercel.app',
    tags: ['Vanilla JS', 'Serverless'],
    image: '/images/work/kkn.webp',
  },
  {
    id: 'groundstogrow',
    name: 'GroundsToGrow',
    desc: 'E-commerce MVP with cart, checkout, orders and a seller dashboard.',
    url: 'https://groundstogrow-mvp.vercel.app',
    tags: ['React', 'Node.js', 'MySQL'],
    image: '/images/work/groundstogrow.webp',
  },
  {
    id: 'edufin',
    name: 'EduFin AI',
    desc: 'Financial simulator with live tweakable parameters and real-time charts.',
    url: 'https://edufin-ai-uas.vercel.app',
    tags: ['React', 'Chart.js'],
    image: '/images/work/edufin.webp',
  },
];

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

/**
 * Honest split (Dex-Brain/00-CORE/08-kemampuan.md): "core" is what I write
 * comfortably myself; "shipped with" is what the live projects on this site
 * are built on. Both are true; they are not the same claim.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    title: 'Core',
    items: ['Python', 'SQL', 'JavaScript', 'PHP', 'HTML & CSS', 'REST APIs', 'MySQL', 'PostgreSQL', 'Git'],
  },
  {
    id: 'ship',
    title: 'Shipped with',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Row Level Security', 'Vercel', 'PWA & offline'],
  },
  {
    id: 'make',
    title: 'Design and 3D',
    items: ['Poster & event graphics', 'Photo & video editing', '3D asset modelling', 'VR scenes', 'Unity (beginner)'],
  },
  {
    id: 'people',
    title: 'People and stage',
    items: ['Pitching in English finals', 'Workshop facilitation', 'Leading a 59-student programme', 'Teaching assistant'],
  },
];

export interface CertificateEntry {
  id: string;
  name: string;
  context: string;
  image: string;
}

/** Only certificates whose image actually ships with the site. */
export const certificates: CertificateEntry[] = [
  { id: 'eureca-semi', name: 'EURECA 2026 — Top 15 semifinalist', context: 'Business Plan Competition', image: '/images/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).webp' },
  { id: 'eureca', name: 'EURECA 2026 — participant', context: 'Business Plan Competition', image: '/images/certificates/Dex Bennett (EURECA).webp' },
  { id: 'iscd', name: 'Secretary — ISCD', context: 'Organisational role', image: '/images/certificates/Dex Bennett (Sekretaris ISCD).webp' },
  { id: 'fticamp', name: 'PR coordinator — FTI Camp', context: 'Organisational role', image: '/images/certificates/Dex Bennett (Koor Humas FTI-Camp).webp' },
  { id: 'hmsi', name: 'Member — HMSI', context: 'Information Systems student association', image: '/images/certificates/Dex Bennett (HMSI).webp' },
  { id: 'imt', name: 'Member — IMT', context: 'Student organisation', image: '/images/certificates/Dex Bennett (Anggota IMT).webp' },
  { id: 'smartpath', name: 'SmartPath', context: 'Career development programme', image: '/images/certificates/Dex Bennett (SmartPath).webp' },
  { id: 'typing', name: 'FTI Fest Typing Contest', context: 'Faculty competition', image: '/images/certificates/Dex Bennett (FTI FEST Typing Contest).webp' },
  { id: 'berbagi', name: 'Berbagi Kasih', context: 'Community service', image: '/images/certificates/Dex Bennett (Berbagi Kasih).webp' },
  { id: 'imlek', name: 'Imlek IMT × BOSA', context: 'Event staff', image: '/images/certificates/Dex Bennett (Imlek IMT x BOSA).webp' },
  { id: 'imlek2', name: 'Imlek IMT × BOSA 2.0', context: 'Event staff', image: '/images/certificates/Dex Bennett (Imlek IMT x BOSA) 2.0.webp' },
  { id: 'cocacola', name: 'FTI × Coca-Cola', context: 'Industry programme', image: '/images/certificates/Dex Bennett (FTI+ Coca Cola).webp' },
  { id: 'dana', name: 'FTI × DANA', context: 'Industry programme', image: '/images/certificates/Dex Bennett (FTI+ DANA).webp' },
  { id: 'valorant', name: 'Valorant tournament', context: 'Collegiate esports', image: '/images/certificates/Dex Bennett (Turnamen Valorant).webp' },
];

export interface PosterEntry {
  src: string;
  alt: string;
}

/**
 * Graphic design work. Personal photographs that used to sit in this gallery were
 * removed on 2 Aug 2026: they contain other people, and this is a public site.
 */
export const posters: PosterEntry[] = [
  { src: '/images/gallery/posters/Cross Wallpaper.webp', alt: 'Wallpaper design for the Cross small-group programme' },
  { src: '/images/gallery/posters/Daniel X Youth.webp', alt: 'Event poster for a youth ministry series' },
  { src: '/images/gallery/posters/Flyer GKKK.webp', alt: 'Flyer design for a GKKK church event' },
  { src: '/images/gallery/posters/Class IV Restoration.webp', alt: 'Poster design titled Class IV Restoration' },
  { src: '/images/gallery/posters/Banner IMT 2 (Light).webp', alt: 'Light-theme banner design for the IMT student organisation' },
  { src: '/images/gallery/posters/Hari Pendidikan Nasional IMT.webp', alt: 'National Education Day poster for IMT' },
  { src: '/images/gallery/posters/Hari Buruh Internasional IMT.webp', alt: 'International Labour Day poster for IMT' },
  { src: '/images/gallery/posters/Poster Nyepi.webp', alt: 'Nyepi holiday greeting poster' },
  { src: '/images/gallery/posters/Poster 9 Agust IG.webp', alt: 'Instagram poster dated 9 August' },
  { src: '/images/gallery/posters/31 Jan.webp', alt: 'Event poster dated 31 January' },
  { src: '/images/gallery/posters/HNY - Post.webp', alt: 'New Year greeting post design' },
  { src: '/images/gallery/posters/Poster Profil Penelitian.webp', alt: 'Research profile poster' },
  { src: '/images/gallery/posters/Wallpaper.webp', alt: 'Personal wallpaper design' },
];

/** Additional programmes attended. Certificates exist on file but are not published here. */
export const unpublishedPrograms: string[] = [
  'Google Gemini Academy 2026', 'FTI Camp', 'DILUSI', 'Dialog Lintas Iman (DLI) 2024', 'Peh Cun', 'PeDas APTIKOM',
  'Pekan Budaya Tionghoa Yogyakarta', 'SAP programme', 'Talk Show KaMu', 'Sui GTC',
  'WoW programme', 'ICE conference',
];
