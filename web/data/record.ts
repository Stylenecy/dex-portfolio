/**
 * RECORD — competitions, roles, other live builds, and the certificate archive.
 * Same rule as caseStudies.ts: if there is no source on disk, it does not go here.
 */

export type CompetitionOutcome = 'won' | 'finalist' | 'semifinalist' | 'placed' | 'pending';

export interface Competition {
  id: string;
  name: string;
  organiser: string;
  outcome: CompetitionOutcome;
  outcomeLabel: string;
  date: string;
  project?: string;
  note?: string;
  certImage?: string;
}

export const competitions: Competition[] = [
  {
    id: 'kse-2026',
    name: 'Business Plan Competition — KSE Juara, national level',
    organiser: 'Karya Salemba Empat × Universitas Sumatera Utara',
    outcome: 'won',
    outcomeLabel: '1st place',
    date: 'Announced 2 May 2026',
    project: 'Sowan',
    note: 'Certificate on file. Team of three; I built the platform.',
  },
  {
    id: 'eureca-2026',
    name: 'Business Plan Competition EURECA 2026',
    organiser: 'Universitas Prasetiya Mulya, Tangerang',
    outcome: 'semifinalist',
    outcomeLabel: 'Top 15 semifinalist',
    date: '2026',
    project: 'Sowan',
    certImage: '/images/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).webp',
  },
  {
    id: 'ukrida-2026',
    name: 'Solve-It Challenge 2026',
    organiser: 'Universitas Kristen Krida Wacana (UKRIDA)',
    outcome: 'finalist',
    outcomeLabel: 'Top 10 finalist',
    date: 'Final round 13 June 2026',
    project: 'Sowan',
  },
  {
    id: 'bmc-12',
    name: 'BMC #12 International Business Plan Competition',
    organiser: 'Politeknik Negeri Bali',
    outcome: 'pending',
    outcomeLabel: 'Top 15 semifinalist — final pending',
    date: 'Announced 24 July 2026 · final round 20 August 2026',
    project: 'Emitra',
    note: 'The final has not taken place yet. No result beyond reaching the last fifteen.',
  },
  {
    id: 'victus-valorant',
    name: 'Victus Campus Heroes — Valorant, Yogyakarta',
    organiser: 'Collegiate esports tournament',
    outcome: 'placed',
    outcomeLabel: '3rd runner-up',
    date: '2025',
    note: 'Certificate on file.',
  },
];

export interface RoleEntry {
  id: string;
  title: string;
  org: string;
  period: string;
  detail?: string;
  current?: boolean;
}

export const roleRecord: RoleEntry[] = [
  {
    id: 'kkn-chair',
    title: 'Overall chair — KKN Tematik STEM 2026',
    org: 'UKDW × Hong Kong Polytechnic University',
    period: '2026',
    detail:
      'Led 59 students across 10 groups and acted as direct liaison to the Hong Kong PolyU supervisors and students. Two programmes: vision screening across 7 schools reaching 2,029 pupils (21–27 July 2026), and the LEAP 2036 high-school workshop (3–5 August 2026).',
    current: true,
  },
  {
    id: 'sowan-builder',
    title: 'Platform builder (CTO)',
    org: 'Sowan — three-person team',
    period: 'Since 2025',
    detail: 'Architecture, database design and the full build, across the competition track and the thesis build.',
    current: true,
  },
  {
    id: 'ppb',
    title: 'Student staff',
    org: 'UKDW Language Centre (PPB)',
    period: 'Since Sep 2025',
    current: true,
  },
  {
    id: 'perangendis',
    title: 'Design & IT team',
    org: 'Peran Gendis × SriKandi UGM',
    period: 'Since 2026',
    current: true,
  },
  {
    id: 'synapse',
    title: 'Fullstack developer, intern',
    org: 'Synapse Labs — AFED × BPD HIPMI DIY',
    period: 'Feb – May 2026',
  },
  {
    id: 'ra',
    title: 'Research assistant',
    org: 'Head of Information Systems, UKDW — VR Inclusive Tourism',
    period: 'Jun 2025 – Feb 2026',
  },
  {
    id: 'bpm',
    title: 'Coordinator, Aspirations Division',
    org: 'BPM FTI UKDW',
    period: 'Feb 2025 – Apr 2026',
    detail:
      'Ran three "FTI Mendengar" forums, bringing 50+ students into direct dialogue with the faculty leadership and following the outcomes through to concrete changes.',
  },
  {
    id: 'ta-math',
    title: 'Teaching assistant — Mathematics',
    org: 'Information Systems, UKDW',
    period: 'Feb – Jun 2025',
  },
  {
    id: 'dibarsi',
    title: 'Chairman — DIBARSI',
    org: 'HMSI Education Division',
    period: '2024',
    detail: 'Peer academic discussion programme for Information Systems students.',
  },
  {
    id: 'iscd',
    title: 'Secretary',
    org: 'ISCD',
    period: '—',
  },
  {
    id: 'fticamp',
    title: 'PR coordinator',
    org: 'FTI Camp',
    period: '—',
  },
];

