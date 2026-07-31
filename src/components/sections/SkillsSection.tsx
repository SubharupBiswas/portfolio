'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SkillChip } from '@/components/ui/SkillChip';
import { FadeUp } from '@/components/ui/AnimatedText';
import type { SkillCategory } from '@/types/portfolio';
import { cn } from '@/lib/utils';

const CATEGORIES: SkillCategory[] = [
  'Web Development',
  'Systems & Infrastructure',
  'Cybersecurity',
  'Languages & Tools',
];

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  'Web Development':          '🌐 Web Dev',
  'Web Dev':                  '🌐 Web Dev',
  'Systems & Infrastructure': '⚙️ Systems',
  'Cybersecurity':            '🛡️ Security',
  'Languages & Tools':        '🔧 Languages',
};

export function SkillsSection() {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-zinc-900/40">
      <div className="section-container">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-eyebrow">
                <span className="w-6 h-px bg-indigo-500" />
                Expertise
              </p>
              <h2 className="section-title">Skills &amp; Technologies</h2>
              <p className="section-subtitle">
                A curated set of tools I use to build and secure digital systems.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Category Tabs */}
        <FadeUp delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-8">
            {(['All', ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border',
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-sm'
                    : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-zinc-200 hover:border-zinc-600'
                )}
              >
                {cat === 'All' ? '✨ All' : CATEGORY_LABELS[cat as SkillCategory]}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillChip
                key={skill.id}
                skill={skill}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <p className="text-lg">No skills in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
