'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Hash } from 'lucide-react';
import type { Certificate } from '@/types/portfolio';
import { cn, formatDate } from '@/lib/utils';

const CATEGORY_STYLES: Record<string, { badge: string; icon: string }> = {
  'Cybersecurity & Forensics': {
    badge: 'bg-red-50 dark:bg-red-500/15 text-red-800 dark:text-red-300 border-red-200 dark:border-red-500/30',
    icon: 'text-red-700 dark:text-red-400',
  },
  'Cybersecurity': {
    badge: 'bg-red-50 dark:bg-red-500/15 text-red-800 dark:text-red-300 border-red-200 dark:border-red-500/30',
    icon: 'text-red-700 dark:text-red-400',
  },
  'Cloud & Systems': {
    badge: 'bg-sky-50 dark:bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
    icon: 'text-sky-700 dark:text-sky-400',
  },
  'Professional Certifications': {
    badge: 'bg-teal-50 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-500/30',
    icon: 'text-teal-700 dark:text-teal-400',
  },
};

interface CertificateCardProps {
  certificate: Certificate;
  onClick: () => void;
}

export function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  const style = CATEGORY_STYLES[certificate.category] ?? {
    badge: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
    icon: 'text-emerald-700 dark:text-emerald-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="card-base card-hover p-5 flex flex-col gap-4 cursor-pointer group h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onClick()}
      aria-label={`View ${certificate.title} certificate`}
    >
      {/* Top row: icon + category badge */}
      <div className="flex items-start justify-between gap-3">
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors',
          'bg-slate-100 dark:bg-zinc-800/80 border-slate-200 dark:border-zinc-700/60 group-hover:border-emerald-500/40'
        )}>
          <Award className={cn('w-5 h-5', style.icon)} />
        </div>
        <span className={cn(
          'text-[10px] font-mono font-semibold px-2 py-1 rounded-full border shrink-0',
          style.badge
        )}>
          {certificate.category === 'Cybersecurity & Forensics' ? '🛡️ Security' :
            certificate.category === 'Cloud & Systems' ? '☁️ Cloud' : '📜 Cert'}
        </span>
      </div>

      {/* Title + Issuer */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 leading-snug mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-2">
          {certificate.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">{certificate.issuer}</p>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-200 dark:border-zinc-800 mt-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400">
          <Calendar className="w-3 h-3 shrink-0" />
          <span>Issued {formatDate(certificate.issueDate)}</span>
          {certificate.expiryDate && (
            <span className="text-slate-400 dark:text-zinc-500">· Exp. {formatDate(certificate.expiryDate)}</span>
          )}
        </div>
        {certificate.credentialId && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            <Hash className="w-3 h-3 shrink-0" />
            <span className="truncate">{certificate.credentialId}</span>
          </div>
        )}
      </div>

      {/* View indicator */}
      <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-zinc-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-medium">
        <ExternalLink className="w-3 h-3" />
        <span>View Credential</span>
      </div>
    </motion.div>
  );
}
