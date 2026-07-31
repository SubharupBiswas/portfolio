'use client';

import { motion } from 'framer-motion';
import { Code2, MapPin, Shield, Zap } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { FadeUp } from '@/components/ui/AnimatedText';

const STATS = [
  { icon: <Code2 className="w-5 h-5" />, value: '50+', label: 'Projects Built' },
  { icon: <Shield className="w-5 h-5" />, value: '9+', label: 'Certifications' },
  { icon: <Zap className="w-5 h-5" />, value: '5+', label: 'Years Experience' },
];

export function AboutSection() {
  const { bio } = usePortfolio();

  return (
    <section id="about" className="section-padding relative">
      {/* Subtle top gradient */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-indigo-500/30"
      />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ─── Text Column ────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0}>
              <div className="flex flex-col gap-4">
                <p className="section-eyebrow">
                  <span className="w-6 h-px bg-indigo-500" />
                  About Me
                </p>
                <h2 className="section-title">
                  Crafting code that&apos;s{' '}
                  <span className="gradient-text">both secure</span>
                  <br className="hidden sm:block" />
                  {' '}and beautiful
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-zinc-400 leading-relaxed text-base sm:text-lg">
                {bio.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-zinc-400 leading-relaxed">
                When I&apos;m not building production systems, I&apos;m probably deep in a 
                CTF challenge, contributing to open-source security tools, or exploring
                the intersection of AI and cybersecurity.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>{bio.location}</span>
              </div>
            </FadeUp>
          </div>

          {/* ─── Stats Column ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {STATS.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="card-base card-hover p-6 flex items-center gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    {stat.icon}
                  </div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-3xl font-bold gradient-text-indigo"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-zinc-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              </FadeUp>
            ))}

            {/* Code snippet card */}
            <FadeUp delay={0.3}>
              <div className="card-base p-5 font-mono text-xs leading-relaxed">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-zinc-600">profile.ts</span>
                </div>
                <div className="space-y-1">
                  <p><span className="text-purple-400">const</span> <span className="text-cyan-400">subharup</span> <span className="text-zinc-500">= {'{'}</span></p>
                  <p className="pl-4"><span className="text-indigo-300">role</span><span className="text-zinc-500">:</span> <span className="text-emerald-400">&quot;Full-Stack Dev &amp; Security Researcher&quot;</span><span className="text-zinc-500">,</span></p>
                  <p className="pl-4"><span className="text-indigo-300">passion</span><span className="text-zinc-500">:</span> <span className="text-emerald-400">&quot;Secure, Scalable Systems&quot;</span><span className="text-zinc-500">,</span></p>
                  <p className="pl-4"><span className="text-indigo-300">available</span><span className="text-zinc-500">:</span> <span className="text-amber-400">true</span><span className="text-zinc-500">,</span></p>
                  <p><span className="text-zinc-500">{'}'}</span></p>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
