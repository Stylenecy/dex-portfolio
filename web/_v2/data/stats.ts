export type StatColor = 'cyan' | 'red' | 'orange' | 'purple' | 'green';
export type StatRank = 'S' | 'S-' | 'A' | 'A-' | 'B' | 'B+' | 'C';

export interface Stat {
  label: string;
  rank: StatRank;
  filled: number;
  max: number;
  color: StatColor;
  awakened?: boolean;
}

export const operatorStats: Stat[] = [
  { label: 'VISION',       rank: 'S',  filled: 7, max: 7, color: 'purple', awakened: true },
  { label: 'STRENGTH',     rank: 'B',  filled: 5, max: 7, color: 'cyan' },
  { label: 'SPEED',        rank: 'B',  filled: 4, max: 7, color: 'red' },
  { label: 'POTENTIAL',    rank: 'A',  filled: 6, max: 7, color: 'orange', awakened: true },
  { label: 'INTELLIGENCE', rank: 'A-', filled: 6, max: 7, color: 'orange' },
  { label: 'ENDURANCE',    rank: 'B',  filled: 5, max: 7, color: 'cyan' },
];
