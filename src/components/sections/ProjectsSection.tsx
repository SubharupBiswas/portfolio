'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FadeUp } from '@/components/ui/AnimatedText';
import type { ProjectCategory } from '@/types/portfolio';
import { cn } from '@/lib/utils';

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All', 'Web Dev', 'Systems', 'Security', 'Open Source', 'Other',
];

export function ProjectsSection() {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="section-container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="section-eyebrow">
                <span className="w-6 h-px bg-indigo-500" />
                Work
              </p>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                A selection of projects that demonstrate my skills across web development, security research, and systems engineering.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Category Filters */}
        <FadeUp delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer',
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-sm'
                    : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-zinc-200 hover:border-zinc-600'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            <p>No projects in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
