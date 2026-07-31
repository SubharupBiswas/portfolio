'use client';

import React from 'react';
import { ArrowUp, Award, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';

const ICONS: Record<string, React.ReactNode> = {
  Github:   <Github className="w-4 h-4" />,
  Linkedin: <Linkedin className="w-4 h-4" />,
  Mail:     <Mail className="w-4 h-4" />,
  Twitter:  <Twitter className="w-4 h-4" />,
  Award:    <Award className="w-4 h-4" />,
  Credly:   <Award className="w-4 h-4" />,
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
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center shadow-xs">
                <span className="font-mono font-bold text-xs text-white">S</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-zinc-200 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Subharup.com
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-zinc-500">
              © {new Date().getFullYear()} Subharup. Built with Next.js 16 &amp; React 19.
            </p>
          </div>

          {/* Center: Availability status */}
          {bio.availableForWork && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                {bio.availabilityLabel}
              </span>
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
                className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
              >
                {ICONS[link.icon] ?? null}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="ml-2 p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
