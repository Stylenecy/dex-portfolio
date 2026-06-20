export interface DeployedModule {
  id: string;
  name: string;
  desc: string;
  url: string;
  tags: string[];
  status: 'live' | 'active' | 'archived';
  highlight?: string;
}

export const deployedModules: DeployedModule[] = [
  {
    id: 'quinn',
    name: 'Quinn Site',
    desc: 'Three.js orbital 3-page experience with WebCrypto finale. Soul showcase — most technically expressive project built to date.',
    url: 'https://qbennett.vercel.app',
    tags: ['Three.js', 'WebCrypto', 'Vanilla JS', 'CSS Animation'],
    status: 'live',
    highlight: 'Soul showcase',
  },
  {
    id: 'groundstogrow',
    name: 'GroundsToGrow',
    desc: 'Full e-commerce MVP: cart/checkout/orders + seller dashboard + public repo. End-to-end fullstack from scratch.',
    url: 'https://groundstogrow-mvp.vercel.app',
    tags: ['React', 'Node.js', 'MySQL', 'Express', 'Vercel'],
    status: 'live',
    highlight: 'E-commerce MVP',
  },
  {
    id: 'edufin',
    name: 'EduFin AI',
    desc: 'Interactive financial simulator — 28 live tweakable parameters, 5 real-time charts. Audit grade: PASS.',
    url: 'https://edufin-ai-uas.vercel.app',
    tags: ['React', 'Chart.js', 'Simulation', 'Vercel'],
    status: 'live',
    highlight: 'Financial simulator',
  },
  {
    id: 'kkn',
    name: 'KKN LEAP-2036 Hub',
    desc: 'Serverless fullstack community hub with built-in AI chatbot (Gemini), per-student dashboard, and real data.',
    url: 'https://kknstem.vercel.app',
    tags: ['Vanilla JS', 'Gemini AI', 'Serverless', 'Vercel'],
    status: 'live',
    highlight: 'AI chatbot',
  },
  {
    id: 'perangendis',
    name: 'Peran Gendis',
    desc: 'Next.js + Supabase platform for SriKandi UGM — real form submissions, production database, fully deployed.',
    url: 'https://perangendis-web.vercel.app',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Vercel'],
    status: 'live',
    highlight: 'Supabase backend',
  },
];
