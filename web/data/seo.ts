import type { Metadata } from 'next';

/**
 * Per-route SEO. Next merges metadata one key deep, so a page that sets
 * `openGraph` replaces the layout's whole object — every route therefore
 * builds its own complete set here: canonical URL, OG and Twitter, and the
 * shared card from app/opengraph-image.tsx.
 */
const OG_IMAGE = '/opengraph-image';

export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const full = absoluteTitle ? title : `${title} — Dex Bennett`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      type: path === '/' ? 'profile' : 'website',
      locale: 'en_US',
      siteName: 'Dex Bennett',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Dex Bennett — creative technologist, Yogyakarta' }],
    },
    twitter: { card: 'summary_large_image', title: full, description, images: [OG_IMAGE] },
  };
}
