import type { MetadataRoute } from 'next';
import { caseStudies } from '@/data/caseStudies';

const BASE = 'https://dex-portfolio.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/record'].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const caseRoutes = caseStudies.map((c) => ({
    url: `${BASE}/work/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseRoutes];
}
