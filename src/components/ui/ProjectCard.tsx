'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';
import type { Project } from '@/types/portfolio';
import { cn } from '@/lib/utils';

const CATEGORY_STYLES: Record<string, { headerBg: string; badge: string }> = {
  // Web
  'Web App': {
    headerBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    badge: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  },
  'Web Dev': {
    headerBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    badge: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  },
  // Security
  'Security': {
    headerBg: 'bg-red-50/80 dark:bg-red-950/30',
    badge: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-500/30',
  },
  'Cybersecurity': {
    headerBg: 'bg-red-50/80 dark:bg-red-950/30',
    badge: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-500/30',
  },
  // Systems
  'Systems': {
    headerBg: 'bg-sky-50/80 dark:bg-sky-950/30',
    badge: 'bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
  },
  'Open Source': {
    headerBg: 'bg-teal-50/80 dark:bg-teal-950/30',
    badge: 'bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-500/30',
  },
  'Other': {
    headerBg: 'bg-slate-100 dark:bg-zinc-800/40',
    badge: 'bg-slate-200 dark:bg-zinc-700/50 text-slate-800 dark:text-zinc-300 border-slate-300 dark:border-zinc-600',
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const categoryStyle = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.Other;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-base card-hover group flex flex-col overflow-hidden cursor-default h-full"
    >
      {/* Card header */}
      <div className={cn(
        'h-24 p-4 border-b border-slate-200 dark:border-zinc-800 flex items-start justify-between relative overflow-hidden',
        categoryStyle.headerBg
      )}>
        {/* Featured badge */}
        {project.featured ? (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-[10px] font-mono text-amber-800 dark:text-amber-300 font-semibold">
            ⭐ Featured
          </span>
        ) : <div />}
        <span className={cn(
          'text-[10px] font-mono font-semibold px-2 py-1 rounded-full border',
          categoryStyle.badge
        )}>
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <Link href={`/projects/${project.id}`} className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 leading-tight">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold mt-1">{project.tagline}</p>
          )}
        </Link>
        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag text-[10px]">{tech}</span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tag text-[10px] text-slate-500 dark:text-zinc-500">+{project.techStack.length - 5}</span>
          )}
        </div>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-slate-200 dark:border-zinc-800 mt-auto">
        <div className="flex items-center gap-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-1.5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              aria-label={`${project.title} GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-1.5 text-slate-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          Case Study <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
