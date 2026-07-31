'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Code2,
  ExternalLink,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedText, FadeUp, LetterReveal } from '@/components/ui/AnimatedText';
import { usePortfolio } from '@/context/PortfolioContext';
import { ProjectCard } from '@/components/ui/ProjectCard';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Github: <Github className="w-5 h-5" />,
  Linkedin: <Linkedin className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Credly: <Award className="w-5 h-5" />,
};

const HERO_ROLES = [
  'Full-Stack Engineer',
  'Security Researcher',
  'Systems Architect',
  'Open Source Contributor',
];

export default function Home() {
  const { bio, skills, certificates, projects, socialLinks } = usePortfolio();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredSkills = skills.slice(0, 8);

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-200">

        {/* ─── Hero Section ─────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[85dvh] bg-gradient-to-b from-slate-100/80 via-slate-50 to-slate-50 dark:from-zinc-900/60 dark:via-zinc-950 dark:to-zinc-950">

          {/* Subtle Ambient Lighting Blobs */}
          <div
            aria-hidden
            className="orb w-[500px] h-[500px] -top-32 -left-40 opacity-20 dark:opacity-15"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(13,148,136,0.15) 50%, transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="orb w-[450px] h-[450px] -bottom-40 -right-20 opacity-15 dark:opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(16,185,129,0.15) 50%, transparent 70%)',
            }}
          />

          <div className="relative z-10 section-container flex flex-col items-center text-center gap-8">
            {/* Avatar & Status Pulse Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-full bg-sky-500/30 dark:bg-sky-500/20 blur-sm group-hover:bg-sky-500/40 transition duration-300" />
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-2 ring-sky-500/50 shadow-md bg-slate-100 dark:bg-zinc-900">
                <Image
                  src="/dp.png"
                  alt={bio.name}
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 112px, 144px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {bio.availableForWork && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-sky-500/40 text-[11px] font-mono text-sky-800 dark:text-sky-300 shadow-xs whitespace-nowrap">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                  </span>
                  {bio.availabilityLabel}
                </div>
              )}
            </motion.div>

            {/* Headline */}
            <div className="flex flex-col items-center gap-3 max-w-4xl pt-2">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4 text-balance">
                Hi, I&apos;m{' '}
                <span className="inline-block whitespace-nowrap text-slate-900 dark:text-white">
                  Subharup Biswas
                </span>
              </h1>

              {/* Hydration-safe Role Switcher */}
              <div className="text-xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed flex items-center justify-center gap-2">
                <span className="text-slate-500 dark:text-zinc-400">I&apos;m a</span>
                <AnimatedText
                  texts={HERO_ROLES}
                  interval={2600}
                  className="text-sky-600 dark:text-sky-400 font-bold"
                />
              </div>
            </div>

            {/* Bio description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
            >
              {bio.description}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/projects" className="btn-primary group">
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </motion.div>

            {/* Social quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-3 pt-2"
            >
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="p-3 rounded-xl glass border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {SOCIAL_ICONS[link.icon] ?? null}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Asymmetric Bento Grid ─────────────────────────────────────── */}
        <section className="py-16 relative bg-slate-50 dark:bg-zinc-950">
          <div className="section-container">
            <FadeUp>
              <div className="flex flex-col gap-2 mb-10 text-center sm:text-left">
                <p className="section-eyebrow justify-center sm:justify-start">
                  <span className="w-6 h-px bg-sky-500" />
                  Overview
                </p>
                <h2 className="section-title">Bento Highlights</h2>
                <p className="section-subtitle">
                  Key snapshots of my technical background, verified credentials, and software projects.
                </p>
              </div>
            </FadeUp>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

              {/* Tile 1: Profile Card */}
              <FadeUp delay={0.1} className="lg:col-span-2">
                <div className="card-base card-hover p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-sky-500/40 shrink-0">
                      <Image
                        src="/dp.png"
                        alt={bio.name}
                        fill
                        priority
                        loading="eager"
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                        {bio.name}
                        <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      </h3>
                      <p className="text-xs font-mono text-sky-700 dark:text-sky-400 font-semibold mt-0.5">{bio.tagline}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-zinc-400 mt-2 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>{bio.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed my-5">
                    Security researcher and full-stack engineer passionate about cloud architecture, digital forensics, and high-performance modern web apps.
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-500">📍 Available Worldwide</span>
                    <Link href="/contact" className="text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1">
                      Contact <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeUp>

              {/* Tile 2: Credentials Snapshot */}
              <FadeUp delay={0.15} className="md:col-span-1 lg:col-span-1">
                <Link href="/certificates" className="block h-full">
                  <div className="card-base card-hover p-6 h-full flex flex-col justify-between relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-700 dark:text-sky-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-zinc-600 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="my-4">
                      <p className="text-4xl font-extrabold text-slate-900 dark:text-zinc-100">
                        {certificates.length}+
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-zinc-200 mt-1">Verified Credentials</p>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">CCNA, Python Essentials, AI &amp; Data Science</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-sky-700 dark:text-sky-400 group-hover:underline">
                      <span>Explore Vault</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </FadeUp>

              {/* Tile 3: Stats Summary */}
              <FadeUp delay={0.2} className="md:col-span-1 lg:col-span-1">
                <div className="card-base p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-700 dark:text-sky-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-500/30 px-2 py-0.5 rounded-full font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="my-4 space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100">{projects.length}+ Featured Projects</p>
                      <p className="text-xs text-slate-600 dark:text-zinc-400">Open source &amp; enterprise systems</p>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-600 dark:bg-sky-500 h-full w-[85%]" />
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                    Next.js 16 · React 19 · Python · Go
                  </p>
                </div>
              </FadeUp>

              {/* Tile 4: Core Tech Stack Radar */}
              <FadeUp delay={0.25} className="md:col-span-2 lg:col-span-2">
                <div className="card-base card-hover p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Core Stack Radar</h3>
                    </div>
                    <Link href="/skills" className="text-xs font-mono text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1">
                      View Skills ({skills.length}) <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2 my-2">
                    {featuredSkills.map((sk) => (
                      <span key={sk.id} className="tag tag-active text-xs">
                        {sk.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-3">
                    Web engineering, cloud orchestration, digital forensics &amp; security auditing.
                  </p>
                </div>
              </FadeUp>

              {/* Tile 5: Featured Showcase Teaser */}
              <FadeUp delay={0.3} className="md:col-span-1 lg:col-span-2">
                <Link href="/projects" className="block h-full">
                  <div className="card-base card-hover p-6 h-full flex flex-col justify-between group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                        <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">⭐ Featured Project</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 dark:text-zinc-500 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                        {projects[0]?.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 line-clamp-2">
                        {projects[0]?.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800">
                      {projects[0]?.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="tag text-[10px]">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ─── Featured Showcase Section ─────────────────────────────────── */}
        <section className="py-20 bg-slate-100/70 dark:bg-zinc-900/40 border-y border-slate-200 dark:border-zinc-800 relative">
          <div className="section-container">
            <FadeUp>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="section-eyebrow">
                    <span className="w-6 h-px bg-sky-500" />
                    Portfolio Showcase
                  </p>
                  <h2 className="section-title">Featured Projects</h2>
                  <p className="section-subtitle">
                    Select case studies highlighting system design, cryptography, and full-stack software.
                  </p>
                </div>
                <Link href="/projects" className="btn-secondary shrink-0">
                  All Projects ({projects.length})
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Banner ───────────────────────────────────────────────── */}
        <section className="py-20 relative bg-slate-50 dark:bg-zinc-950">
          <div className="section-container">
            <FadeUp>
              <div className="rounded-3xl bg-slate-900 dark:bg-zinc-900 border border-slate-800 dark:border-zinc-800 p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Have a project in mind?
                  </h2>
                  <p className="text-base sm:text-lg text-slate-300 dark:text-zinc-400 max-w-xl mx-auto">
                    I&apos;m available for freelance development, security audits, and systems architecture consulting.
                  </p>
                  <div className="pt-4">
                    <Link href="/contact" className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-sky-500/20">
                      Get In Touch
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}