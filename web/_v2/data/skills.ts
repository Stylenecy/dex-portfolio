export interface SkillModule {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}

export const skillModules: SkillModule[] = [
  {
    id: 'interface',
    title: 'Interface Modules',
    desc: 'Building visual layers and interaction points. From semantic structure to animated, accessible UIs.',
    tags: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React', 'Next.js', 'Tailwind'],
  },
  {
    id: 'core-systems',
    title: 'Core Systems',
    desc: 'Server-side logic, data pipelines, and API architecture. The engine beneath the interface.',
    tags: ['Node.js', 'Express', 'Python', 'MySQL', 'PostgreSQL', 'Supabase', 'API Integration'],
  },
  {
    id: 'creative-engine',
    title: 'Creative Engine',
    desc: 'Visual storytelling and asset generation. Bridging the gap between design systems and engineering.',
    tags: ['Figma', 'Adobe Suite', 'Generative AI', 'UI/UX Logic'],
  },
  {
    id: 'environment',
    title: 'Environment',
    desc: 'Tools to maintain system integrity, version control, and deployment pipelines.',
    tags: ['VS Code', 'Git / GitHub', 'Postman', 'Vercel'],
  },
  {
    id: 'spatial-3d',
    title: 'Spatial / 3D',
    desc: 'Immersive and spatial computing. Building VR environments and 3D scenes — load-bearing work behind VR Inclusive Tourism.',
    tags: ['Unity', '3D Modeling', 'VR Environments', 'Scene Setting'],
  },
];
