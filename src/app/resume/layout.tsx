import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/seo';

const title = 'Resume & Curriculum Vitae';
const description = 'Verified resume and technical profile of Subharup Biswas — Full-Stack Software Engineer & Systems Builder.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/resume',
  },
  openGraph: pageOpenGraph({ title, description, path: '/resume' }),
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
