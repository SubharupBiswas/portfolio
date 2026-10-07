import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/seo';

const title = 'Skills & Technical Competencies';
const description =
  'Technical competencies of Subharup Biswas spanning full-stack web engineering, distributed systems, Next.js, TypeScript, and cloud infrastructure.';

// The page itself is a client component, so route metadata lives in this server layout.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/skills',
  },
  openGraph: pageOpenGraph({ title, description, path: '/skills' }),
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
