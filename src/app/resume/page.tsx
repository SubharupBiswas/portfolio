'use client';

import { ArrowRight, Download, ExternalLink, FileText } from 'lucide-react';
import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ResumePage() {
  useEffect(() => {
    // Automatically redirect browser to the PDF file
    window.location.replace('/Profile.pdf');
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 min-h-[80vh] flex items-center justify-center py-24">
        <div className="section-container max-w-xl text-center">
          <div className="card-base p-8 sm:p-12 flex flex-col items-center gap-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <FileText className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                Opening Resume...
              </h1>
              <p className="text-sm text-slate-600 dark:text-zinc-400">
                You are being redirected to Subharup Biswas&apos;s verified resume PDF.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="/Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in New Tab</span>
              </a>
              <a
                href="/Profile.pdf"
                download="Subharup_Biswas_Resume.pdf"
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Direct Download</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
