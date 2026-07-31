'use client';

import React from 'react';
import { ArrowUp, Award, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';

const ICONS: Record<string, React.ReactNode> = {
  Github: <Github className="w-4 h-4" />,
  Linkedin: <Linkedin className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
  Twitter: <Twitter className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  Credly: <Award className="w-4 h-4" />,
};

export function Footer() {
  const { bio, socialLinks } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90 backdrop-blur-sm mt-auto transition-colors duration-300">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Left: Branding + copyright */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link className="flex items-center gap-2.5 group cursor-pointer" href="/">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-sky-500/30">
                <Image alt="Subharup Biswas Emblem" className="object-cover" fill sizes="32px" src="/favicon.png" />
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                subharup<span className="text-sky-600 dark:text-sky-400">.com</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              © {new Date().getFullYear()}{' '}Subharup Biswas. Built with Next.js 16 &amp; React 19.
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 text-center sm:text-left">
              Protected by Cloudflare Turnstile.{' '}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-sky-500 transition-colors"
              >
                Privacy Policy
              </a>{' '}
              &amp;{' '}
              <a
                href="https://www.cloudflare.com/website-terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-sky-500 transition-colors"
              >
                Terms of Service
              </a>
              .
            </p>
          </div>

          {/* Center: Availability status */}
          {bio.availableForWork && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span>{bio.availabilityLabel}</span>
            </div>
          )}

          {/* Right: Social links + back-to-top */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
              >
                {ICONS[link.icon] ?? null}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="ml-2 p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 hover:border-sky-500/50 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
