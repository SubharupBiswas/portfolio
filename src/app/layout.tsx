import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://subharup.com'),
  title: 'Subharup Biswas — Full-Stack Developer & Security Researcher',
  description:
    'Portfolio of Subharup Biswas — Full-Stack Developer, Security Researcher, and Systems Engineer. Building secure, high-performance digital experiences with Next.js 16, Cloudflare Workers, and modern web architectures.',
  keywords: [
    'Subharup Biswas',
    'Subharup',
    'portfolio',
    'developer',
    'security researcher',
    'full stack',
    'Next.js 16',
    'Cloudflare Workers',
    'cybersecurity',
    'systems engineer',
  ],
  authors: [{ name: 'Subharup Biswas' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Subharup Biswas — Full-Stack Developer & Security Researcher',
    description: 'Building secure, high-performance digital experiences with Next.js 16, Cloudflare Workers, and modern web architectures.',
    url: 'https://subharup.com',
    siteName: 'Subharup.com',
    type: 'website',
    images: [{ url: '/favicon.png', width: 512, height: 512, alt: 'Subharup Biswas Emblem' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subharup Biswas — Full-Stack Developer & Security Researcher',
    description: 'Building secure, high-performance digital experiences with Next.js 16, Cloudflare Workers, and modern web architectures.',
    images: ['/favicon.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Subharup Biswas',
  url: 'https://subharup.com',
  jobTitle: 'Full-Stack Developer & Security Researcher',
  sameAs: [
    'https://github.com/SubharupBiswas',
    'https://linkedin.com/in/subharupbiswas',
    'https://www.credly.com/users/subharupbiswas',
    'https://twitter.com/subharup',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Cybersecurity',
    'Cloudflare Workers',
    'Systems Engineering',
    'Network Telemetry',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 min-h-dvh flex flex-col overflow-x-hidden transition-colors duration-300">
        <GoogleAnalytics GA_MEASUREMENT_ID="G-MWH662KTSF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PortfolioProvider>{children}</PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}