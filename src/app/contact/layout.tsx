import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/seo';

const title = 'Contact';
const description =
  'Get in touch with Subharup Biswas for software engineering opportunities, technical collaborations, and full-stack projects.';

// The page itself is a client component, so route metadata lives in this server layout.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: pageOpenGraph({ title, description, path: '/contact' }),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
