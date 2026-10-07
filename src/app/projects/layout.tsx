import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/seo';

const title = 'Projects & Case Studies';
const description =
  'Selected projects by Subharup Biswas: edge-deployed web apps, network tooling, and security-focused engineering case studies.';

// The /projects page is a client component, so route metadata lives in this server layout.
// Individual case studies (/projects/[id]) override the title, canonical and Open Graph via generateMetadata.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/projects',
  },
  openGraph: pageOpenGraph({ title, description, path: '/projects' }),
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
