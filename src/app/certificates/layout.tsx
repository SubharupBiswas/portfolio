import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/seo';

const title = 'Certificates & Credentials';
const description =
  'Verified certifications and credentials of Subharup Biswas across Cisco networking, Python, cybersecurity, and applied AI.';

// The page itself is a client component, so route metadata lives in this server layout.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/certificates',
  },
  openGraph: pageOpenGraph({ title, description, path: '/certificates' }),
};

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
