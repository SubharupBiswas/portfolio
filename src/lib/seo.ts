import type { Metadata } from 'next';

/**
 * Per-page Open Graph block. Next.js replaces (not merges) `openGraph` from a parent layout,
 * so without this every subpage would inherit the homepage's og:title / og:description / og:url.
 */
export function pageOpenGraph({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): NonNullable<Metadata['openGraph']> {
  return {
    title,
    description,
    url: path, // resolved against metadataBase
    siteName: 'Subharup Biswas Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/favicon.png', width: 512, height: 512, alt: 'Subharup Biswas' }],
  };
}
