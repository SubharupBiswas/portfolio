import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Subharup Biswas | Full-Stack Software Engineer',
    short_name: 'Subharup',
    description: 'Portfolio of Subharup Biswas — B.Tech CSE (Cyber Security) undergraduate at Techno Main Salt Lake & Full-Stack Software Engineer',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
