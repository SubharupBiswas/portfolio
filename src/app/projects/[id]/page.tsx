import { ArrowLeft, CheckCircle2, Cpu, ExternalLink, Github, Layers, Shield, Terminal } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import defaultData from '@/data/portfolio.json';
import type { Project } from '@/types/portfolio';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return (defaultData.projects || []).map((project) => ({
    id: String(project.id),
  }));
}

export async function generateMetadata(props: ProjectDetailPageProps) {
  const { id } = await props.params;
  const project = defaultData.projects.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Case Study | Subharup.com`,
    description: project.description,
  };
}

export default async function ProjectDetailPage(props: ProjectDetailPageProps) {
  // Next.js 16 Async Request API
  const { id } = await props.params;
  const project = defaultData.projects.find((p) => p.id === id) as Project | undefined;

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-20 bg-slate-50 dark:bg-zinc-950">
        <div className="section-container">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-zinc-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Projects
          </Link>

          {/* Hero Header */}
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="tag tag-active">{project.category}</span>
              {project.featured && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-xs font-mono text-amber-800 dark:text-amber-300 font-semibold">
                  ⭐ Featured Case Study
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-400 font-mono">
                {project.tagline}
              </p>
            )}

            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github className="w-4 h-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
              {project.metrics.map((m) => (
                <div key={m.label} className="card-base p-5">
                  <p className="text-2xl sm:text-3xl font-extrabold text-sky-700 dark:text-sky-400 font-mono">
                    {m.value}
                  </p>
                  <p className="text-xs font-mono text-slate-500 dark:text-zinc-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Content Grid */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left 2 Cols: Technical Breakdown */}
            <div className="lg:col-span-2 space-y-10">

              {/* Problem & Solution */}
              {project.problemStatement && (
                <div className="card-base p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400">
                    <Terminal className="w-5 h-5" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Problem &amp; Challenge</h2>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed">
                    {project.problemStatement}
                  </p>

                  {project.solution && (
                    <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-200 mb-2">Technical Solution</h3>
                      <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Security Considerations */}
              {project.securityConsiderations && project.securityConsiderations.length > 0 && (
                <div className="card-base p-6 sm:p-8 border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-950/20">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mb-4">
                    <Shield className="w-5 h-5" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Security &amp; Hardening Considerations</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {project.securityConsiderations.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture & System Layout */}
              {project.architecture && (
                <div className="card-base p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400">
                    <Layers className="w-5 h-5" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">System Architecture</h2>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                    {project.architecture}
                  </p>

                  {/* Architecture Flow Diagram */}
                  <div className="card-base p-5 bg-slate-950 dark:bg-zinc-950 font-mono text-xs text-zinc-300 leading-relaxed border-slate-800 dark:border-zinc-800 mt-4 overflow-x-auto">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                      <span>[CLIENT ENGINE]</span>
                      <span>→ TLS 1.3 →</span>
                      <span>[API GATEWAY]</span>
                      <span>→</span>
                      <span>[DATA STORAGE]</span>
                    </div>
                    <p className="text-sky-400 font-semibold">WebCrypto AES-256-GCM / PBKDF2 HMAC-SHA256</p>
                    <p className="text-zinc-400 mt-1">Zero-Knowledge Blind Ciphertext Storage Engine</p>
                  </div>
                </div>
              )}

            </div>

            {/* Right 1 Col: Tech Stack & Key Features */}
            <div className="space-y-6">

              {/* Tech Stack Box */}
              <div className="card-base p-6 space-y-4">
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400">
                  <Cpu className="w-5 h-5" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">Technologies Used</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag tag-active px-3 py-1.5 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="card-base p-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-2">Key Features</h3>
                  <ul className="space-y-2">
                    {project.keyFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Back to Showcase button */}
              <div className="pt-2">
                <Link href="/projects" className="btn-secondary w-full justify-center">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Showcase
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
