'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from 'lucide-react';
import React from 'react';
import type { Toast, ToastVariant } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-emerald-500/40 bg-emerald-950/90 text-white',
  error:   'border-red-500/40 bg-red-950/90 text-white',
  warning: 'border-amber-500/40 bg-amber-950/90 text-white',
  info:    'border-sky-500/40 bg-sky-950/90 text-white',
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
  error:   <XCircle className="w-4 h-4 text-red-400 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
  info:    <Info className="w-4 h-4 text-sky-400 shrink-0" />,
};

const progressColors: Record<ToastVariant, string> = {
  success: 'bg-emerald-400',
  error:   'bg-red-400',
  warning: 'bg-amber-400',
  info:    'bg-sky-400',
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'relative overflow-hidden rounded-xl border backdrop-blur-xl',
        'shadow-md max-w-sm w-full',
        variantStyles[toast.variant]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4">
        <span className="mt-0.5">{variantIcons[toast.variant]}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-100 leading-snug">
            {toast.message}
          </p>
          {toast.description && (
            <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800/50">
        <div
          className={cn('h-full toast-progress', progressColors[toast.variant])}
          style={{ animationDuration: `${toast.duration ?? 4000}ms` }}
        />
      </div>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
