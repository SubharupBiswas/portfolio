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
  alternates: {
    canonical: 'https://subharup.com',
  },
  title: {
    default: 'Subharup Biswas | Full-Stack Software Engineer',
    template: '%s | Subharup Biswas',
  },
  description:
    'Portfolio of Subharup Biswas — B.Tech CSE (Cyber Security) undergraduate at Techno Main Salt Lake and full-stack software engineer specializing in Next.js, TypeScript, cloud infrastructure, and distributed systems.',
  keywords: [
    'Subharup Biswas',
    'Subharup',
    'portfolio',
    'software engineer',
    'full stack',
    'systems builder',
    'Next.js 16',
    'TypeScript',
    'Cloudflare Workers',
    'distributed systems',
    'cloud infrastructure',
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
    title: 'Subharup Biswas | Full-Stack Software Engineer',
    description:
      'Explore projects, engineering case studies, and verified credentials across modern web platforms, edge computing, and cloud infrastructure.',
    url: 'https://subharup.com',
    siteName: 'Subharup Biswas Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/favicon.png', width: 512, height: 512, alt: 'Subharup Biswas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subharup Biswas | Full-Stack Software Engineer',
    description:
      'Explore projects, engineering case studies, and verified credentials across modern web platforms, edge computing, and cloud infrastructure.',
    images: ['/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  jobTitle: 'Full-Stack Software Engineer & Systems Builder',
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
    'Distributed Systems',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Preload hero avatar to eliminate LCP delay on mobile */}
        <link
          rel="preload"
          as="image"
          href="/dp.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
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