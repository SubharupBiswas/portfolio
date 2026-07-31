'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MousePointer2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { AnimatedText, LetterReveal } from '@/components/ui/AnimatedText';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Github:   <Github className="w-5 h-5" />,
  Linkedin: <Linkedin className="w-5 h-5" />,
  Mail:     <Mail className="w-5 h-5" />,
};

export function HeroSection() {
  const { bio, socialLinks } = usePortfolio();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── Background layers ────────────────────────────────────── */}
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      {/* Gradient orbs */}
      <div
        aria-hidden
        className="orb w-[600px] h-[600px] -top-32 -left-40 opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.3) 40%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="orb w-[500px] h-[500px] -bottom-40 -right-20 opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)',
        }}
      />

      {/* Radial vignette overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(9,9,11,0.85) 100%)',
        }}
      />

      {/* ─── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 section-container flex flex-col items-center text-center gap-8 pt-24 pb-16">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {bio.availableForWork && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/25 text-xs font-mono text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              {bio.availabilityLabel}
            </div>
          )}
        </motion.div>

        {/* Main heading */}
        <div className="flex flex-col items-center gap-3 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none">
            <LetterReveal
              text={`Hi, I'm ${bio.name}`}
              className="text-zinc-100"
              delay={0.2}
            />
          </h1>

          {/* Animated role titles */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">
            <span className="text-zinc-500">I&apos;m a{' '}</span>
            <AnimatedText
              texts={bio.roles}
              interval={2600}
              className="gradient-text"
            />
          </p>
        </div>

        {/* Bio description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl"
        >
          {bio.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="btn-primary group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="btn-secondary"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex items-center gap-3"
        >
          {socialLinks.slice(0, 3).map((link) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target={link.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={link.platform}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl glass border border-zinc-700/50 text-zinc-400 hover:text-indigo-300 hover:border-indigo-500/40 transition-colors"
            >
              {SOCIAL_ICONS[link.icon] ?? null}
            </motion.a>
          ))}
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-xs font-mono text-zinc-600"
        >
          📍 {bio.location}
        </motion.p>
      </div>

      {/* ─── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MousePointer2 className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
