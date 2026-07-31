'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  FileText,
  Hash,
  Shield,
  X,
} from 'lucide-react';
import type { Certificate } from '@/types/portfolio';
import { formatDate } from '@/lib/utils';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  // ESC key handler
  useEffect(() => {
    if (!certificate) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [certificate, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [certificate]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={(e: React.MouseEvent) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close certificate modal"
              className="absolute top-4 right-4 z-10 p-2 rounded-xl text-slate-500 dark:text-zinc-400
                         hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200/80 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate image or placeholder */}
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-zinc-900">
              {certificate.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/40 dark:to-teal-950/30">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <Award className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-mono text-slate-500 dark:text-zinc-500">Certificate Preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-5">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h2 id="cert-modal-title" className="text-lg font-bold text-slate-900 dark:text-zinc-100 leading-tight">
                      {certificate.title}
                    </h2>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">{certificate.issuer}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {certificate.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-100 dark:bg-zinc-800/60 rounded-xl p-3">
                  <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Issue Date
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-zinc-200">
                    {formatDate(certificate.issueDate)}
                  </p>
                </div>
                <div className="bg-slate-100 dark:bg-zinc-800/60 rounded-xl p-3">
                  <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Expiry
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-zinc-200">
                    {certificate.expiryDate ? formatDate(certificate.expiryDate) : 'No Expiry'}
                  </p>
                </div>
              </div>

              {certificate.credentialId && (
                <div className="bg-slate-100 dark:bg-zinc-800/60 rounded-xl p-3">
                  <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 mb-1 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> Credential ID
                  </p>
                  <p className="text-sm font-mono text-slate-800 dark:text-zinc-300 break-all">{certificate.credentialId}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                {certificate.url && (
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center flex-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Credential
                  </a>
                )}
                {certificate.localAssetUrl && (
                  <a
                    href={certificate.localAssetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary justify-center flex-1"
                  >
                    <FileText className="w-4 h-4" />
                    View Document
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
