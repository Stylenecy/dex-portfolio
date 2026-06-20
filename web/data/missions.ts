export type MissionStatus = 'active' | 'completed' | 'conceptual';

export interface MissionLink {
  label: string;
  href: string;
  variant?: 'outline' | 'text';
}

export interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  statusLabel: string;
  desc: string;
  tags: string[];
  image?: string;
  links?: MissionLink[];
}

export const missions: Mission[] = [
  {
    id: 'sowan',
    name: 'Sowan.id',
    status: 'active',
    statusLabel: 'Active — Platform Builder',
    desc: 'Problem: Generational knowledge is fading — younger learners lose access to the cultural wisdom, language, and life knowledge held by elderly Indonesians. Thinking: A cross-generational EduTech platform that connects learners directly with elderly Indonesian mentors (sesepuh/lansia) across multiple domains — culture, language, and life skills. Decision: Built the full platform as the team\'s Platform Builder (Next.js 16, TypeScript, Tailwind v4, Vercel). Result: 🥇 1st Place — KSE JUARA 2026 (USU) · Top 15 Semifinalist — BPC EURECA 2026 · Top 10 Finalist — UKRIDA Solve-It Challenge 2026. HAKI registration in progress (LPPM UKDW).',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Vercel', 'Shadcn UI'],
    image: '/images/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).webp',
    links: [
      { label: 'View Certificate', href: '/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).pdf', variant: 'outline' },
    ],
  },
  {
    id: 'kopiloyalty',
    name: 'KopiLoyalty',
    status: 'completed',
    statusLabel: 'Hackathon Build — MonadBlitz 2026',
    desc: 'Problem: Coffee-shop loyalty points are siloed, forgeable, and vanish when an app shuts down. Thinking: Put loyalty on-chain so points become portable, verifiable, and outlive any single vendor. Decision: Built a blockchain-based coffee loyalty system at MonadBlitz Hackathon Jogja 2026 — wallet-linked points with tamper-proof redemption. Result: Shipped a working prototype inside the hackathon window — first venture into web3 / on-chain product design.',
    tags: ['Blockchain', 'Web3', 'Smart Contracts', 'Hackathon'],
  },
  {
    id: 'prasaja',
    name: 'Prasaja',
    status: 'conceptual',
    statusLabel: 'Concept — VR Horror',
    desc: 'Problem: Most horror leans on cheap jumpscares instead of dread. Thinking: Build fear from atmosphere, symbolic objects, and Javanese mysticism — environmental storytelling over shock. Decision: Designed Prasaja, a VR horror experience centered on Laras, steeped in Javanese folklore and mood. Result: Concept and design direction defined — a personal world-building project treating VR as an emotional medium, not a thrill ride.',
    tags: ['VR', 'Game Design', 'World-Building', 'Environmental Storytelling'],
  },
  {
    id: 'vr-inclusive',
    name: 'VR Inclusive Tourism',
    status: 'completed',
    statusLabel: 'Completed — RA Project',
    desc: 'Problem: People with disabilities are often excluded from tourism experiences. Solution: VR beach experience accessible regardless of physical ability. Contributed 3D asset modeling, scene setting, and field-deployed teaching community members with disabilities to experience VR firsthand.',
    tags: ['Unity', '3D Modeling', 'VR Development', 'Field Research'],
  },
];
