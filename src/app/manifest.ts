import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Subharup Biswas | SB WebWorks',
    short_name: 'SB WebWorks',
    description: 'Founder & Lead Engineer at SB WebWorks — Full-Stack Developer & Security Researcher Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#059669',
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
