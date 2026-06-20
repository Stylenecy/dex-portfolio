export type TimelineStatus = 'current' | 'completed' | 'archived' | 'upcoming';
export type TimelineTag = 'achievement' | 'tech' | 'leadership' | 'milestone';

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  tag: TimelineTag;
  tagLabel: string;
  desc: string;
  status: TimelineStatus;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'kfc-chairman',
    year: '2026 (Upcoming)',
    title: 'Chairman — Inter-Church Tournament KFC',
    tag: 'leadership',
    tagLabel: 'Large-Scale Event Leadership',
    desc: 'Leading the KFC 2026 tournament uniting GKKK, Aletheia, and Hagios communities. Full operational responsibility from planning to debrief.',
    status: 'upcoming',
  },
  {
    id: 'cto-sowan',
    year: '2026',
    title: 'Platform Builder — Sowan.id · 🥇 KSE JUARA 2026 1st Place',
    tag: 'achievement',
    tagLabel: 'National Champion · EduTech',
    desc: 'Built SOWAN — cross-generational EduTech platform connecting learners with elderly Indonesian mentors (sesepuh/lansia) for cultural wisdom, language, and life knowledge. Platform Builder role: full Next.js 16 + TypeScript + Vercel stack. Results: 🥇 1st Place — KSE JUARA 2026 (USU, national level) · Top 15 Semifinalist — BPC EURECA 2026 · Top 10 Finalist — UKRIDA Solve-It Challenge 2026. HAKI registration in progress (LPPM UKDW).',
    status: 'current',
  },
  {
    id: 'synapse-intern',
    year: '2026',
    title: 'Fullstack Developer — Synapse Labs (Internship)',
    tag: 'tech',
    tagLabel: 'Industry · Fullstack',
    desc: 'Fullstack development internship at Synapse Labs — industry collaboration between AFED & BPD HIPMI DIY. Built and integrated fullstack features for enterprise-level systems. Feb 2026 – 8 May 2026.',
    status: 'completed',
  },
  {
    id: 'bpmfti-coordinator',
    year: '2025',
    title: 'Coordinator — Aspirasi Division, BPMFTI',
    tag: 'achievement',
    tagLabel: 'Policy Impact & Advocacy',
    desc: 'Executed 3× "FTI Mendengar" forums. Facilitated dialogue between 500+ students and deanery. Drove concrete policy changes.', // TODO(dex): verify figures
    status: 'completed',
  },
  {
    id: 'research-assistant',
    year: '2025',
    title: 'Research Assistant — Kaprodi SI, UKDW',
    tag: 'tech',
    tagLabel: 'Academic Research · VR',
    desc: 'Research assistant to the Head of Information Systems. Core project: VR Inclusive Tourism — beach VR experience for persons with disabilities. Contributed 3D asset modeling, scene setup, and field deployment teaching community members to experience VR firsthand. Jun 2025–Feb 2026.',
    status: 'completed',
  },
  {
    id: 'fti-mendengar-3',
    year: '2025',
    title: 'FTI Mendengar #3 — Forum Execution',
    tag: 'tech',
    tagLabel: 'Operational Leadership',
    desc: 'Orchestrated the faculty aspirations forum. 100+ students engaged. Tangible policy changes on facility maintenance.', // TODO(dex): verify figures
    status: 'completed',
  },
  {
    id: 'dibarsi-chairman',
    year: '2024',
    title: 'Chairman — DIBARSI, HMSI',
    tag: 'tech',
    tagLabel: 'Academic Leadership',
    desc: 'Led "Diskusi Bareng Sistem Informasi" under HMSI Education Division. Facilitated peer-to-peer academic growth.',
    status: 'archived',
  },
  {
    id: 'dev-programs-2024',
    year: '2024',
    title: 'DLI 2024 · SmartPath · PeDas APTIKOM',
    tag: 'milestone',
    tagLabel: 'Professional Development',
    desc: 'Active participation in Data Lab Indonesia, SmartPath career program, and PeDas APTIKOM. Building industry connections.',
    status: 'archived',
  },
  {
    id: 'system-boot',
    year: '2023',
    title: 'System Boot & Resilience Initialized',
    tag: 'milestone',
    tagLabel: 'Adaptability',
    desc: 'Enrolled in Information Systems, UKDW. Initially driven by necessity rather than passion. Survived through intellect, faith, and strategic tech leverage. Proof that adaptability beats raw talent.',
    status: 'archived',
  },
];
