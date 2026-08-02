export const profile = {
  name: 'Dex Bennett',
  alias: 'Style / Stylenecy',
  role: 'Information Systems student · builds software people actually use',
  /** The through-line. Everything on this site should support this sentence. */
  thesis:
    'Most of what I build ends up in the hands of people software usually skips — elderly mentors, church volunteers, high-school students, people who cannot travel.',
  affiliation: 'Universitas Kristen Duta Wacana — Faculty of Information Technology',
  program: 'Information Systems, class of 2023 · entering semester 7',
  location: 'Yogyakarta, Indonesia',
  email: 'dex.bennett28@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dex-bennett-313b40293/',
  github: 'https://github.com/Stylenecy',
  /** Last time the facts on this site were checked against source files. */
  verifiedOn: '2 August 2026',
} as const;

export const contactChannels = [
  { name: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { name: 'LinkedIn', value: 'dex-bennett', href: profile.linkedin, external: true },
  { name: 'GitHub', value: '@Stylenecy', href: profile.github, external: true },
] as const;
