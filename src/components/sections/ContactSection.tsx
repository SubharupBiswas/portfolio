'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  Twitter,
} from 'lucide-react';
import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { FadeUp } from '@/components/ui/AnimatedText';
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

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Github:   <Github className="w-5 h-5" />,
  Linkedin: <Linkedin className="w-5 h-5" />,
  Mail:     <Mail className="w-5 h-5" />,
  Twitter:  <Twitter className="w-5 h-5" />,
};

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
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

export function ContactSection() {
  const { bio, socialLinks } = usePortfolio();
  const { toasts, toast, dismiss } = useToast();
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);

    toast({
      message: 'Message sent! 🎉',
      description: "Thanks for reaching out. I'll get back to you shortly.",
      variant: 'success',
    });
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const inputClass = (field: keyof FormErrors) => cn(
    'w-full px-4 py-3 rounded-xl bg-zinc-800/60 border text-zinc-100 placeholder-zinc-600 text-sm',
    'focus:outline-none transition-all duration-200',
    errors[field]
      ? 'border-red-500/60 focus:border-red-500'
      : 'border-zinc-700/50 focus:border-indigo-500/60'
  );

  return (
    <section id="contact" className="section-padding relative">
      {/* Gradient orb */}
      <div
        aria-hidden
        className="orb w-80 h-80 -bottom-20 left-1/2 -translate-x-1/2 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* ─── Left: Info ────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <FadeUp>
              <div>
                <p className="section-eyebrow">
                  <span className="w-6 h-px bg-indigo-500" />
                  Get In Touch
                </p>
                <h2 className="section-title">
                  Let&apos;s build something{' '}
                  <span className="gradient-text">great together</span>
                </h2>
                <p className="section-subtitle mt-4">
                  Have a project in mind, a collaboration idea, or just want to say hi?
                  I&apos;m always open to interesting conversations.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${bio.email}`}
                  className="flex items-center gap-3 p-4 card-base card-hover group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors shrink-0">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono">Email</p>
                    <p className="text-sm font-medium text-zinc-200">{bio.email}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 ml-auto transition-colors" />
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-3">Find me on</p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target={link.url.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl glass border border-zinc-700/50 text-zinc-400
                                 hover:text-indigo-300 hover:border-indigo-500/40 transition-colors"
                    >
                      {SOCIAL_ICONS[link.icon] ?? null}
                    </motion.a>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ─── Right: Form ────────────────────────────────────────── */}
          <FadeUp delay={0.1} className="lg:col-span-3">
            <div className="card-base p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-semibold text-zinc-100">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-mono text-zinc-400 mb-1.5 block">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs font-mono text-zinc-400 mb-1.5 block">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="text-xs font-mono text-zinc-400 mb-1.5 block">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project collaboration, freelance work..."
                    className={inputClass('subject')}
                  />
                  {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs font-mono text-zinc-400 mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    className={cn(inputClass('message'), 'resize-none')}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

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
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </section>
  );
}
