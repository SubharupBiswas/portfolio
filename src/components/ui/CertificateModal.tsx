'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Hash,
  Shield,
  ShieldCheck,
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

  // Track which certificate's ID was copied so the state resets automatically when switching certificates
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copied = !!certificate && copiedId === certificate.id;

  // Auto-hide the "Copied!" tooltip after 2 seconds
  useEffect(() => {
    if (!copiedId) return;
    const timer = setTimeout(() => setCopiedId(null), 2000);
    return () => clearTimeout(timer);
  }, [copiedId]);

  const handleCopyId = async () => {
    if (!certificate?.credentialId) return;
    try {
      await navigator.clipboard.writeText(certificate.credentialId);
      setCopiedId(certificate.id);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); fail silently
    }
  };

  const docAsset = certificate?.pdfUrl || certificate?.documentPath || certificate?.localAssetUrl;
  const imageAsset =
    certificate?.image ||
    certificate?.imageUrl ||
    (docAsset && /\.(png|jpe?g|svg|webp)$/i.test(docAsset) ? docAsset : undefined);

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
            className="relative w-full max-w-lg max-h-[90vh] flex flex-col glass-strong rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close certificate modal"
              className="absolute top-2 right-2 z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl text-slate-500 dark:text-zinc-400
                         hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200/80 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Hero Preview Box */}
            <div className="relative shrink-0 w-full h-48 sm:h-56 rounded-t-2xl overflow-hidden bg-slate-900 border-b border-slate-800 flex flex-col items-center justify-center p-6 text-center group">
              {imageAsset ? (
                <a
                  href={docAsset || imageAsset}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${certificate.title} in a new tab`}
                  className="absolute inset-0 block cursor-zoom-in focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset"
                >
                  <Image
                    alt={certificate.title}
                    className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    src={imageAsset}
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-slate-200 opacity-80 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 animate-pulse group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold block mb-1">
                      {certificate.issuer}
                    </span>
                    <h4 className="text-sm font-bold text-white max-w-xs line-clamp-1">
                      {certificate.title}
                    </h4>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-5 overflow-y-auto">
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
                <div className="flex items-center justify-between gap-3 bg-slate-100 dark:bg-zinc-800/60 rounded-xl p-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 mb-1 flex items-center gap-1">
                      <Hash className="w-3 h-3" /> Credential ID
                    </p>
                    <p className="text-sm font-mono text-slate-800 dark:text-zinc-300 break-all">{certificate.credentialId}</p>
                  </div>
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyId}
                      aria-label={copied ? 'Credential ID copied' : 'Copy credential ID'}
                      className="inline-flex items-center justify-center gap-1.5 min-h-12 min-w-12 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all active:scale-95 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-sky-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          role="status"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -top-9 right-0 whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] font-semibold shadow-lg pointer-events-none"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                {(certificate.credentialUrl || certificate.url) && (
                  <a
                    href={certificate.credentialUrl || certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-12 rounded-xl font-semibold text-xs bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-xs flex-1 cursor-pointer"
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-12 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-sky-500 transition-all flex-1 cursor-pointer"
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
