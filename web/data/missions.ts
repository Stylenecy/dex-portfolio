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
    statusLabel: 'Active — CTO',
    desc: 'Problem: Language apps teach vocabulary, not cultural wisdom. 183K+ foreign workers in Indonesia struggle to integrate culturally. Decision: CTO role — built the full platform (Next.js 16, TypeScript, Tailwind v4, Vercel). Result: 🥇 1st Place KSE JUARA 2026 BPC (USU, national level). Top 15 Semifinalist BPC EURECA 2026.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Vercel', 'Shadcn UI'],
    image: '/images/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).png',
    links: [
      { label: 'View Certificate', href: '/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).pdf', variant: 'outline' },
    ],
  },
  {
    id: 'lumina-edu',
    name: 'Lumina.EDU',
    status: 'conceptual',
    statusLabel: 'Conceptual Design',
    desc: 'A comprehensive business plan and visual concept for an EdTech platform. Designed to solve the disconnect between academic syllabus and industry needs — focusing on value proposition, user journey, and market viability.',
    tags: ['Business Model Canvas', 'UI/UX Design', 'Product Strategy'],
    image: '/images/Lumina.Edu.png',
    links: [
      { label: 'View Pitch Deck', href: 'https://www.canva.com/design/DAG7uwYIVy8/Um3OpyFJHE4wXzizDnJINQ/edit', variant: 'outline' },
    ],
  },
  {
    id: 'retail-core',
    name: 'Retail Core Engine',
    status: 'completed',
    statusLabel: 'System Prototype',
    desc: 'Capstone project architecture focusing on inventory logic — automated stock alerts and sales tracking data flow. System analysis and database design phase.',
    tags: ['System Analysis', 'Database Design', 'Process Flow'],
    image: '/images/Retail.png',
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
