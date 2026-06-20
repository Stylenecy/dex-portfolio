export type ArenaResult = 'champion' | 'finalist' | 'semifinalist' | 'competitor' | 'pending';

export interface ArenaRecord {
  id: string;
  name: string;
  org: string;
  result: ArenaResult;
  resultLabel: string;
  certImage?: string;
  certPdf?: string;
}

export const arenaRecords: ArenaRecord[] = [
  {
    id: 'kse-juara',
    name: 'KSE JUARA 2026', // TODO(dex): full KSE competition name
    org: 'Business Plan Competition — USU',
    result: 'champion',
    resultLabel: '🥇 1st Place Champion',
  },
  {
    id: 'eureca-bpc',
    name: 'BPC EURECA 2026',
    org: 'Business Plan Competition (BPC)',
    result: 'semifinalist',
    resultLabel: 'Top 15 Semi-Finalist',
    certImage: '/images/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).webp',
    certPdf: '/certificates/Dex Bennett (EURECA-Top 15 Semifinalist).pdf',
  },
  {
    id: 'ukrida-solveit',
    name: 'Solve-It Challenge 2026 — UKRIDA',
    org: 'Sowan.id — UKRIDA',
    result: 'finalist',
    resultLabel: 'Top 10 Finalist',
  },
  {
    id: 'victus-heroes',
    name: 'Victus Campus Heroes',
    org: 'Valorant Tournament — Yogyakarta',
    result: 'finalist',
    resultLabel: '🏆 3rd Runner-Up',
    certPdf: '/certificates/Juara Harapan III Victus Campus Heroes Valorant Yogyakarta.pdf',
  },
  {
    id: 'turnamen-valorant',
    name: 'Turnamen Valorant',
    org: 'Valorant Esports',
    result: 'competitor',
    resultLabel: 'Competitor',
    certImage: '/images/certificates/Dex Bennett (Turnamen Valorant).webp',
  },
  {
    id: 'turnamen-mlbb',
    name: 'Turnamen Mobile Legends',
    org: 'MLBB Esports',
    result: 'competitor',
    resultLabel: 'Competitor',
  },
];
