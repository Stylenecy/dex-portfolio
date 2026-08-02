export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  desc: string;
  current?: boolean;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'kkn-2026',
    year: '2026',
    title: 'Chaired a 59-student service programme, and shipped the software for it',
    desc:
      'Overall chair of KKN Tematik STEM 2026 with Hong Kong Polytechnic University, and direct liaison to their supervisors. Vision screening reached 2,029 pupils across 7 schools in July. In August my group ran the LEAP 2036 workshop I built, one session per class, across two high schools.',
    current: true,
  },
  {
    id: 'audit-2026',
    year: 'Jul 2026',
    title: 'Audited my own live system and found participant data exposed',
    desc:
      'A self-audit on LEAP 2036 showed the public key could read every participant row. I closed it — reads moved behind a server function, database constraints added — applied it to production, and re-verified. The same reasoning shaped the Sowan backend a month later: never create the key that can leak.',
  },
  {
    id: 'sowan-2026',
    year: '2026',
    title: 'Sowan won a national business plan competition',
    desc:
      '1st place at KSE Juara national level, announced 2 May. Top 15 at EURECA, Top 10 at UKRIDA Solve-It. I was the platform builder on a team of three. The thesis version of the backend followed, written on the assumption that the browser cannot be trusted with anything.',
  },
  {
    id: 'synapse-2026',
    year: '2026',
    title: 'First industry internship',
    desc: 'Fullstack developer at Synapse Labs, an industry collaboration between AFED and BPD HIPMI DIY. February to May 2026.',
  },
  {
    id: 'ra-2025',
    year: '2025',
    title: 'Research assistant — VR for people excluded from tourism',
    desc:
      'Assistant to the head of the Information Systems programme. Built 3D assets and scenes for an accessible beach experience, then taught community members with disabilities to use it in person.',
  },
  {
    id: 'bpm-2025',
    year: '2025',
    title: 'Ran the forum where students speak and the faculty has to answer',
    desc:
      'Coordinator of the Aspirations Division at BPM FTI. Three "FTI Mendengar" forums, 50+ students in direct dialogue with the faculty leadership, followed through to concrete changes.',
  },
  {
    id: 'start-2023',
    year: '2023',
    title: 'Started Information Systems out of necessity, not passion',
    desc:
      'I did not arrive with a plan. What I had was the ability to adapt fast and a stubbornness about finishing things. That turned out to be enough to build on.',
  },
];
