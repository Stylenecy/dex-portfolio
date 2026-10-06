/**
 * PROFILE — who, where, how to reach. Same rule as the other data files:
 * every line traces to a source (Dex-Brain/00-CORE/01-biodata.md for identity,
 * 04-karakter.md for the signature line, the v3 live site for the thesis line).
 */
export const profile = {
  name: 'Dex Bennett',
  alias: 'Stylenecy',
  role: 'Creative technologist — designs systems, builds them, and pitches them',
  /** The through-line from v3. Everything on this site should support this sentence. */
  thesis:
    'Most of what I build ends up in the hands of people software usually skips — elderly mentors, church volunteers, high-school students, people who cannot travel.',
  /** Dex-Brain/00-CORE/04-karakter.md:69 — his own line, grammar tidied. */
  signature: "systems that don’t just function — they feel alive.",
  affiliation: 'Universitas Kristen Duta Wacana (UKDW) — Faculty of Information Technology',
  program: 'Information Systems · class of 2023 · semester 7 · Digital Entrepreneurship',
  thesisTitle: 'Sowan.id — an EduTech platform for learning across generations',
  location: 'Yogyakarta, Indonesia',
  email: 'dex.bennett28@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dex-bennett-313b40293/',
  github: 'https://github.com/Stylenecy',
  /** Last time the facts on this site were checked against source files. */
  verifiedOn: '6 October 2026',
} as const;

export const contactChannels = [
  { name: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { name: 'LinkedIn', value: 'dex-bennett', href: profile.linkedin, external: true },
  { name: 'GitHub', value: '@Stylenecy', href: profile.github, external: true },
] as const;
