import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    /* The v2 dashboard routes were retired on 2 Aug 2026. Anything already
       linked or indexed still lands somewhere sensible instead of a 404. */
    return [
      { source: '/system-core', destination: '/', permanent: true },
      { source: '/operations', destination: '/record', permanent: true },
      { source: '/operator-metrics', destination: '/about', permanent: true },
      { source: '/archives', destination: '/record', permanent: true },
      { source: '/records', destination: '/record', permanent: true },
    ];
  },
};

export default nextConfig;
