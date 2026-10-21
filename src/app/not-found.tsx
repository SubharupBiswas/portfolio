'use client';

import { ArrowRight, FileText, FolderGit2, Home, Mail, Search, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 min-h-[85dvh] flex items-center justify-center py-24 relative overflow-hidden">
        {/* Subtle Ambient Lighting Blobs (Sky Blue Palette) */}
        <div
          aria-hidden
          className="orb w-[450px] h-[450px] -top-32 -left-32 opacity-20 dark:opacity-15"
          style={{
            background:
              'radial-gradient(circle, rgba(14,165,233,0.25) 0%, rgba(56,189,248,0.12) 50%, transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="orb w-[400px] h-[400px] -bottom-32 -right-32 opacity-15 dark:opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(2,132,199,0.2) 0%, rgba(56,189,248,0.1) 50%, transparent 70%)',
          }}
        />

        <div className="section-container relative z-10 max-w-xl text-center">
          <div className="card-base p-8 sm:p-12 flex flex-col items-center gap-6 shadow-xl border border-slate-200/80 dark:border-zinc-800">
            {/* Status Icon */}
            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/25 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            {/* Error Code & Message */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-500/20">
                Error 404 · Route Not Found
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-2">
                Page Not Found
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                The page or resource you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
              <Link href="/" className="btn-primary w-full sm:w-auto justify-center flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </Link>
              <Link href="/projects" className="btn-secondary w-full sm:w-auto justify-center flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>View Projects</span>
              </Link>
            </div>

            {/* Quick Links Row */}
            <div className="w-full pt-6 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-zinc-400">
              <Link href="/skills" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                Skills Matrix
              </Link>
              <span>·</span>
              <Link href="/certificates" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                Verified Credentials
              </Link>
              <span>·</span>
              <a
                href="/Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
              <span>·</span>
              <Link href="/contact" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