export interface LiveBuild {
  id: string;
  name: string;
  desc: string;
  url: string;
  tags: string[];
  caseSlug?: string;
}

/** Everything reachable on the public internet. All verified HTTP 200 on 2 Aug 2026. */
export const liveBuilds: LiveBuild[] = [
  {
    id: 'leap',
    name: 'LEAP 2036',
    desc: 'Offline-capable decision game used in a high-school workshop.',
    url: 'https://leap-2036.vercel.app',
    tags: ['Vanilla JS', 'PWA', 'Supabase'],
    caseSlug: 'leap-2036',
  },
  {
    id: 'ygms',
    name: 'Space Youth GKKK',
    desc: 'Weekly bulletin and admin system for a church youth ministry.',
    url: 'https://youth-gkkk-ms.vercel.app',
    tags: ['Next.js 16', 'Tailwind v4', 'ISR'],
    caseSlug: 'space-youth-gkkk',
  },
  {
    id: 'sowan',
    name: 'Sowan',
    desc: 'Marketplace connecting learners with elderly mentors. Five languages.',
    url: 'https://sowan-app.vercel.app',
    tags: ['Next.js 16', 'TypeScript', 'Postgres'],
    caseSlug: 'sowan',
  },
  {
    id: 'emitra',
    name: 'Emitra',
    desc: 'Carbon border compliance prototype for small exporters.',
    url: 'https://emitra-app.vercel.app',
    tags: ['React', 'Vite'],
    caseSlug: 'emitra',
  },
  {
    id: 'perangendis',
    name: 'Peran Gendis',
    desc: 'Public site with a production database for a community programme.',
    url: 'https://perangendis-web.vercel.app',
    tags: ['Next.js', 'Supabase'],
    caseSlug: 'peran-gendis',
  },
  {
    id: 'kknhub',
    name: 'KKN STEM Hub',
    desc: 'Coordination site for the 59-student service programme.',
    url: 'https://kknstem.vercel.app',
    tags: ['Vanilla JS', 'Serverless'],
  },
  {
    id: 'quinn',
    name: 'Quinn',
    desc: 'A three-page 3D experience. The one built purely to see how far I could push a browser.',
    url: 'https://qbennett.vercel.app',
    tags: ['Three.js', 'WebCrypto'],
  },
  {
    id: 'groundstogrow',
    name: 'GroundsToGrow',
    desc: 'E-commerce MVP with cart, checkout, orders and a seller dashboard.',
    url: 'https://groundstogrow-mvp.vercel.app',
    tags: ['React', 'Node.js', 'MySQL'],
  },
  {
    id: 'edufin',
    name: 'EduFin AI',
    desc: 'Financial simulator with live tweakable parameters and real-time charts.',
    url: 'https://edufin-ai-uas.vercel.app',
    tags: ['React', 'Chart.js'],
  },
];

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'build',
    title: 'Building interfaces',
    items: ['TypeScript', 'React', 'Next.js (App Router)', 'Tailwind', 'Semantic HTML & WCAG', 'Vanilla JS'],
  },
  {
    id: 'data',
    title: 'Data and server',
    items: ['PostgreSQL', 'Supabase', 'Row Level Security', 'Postgres functions & triggers', 'Node.js', 'REST APIs'],
  },
  {
    id: 'ship',
    title: 'Shipping and operating',
    items: ['Vercel', 'Git', 'Serverless functions', 'PWA & offline', 'Performance budgets', 'Security self-audit'],
  },
  {
    id: 'make',
    title: 'Design and 3D',
    items: ['Figma', 'Adobe suite', 'Unity', '3D modelling', 'VR scenes'],
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
  'FTI Camp', 'DILUSI', 'Dialog Lintas Iman (DLI) 2024', 'Peh Cun', 'PeDas APTIKOM',
  'Pekan Budaya Tionghoa Yogyakarta', 'SAP programme', 'Talk Show KaMu', 'Sui GTC',
  'WoW programme', 'ICE conference', 'DIBARSI chair',
];
