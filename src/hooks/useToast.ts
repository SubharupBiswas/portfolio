'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timerRefs.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRefs.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    ({
      message,
      description,
      variant = 'info',
      duration = 4000,
    }: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, message, description, variant, duration }]);

      const timer = setTimeout(() => {
        dismiss(id);
      }, duration);
      timerRefs.current.set(id, timer);

      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    // cleanup on unmount
    const timers = timerRefs.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return { toasts, toast, dismiss };
}
