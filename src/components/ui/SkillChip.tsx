'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Skill } from '@/types/portfolio';
import { cn } from '@/lib/utils';

interface SkillChipProps {
  skill: Skill;
  isEditMode?: boolean;
  onDelete?: (id: string) => void;
}

export function SkillChip({ skill, isEditMode, onDelete }: SkillChipProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className={cn(
        'relative group card-base p-3.5 flex flex-col justify-between gap-2.5 transition-all duration-200',
        'hover:border-emerald-500/50 hover:shadow-xs'
      )}
    >
      {/* Delete trigger in edit mode */}
      {isEditMode && onDelete && (
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete(skill.id);
          }}
          aria-label={`Delete ${skill.name}`}
          className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Skill Name */}
      <div className="flex items-center justify-between gap-1.5">
        <span className="text-xs font-bold text-slate-800 dark:text-zinc-100 truncate">
          {skill.name}
        </span>
      </div>

      {/* 5-dot level meter */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-1">
          {([1, 2, 3, 4, 5] as const).map((dot) => (
            <span
              key={dot}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors duration-300',
                dot <= skill.level
                  ? 'bg-emerald-600 dark:bg-emerald-400'
                  : 'bg-slate-200 dark:bg-zinc-800'
              )}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500">
          {skill.level}/5
        </span>
      </div>
    </motion.div>
  );
}
