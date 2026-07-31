'use client';

import Image from 'next/image';
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

  const docAsset = certificate?.documentPath || certificate?.localAssetUrl;
  const isImageDoc = certificate?.imageUrl || (docAsset && (docAsset.endsWith('.png') || docAsset.endsWith('.jpg') || docAsset.endsWith('.jpeg')));

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

            {/* Certificate Hero Preview Box */}
            <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-900/90 border-b border-slate-800 flex items-center justify-center p-4">
              {isImageDoc ? (
                <Image
                  alt={certificate.title}
                  className="object-contain p-2"
                  fill
                  sizes="(max-width: 640px) 100vw, 480px"
                  src={certificate.imageUrl || docAsset!}
                />
              ) : docAsset ? (
                <iframe
                  src={`${docAsset}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={certificate.title}
                  className="w-full h-full rounded-lg border-0 pointer-events-none"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-sky-400">
                  <Award className="w-10 h-10" />
                  <span className="text-xs font-mono text-slate-400">Verified Credential</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-5">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400 mt-1 shrink-0" />
                  <div>
                    <h2 id="cert-modal-title" className="text-lg font-bold text-slate-900 dark:text-zinc-100 leading-tight">
                      {certificate.title}
                    </h2>
                    <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold mt-0.5">{certificate.issuer}</p>
                  </div>
                </div>

                {/* Tags */}
                {certificate.tags && certificate.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {certificate.tags.map((tag) => (
                      <span key={tag} className="bg-sky-50 dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-200/50 dark:border-sky-500/20 px-2.5 py-0.5 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                )}
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
                {(certificate.credentialUrl || certificate.url) && (
                  <a
                    href={certificate.credentialUrl || certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-xs flex-1 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Credential
                  </a>
                )}
                {docAsset && (
                  <a
                    href={docAsset}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-sky-500 transition-all flex-1 cursor-pointer"
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
