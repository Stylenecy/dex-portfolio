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
    title: 'CTO — Sowan.id',
    org: 'EduTech Platform · Trio Capybara Gaje',
    badge: 'command',
    status: 'active',
    period: 'Apr 2026 — Active',
  },
  {
    id: 'fullstack-synapse',
    title: 'Fullstack Dev — Intern',
    org: 'Synapse Labs · AFED × BPD HIPMI DIY',
    badge: 'command',
    status: 'completed',
    period: 'Feb–May 2026',
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
    id: 'chairman-kfc',
    title: 'Chairman — Inter-Church Tournament KFC 2026',
    org: 'GKKK · Aletheia · Hagios Communities',
    badge: 'command',
    status: 'upcoming',
    period: '2026 — Upcoming',
    featured: true,
    featuredDesc: 'Appointed to lead the KFC 2026 inter-church tournament — a large-scale collaborative event uniting three Christian communities. Responsible for orchestrating cross-organizational synergy, operational logistics, and end-to-end event execution from planning to debrief.',
  },
  {
    id: 'sekretaris-iscd',
    title: 'Secretary — ISCD',
    org: 'ISCD Organization',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (Sekretaris ISCD).png',
    certPdf: '/certificates/Dex Bennett (Sekretaris ISCD).pdf',
  },
  {
    id: 'koor-humas-fticamp',
    title: 'PR Coordinator — FTI Camp',
    org: 'FTI Camp',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (Koor Humas FTI-Camp).png',
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
    certImage: '/images/certificates/Dex Bennett (HMSI).png',
    certPdf: '/certificates/Dex Bennett (HMSI).pdf',
  },
  {
    id: 'member-imt',
    title: 'Member — IMT',
    org: 'IMT Organization',
    badge: 'command',
    status: 'certified',
    certImage: '/images/certificates/Dex Bennett (Anggota IMT).jpg',
    certPdf: '/certificates/Dex Bennett (Anggota IMT).pdf',
  },
];
