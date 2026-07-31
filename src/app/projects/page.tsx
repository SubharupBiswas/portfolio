'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FadeUp } from '@/components/ui/AnimatedText';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProjectCategory } from '@/types/portfolio';
import { cn } from '@/lib/utils';

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All', 'Web Dev', 'Systems', 'Security', 'Open Source', 'Other',
];

export default function ProjectsPage() {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-20 bg-slate-50 dark:bg-zinc-950">
        <div className="section-container">
          {/* Header */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="section-eyebrow">
                  <span className="w-6 h-px bg-sky-500" />
                  Work &amp; Case Studies
                </p>
                <h1 className="section-title">Projects Showcase</h1>
                <p className="section-subtitle">
                  Detailed technical case studies spanning full-stack applications, cryptography engines, and digital forensics tooling.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Search & Filter Bar */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Search input */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter projects or tech stack..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800
                             text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 text-xs
                             focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer',
                      activeCategory === cat
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700/60 hover:bg-slate-200 dark:hover:bg-zinc-700'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ perspective: 1000 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 card-base my-8 p-8">
              <p className="text-base font-semibold text-slate-900 dark:text-zinc-100">No projects match your filter.</p>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Try clearing your search query or switching categories.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
