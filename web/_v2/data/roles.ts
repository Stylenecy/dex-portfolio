export type RoleBadge = 'command' | 'operations' | 'arena';
export type RoleStatus = 'active' | 'completed' | 'upcoming' | 'certified';

export interface Role {
  id: string;
  title: string;
  org: string;
  badge: RoleBadge;
  status: RoleStatus;
  period?: string;
  certImage?: string;
  certPdf?: string;
  featured?: boolean;
  featuredDesc?: string;
}

export const commandRoles: Role[] = [
  {
    id: 'cto-sowan',
    title: 'Platform Builder — Sowan.id',
    org: 'EduTech Platform · Trio Capybara Gaje',
    badge: 'command',
    status: 'active',
    period: 'Apr 2026 — Active',
    featured: true,
    featuredDesc: 'Built the full Sowan.id platform (Next.js 16 + TypeScript + Supabase + Vercel) — a cross-generational EduTech connecting learners with elderly Indonesian mentors (sesepuh) for cultural wisdom, language, and life knowledge. Led the technical build end-to-end, from architecture to deploy. 🥇 1st Place KSE JUARA 2026 · Top 15 Semifinalist EURECA · Top 10 UKRIDA Solve-It.',
  },
  {
    id: 'research-assistant',
    title: 'Research Assistant',
    org: 'Kaprodi SI · VR Inclusive Tourism',
    badge: 'command',
    status: 'completed',
    period: 'Jun 2025 – Feb 2026',
  },
  {
    id: 'teaching-assistant-math',
    title: 'Teaching Assistant — Math (SI)',
    org: 'UKDW · Information Systems',
    badge: 'command',
    status: 'completed',
    period: 'Feb 2025 – Jun 2025',
  },
  {
    id: 'koor-aspirasi-bpm',
    title: 'Koordinator Divisi Aspirasi',
    org: 'BPM FTI UKDW',
    badge: 'command',
    status: 'completed',
    period: 'Feb 2025 – Apr 2026',
  },
  {
    id: 'fullstack-synapse',
    title: 'Fullstack Dev — Intern',
    org: 'Synapse Labs · AFED × BPD HIPMI DIY',
    badge: 'command',
    status: 'completed',
    period: 'Feb 2026 – 8 May 2026',
  },
  {
    id: 'design-it-perangendis',
    title: 'Tim Desain & IT',
    org: 'Peran Gendis · SriKandi UGM',
    badge: 'command',
    status: 'active',
    period: '2026 — Active',
  },
  {
    id: 'student-staff-ppb',
    title: 'Student Staff',
    org: 'PPB UKDW · Language Center',
    badge: 'command',
    status: 'active',
    period: 'Sep 2025 — Active',
  },
  {
    id: 'sekretaris-iscd',
    title: 'Secretary — ISCD',
    org: 'ISCD Organization',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (Sekretaris ISCD).webp',
    certPdf: '/certificates/Dex Bennett (Sekretaris ISCD).pdf',
  },
  {
    id: 'koor-humas-fticamp',
    title: 'PR Coordinator — FTI Camp',
    org: 'FTI Camp',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (Koor Humas FTI-Camp).webp',
    certPdf: '/certificates/Dex Bennett (Koor Humas FTI-Camp).pdf',
  },
  {
    id: 'chairman-dibarsi',
    title: 'Chairman — DIBARSI',
    org: 'HMSI Education Division',
    badge: 'command',
    status: 'certified',
    period: '2024',
    certPdf: '/certificates/Dex Bennett (DIBARSI).pdf',
  },
  {
    id: 'member-hmsi',
    title: 'Member — HMSI',
    org: 'Himpunan Mahasiswa Sistem Informasi',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (HMSI).webp',
    certPdf: '/certificates/Dex Bennett (HMSI).pdf',
  },
  {
    id: 'member-imt',
    title: 'Member — IMT',
    org: 'IMT Organization',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (Anggota IMT).webp',
    certPdf: '/certificates/Dex Bennett (Anggota IMT).pdf',
  },
];
