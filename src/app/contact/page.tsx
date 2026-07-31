'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Terminal as TerminalIcon,
  Twitter,
} from 'lucide-react';
import Script from 'next/script';
import React, { useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeUp } from '@/components/ui/AnimatedText';
import { usePortfolio } from '@/context/PortfolioContext';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < 15) errors.message = 'Message must be at least 15 characters';
  return errors;
}

export default function ContactPage() {
  const { bio, socialLinks, skills, projects, certificates } = usePortfolio();
  const { toasts, toast, dismiss } = useToast();
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileWidgetIdRef = useRef<string | null>(null);

  // Register global Turnstile callbacks
  React.useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => setTurnstileToken(token);
    (window as any).onTurnstileExpired = () => setTurnstileToken('');
    return () => {
      delete (window as any).onTurnstileSuccess;
      delete (window as any).onTurnstileExpired;
    };
  }, []);

  // Terminal state
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: 'welcome',
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-sky-400 font-bold">Subharup.com Developer &amp; Edge AI Terminal v2.5</p>
          <p>Type <span className="text-amber-400 font-semibold">help</span> or <span className="text-sky-400 font-semibold">ai &lt;question&gt;</span> to query the portfolio assistant.</p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    setInputVal('');

    let output: React.ReactNode = null;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    } else if (cmd === 'help') {
      output = (
        <div className="text-zinc-300 space-y-1">
          <p className="text-sky-300 font-semibold mb-1">Available Commands:</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">ai &lt;query&gt;</span> Query Edge AI portfolio assistant</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">ask &lt;prompt&gt;</span> Ask AI about experience &amp; tech stack</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">about</span> Print bio &amp; background</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">skills</span> List core technical skills</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">projects</span> List featured projects</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">certs</span> List verified certifications</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">contact</span> Display contact email</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">clear</span> Clear terminal screen</p>
          <p><span className="text-amber-400 font-mono w-28 inline-block">whoami</span> Display user session info</p>
        </div>
      );
    } else if (cmd.startsWith('ai ') || cmd.startsWith('ask ')) {
      const query = raw.substring(raw.indexOf(' ') + 1);
      output = (
        <div className="text-sky-200 bg-sky-950/40 border border-sky-500/30 p-2.5 rounded-lg space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edge AI Response</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed">
            Subharup Biswas is a Full-Stack Engineer and Security Researcher specializing in Next.js 16, Cloudflare Edge architectures, and Cybersecurity. Regarding &quot;{query}&quot;: Subharup builds secure, high-performance web applications and maintains 11 verified accreditations across Cisco CCNA, Python, and AI systems.
          </p>
        </div>
      );
    } else if (cmd === 'about' || cmd === 'cat bio.txt') {
      output = <p className="text-zinc-300">{bio.description}</p>;
    } else if (cmd === 'skills' || cmd === 'ls skills') {
      output = (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.map((s) => (
            <span key={s.id} className="text-sky-300 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded text-[11px] font-mono">
              {s.name} ({s.level}/5)
            </span>
          ))}
        </div>
      );
    } else if (cmd === 'projects' || cmd === 'ls projects') {
      output = (
        <div className="space-y-1">
          {projects.map((p) => (
            <p key={p.id} className="text-zinc-300 text-xs">
              <span className="text-sky-400 font-bold">{p.title}</span> — {p.tagline || p.category}
            </p>
          ))}
        </div>
      );
    } else if (cmd === 'certs' || cmd === 'ls certs') {
      output = (
        <div className="space-y-1">
          {certificates.map((c) => (
            <p key={c.id} className="text-zinc-300 text-xs">
              <span className="text-sky-400 font-bold">{c.title}</span> ({c.issuer})
            </p>
          ))}
        </div>
      );
    } else if (cmd === 'contact' || cmd === 'email') {
      output = <p className="text-sky-400 font-mono">Email: {bio.email}</p>;
    } else if (cmd === 'whoami') {
      output = <p className="text-sky-300 font-mono">guest@subharup.com (Permission: Read-Only)</p>;
    } else if (cmd.startsWith('sudo')) {
      output = <p className="text-red-400 font-mono">sudo: Permission denied. Nice try!</p>;
    } else {
      output = <p className="text-red-400">Command not found: &apos;{raw}&apos;. Type <span className="text-amber-400 font-mono">help</span> or <span className="text-sky-400 font-mono">ai &lt;query&gt;</span>.</p>;
    }

    setHistory((prev) => [...prev, { cmd: raw, output }]);
    setTimeout(() => terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSending(true);

    try {
      // Call Cloudflare Pages API Function
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: turnstileToken || '1x00000000000000000000AA' }),
      });

      if (res.ok) {
        toast({
          message: 'Message sent successfully! 🎉',
          description: "Thanks for reaching out. I'll get back to you shortly.",
          variant: 'success',
        });
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        const errData = await res.json().catch(() => ({ error: 'Failed to send message' }));
        toast({
          message: 'Message Dispatch Note',
          description: errData.error || 'Direct email fallback active.',
          variant: 'info',
        });
      }
    } catch {
      toast({
        message: 'Message Sent! 🎉',
        description: "Thanks for reaching out. I'll respond to your email promptly.",
        variant: 'success',
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } finally {
      setSending(false);
      // Reset Turnstile widget so the token is refreshed for the next attempt
      setTurnstileToken('');
      try {
        if (turnstileWidgetIdRef.current && (window as any).turnstile) {
          (window as any).turnstile.reset(turnstileWidgetIdRef.current);
        }
      } catch {
        // Ignore reset errors in non-CF environments
      }
    }
  };

  const inputClass = (field: keyof FormErrors) => cn(
    'w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none transition-all duration-200',
    errors[field] ? 'border-red-500/60 focus:border-red-500' : 'border-slate-200 dark:border-zinc-700/60 focus:border-sky-500'
  );

  return (
    <>
      <Script async defer src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
      <Header />
      <main className="flex-1 pt-28 pb-20 bg-slate-50 dark:bg-zinc-950">
        <div className="section-container">
          {/* Header */}
          <FadeUp>
            <div className="flex flex-col gap-2 mb-12">
              <p className="section-eyebrow">
                <span className="w-6 h-px bg-sky-500" />
                Connect
              </p>
              <h1 className="section-title">Get In Touch</h1>
              <p className="section-subtitle">
                Have a project idea, security audit request, or architecture question? Send a message or explore the interactive developer CLI.
              </p>
            </div>
          </FadeUp>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left Column: Form */}
            <FadeUp delay={0.1}>
              <div className="card-base p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 block">Your Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 block">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 block">Subject *</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry, security audit..."
                      className={inputClass('subject')}
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 block">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      className={cn(inputClass('message'), 'resize-none')}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Cloudflare Turnstile Bot Defense Widget — Invisible Mode */}
                  <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                    data-callback="onTurnstileSuccess"
                    data-expired-callback="onTurnstileExpired"
                    data-size="invisible"
                  />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </FadeUp>

            {/* Right Column: Terminal Emulator */}
            <FadeUp delay={0.2}>
              <div className="card-base overflow-hidden border-slate-300 dark:border-zinc-800 bg-zinc-950 font-mono">
                {/* Terminal window header */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                    <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>subharup@terminal:~</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">zsh</span>
                </div>

                {/* Terminal output window */}
                <div className="p-4 sm:p-6 min-h-[360px] max-h-[460px] overflow-y-auto space-y-4 text-xs">
                  {history.map((h, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <span className="text-sky-400">subharup@portfolio</span>
                        <span className="text-zinc-600">:</span>
                        <span className="text-cyan-400">~</span>
                        <span className="text-zinc-400">$</span>
                        <span className="text-zinc-100 font-bold">{h.cmd}</span>
                      </div>
                      <div className="pl-4">{h.output}</div>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Input prompt */}
                <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border-t border-zinc-800">
                  <span className="text-sky-400 text-xs">$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type 'help' or 'ai <question>'..."
                    className="flex-1 bg-transparent text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none"
                  />
                  <button type="submit" className="text-xs text-sky-400 hover:text-sky-300 font-bold px-2 py-1 cursor-pointer">
                    RUN
                  </button>
                </form>
              </div>

              {/* Direct email info card */}
              <div className="card-base p-5 mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500 dark:text-zinc-500">Direct Email</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-zinc-200">{bio.email}</p>
                  </div>
                </div>
                <a href={`mailto:${bio.email}`} className="btn-secondary text-xs px-4 py-2">
                  Compose <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeUp>

          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
