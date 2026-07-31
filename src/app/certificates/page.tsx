'use client';

import { motion } from 'framer-motion';
import { Award, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CertificateCard } from '@/components/ui/CertificateCard';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { FadeUp } from '@/components/ui/AnimatedText';
import { usePortfolio } from '@/context/PortfolioContext';
import type { Certificate } from '@/types/portfolio';

const CERT_CATEGORIES = [
  'All',
  'Cybersecurity & Forensics',
  'Cloud & Systems',
  'Professional Certifications',
] as const;

export default function CertificatesPage() {
  const { certificates } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);

  const filteredCerts = certificates.filter((c) => {
    const catMatch =
      selectedCategory === 'All' ||
      c.category === selectedCategory ||
      (selectedCategory === 'Cybersecurity & Forensics' && c.category === 'Cybersecurity') ||
      (selectedCategory === 'Cloud & Systems' && c.category === 'Systems');

    const searchMatch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase()) ||
      c.credentialId?.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return catMatch && searchMatch;
  });

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-20 bg-slate-50 dark:bg-zinc-950">
        <div className="section-container">
          {/* Header */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="section-eyebrow">
                  <span className="w-6 h-px bg-emerald-500" />
                  Credentials Vault
                </p>
                <h1 className="section-title">Verified Certifications</h1>
                <p className="section-subtitle">
                  Industry-recognized accreditations in cybersecurity, routing &amp; switching, enterprise networking, and cloud systems.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Controls: Search + Category Filter Bar */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-zinc-800">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CERT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white border border-emerald-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60 hover:bg-slate-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search by title, issuer, tag..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </FadeUp>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onClick={() => setActiveModalCert(cert)}
              />
            ))}
          </div>

          {filteredCerts.length === 0 && (
            <div className="text-center py-16 card-base p-8">
              <Award className="w-8 h-8 text-slate-400 dark:text-zinc-600 mx-auto mb-3" />
              <p className="text-slate-700 dark:text-zinc-300 font-semibold text-sm">No certificates found</p>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Try adjusting your filter or search query.</p>
            </div>
          )}
        </div>
      </main>

      {/* Certificate Detail Modal */}
      <CertificateModal
        certificate={activeModalCert}
        onClose={() => setActiveModalCert(null)}
      />

      <Footer />
    </>
  );
}