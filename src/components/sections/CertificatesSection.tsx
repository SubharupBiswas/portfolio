'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { CertificateCard } from '@/components/ui/CertificateCard';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { FadeUp } from '@/components/ui/AnimatedText';
import type { Certificate, CertificateCategory } from '@/types/portfolio';
import { cn } from '@/lib/utils';

interface CertificatesSectionProps {
  limit?: number;
}

export function CertificatesSection({ limit }: CertificatesSectionProps) {
  const { certificates } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = useMemo(() => {
    const set = new Set(certificates.map((c) => c.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [certificates]);

  const filtered = useMemo(() => {
    const list = certificates.filter((c) => {
      const matchCategory = activeCategory === 'All' || c.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.tags?.some((t) => t.includes(q));
      return matchCategory && matchSearch;
    });
    return limit && limit > 0 ? list.slice(0, limit) : list;
  }, [certificates, activeCategory, search, limit]);

  return (
    <section id="certificates" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="section-eyebrow">
                <span className="w-6 h-px bg-indigo-500" />
                Credentials
              </p>
              <h2 className="section-title">Certificates &amp; Certifications</h2>
              <p className="section-subtitle">
                Verified credentials across cybersecurity, cloud infrastructure, and professional development.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Filters Row */}
        <FadeUp delay={0.1}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search certificates or tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80
                           text-zinc-100 placeholder-zinc-500 text-sm
                           focus:border-indigo-500/60 focus:outline-none transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer',
                    activeCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <p>No certificates match your search.</p>
          </div>
        )}

        {/* Certificate Modal */}
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      </div>
    </section>
  );
}
