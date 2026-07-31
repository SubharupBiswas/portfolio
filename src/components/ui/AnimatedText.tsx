'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState, type ReactNode } from 'react';

interface AnimatedTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

const EASE_CUSTOM = [0.22, 1, 0.36, 1] as const;

export function AnimatedText({
  texts,
  interval = 2800,
  className = '',
}: AnimatedTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i: number) => (i + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  if (!texts || texts.length === 0) return null;

  return (
    <span className={`inline-block text-sky-600 dark:text-sky-400 font-bold ${className}`} aria-live="polite">
      {texts[index]}
    </span>
  );
}

/* ─── Letter-by-letter reveal (Hydration Safe) ───────────────────── */
interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function LetterReveal({ text, className = '', delay = 0 }: LetterRevealProps) {
  const letters = text.split('');

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: EASE_CUSTOM,
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Fade-up section entry ───────────────────────────────────────── */
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: EASE_CUSTOM }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ───────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_CUSTOM } },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
