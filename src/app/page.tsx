'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Leaf,
  PenTool,
  Zap,
  Clock,
  Shield,
  ArrowRight,
  Mail,
  MessageSquare,
  FileText,
  Megaphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: PenTool,
    title: 'Multiple Content Types',
    description:
      'Blog posts, emails, social media captions, product descriptions, ad copy, and custom prompts.',
  },
  {
    icon: Zap,
    title: 'Real-time Streaming',
    description:
      'Watch your content generate word by word with Gemini AI — fast, natural, and engaging.',
  },
  {
    icon: Clock,
    title: 'Save & Organize',
    description:
      'Keep all your generated content in one place. Search, filter, and revisit anytime.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Built on Supabase with row-level security. Your content stays yours.',
  },
];

const contentTypes = [
  {
    icon: FileText,
    label: 'Blog Posts',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Mail,
    label: 'Emails',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    label: 'Social Media',
    color: 'from-emerald-400 to-green-500',
  },
  {
    icon: Megaphone,
    label: 'Ad Copy',
    color: 'from-green-500 to-emerald-600',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-bg shadow-sm shadow-emerald-500/20">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ContentStudio</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-visible">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/15 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px]" />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border bg-card-light dark:bg-card-dark px-4 py-1.5 text-sm mb-6"
          >
            <Leaf className="h-3.5 w-3.5 text-emerald-500" />
            Powered by Gemini AI
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
          >
            Create stunning content{' '}
            <span className="gradient-text">in seconds</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-10"
          >
            ContentStudio is your AI-powered writing assistant. Generate blog
            posts, emails, social media captions, and more — with the perfect
            tone for your audience.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg">
                Start Creating — It&apos;s Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Content type pills */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            {contentTypes.map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${type.color}`}
                >
                  <type.icon className="h-3.5 w-3.5 text-white" />
                </div>
                {type.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to create
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-lg mx-auto">
              Powerful features designed to make content creation effortless and
              enjoyable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 mb-4">
                  <feature.icon className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Three steps to great content
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              It&apos;s as simple as choose, customize, and generate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose your type',
                description:
                  'Select from blog posts, emails, social media captions, and more.',
              },
              {
                step: '02',
                title: 'Set the details',
                description:
                  'Pick the tone, length, and add context for the perfect result.',
              },
              {
                step: '03',
                title: 'Generate & use',
                description:
                  'Watch AI create your content in real-time. Copy, save, or regenerate.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-bg text-white font-bold text-sm mb-4 shadow-md shadow-emerald-500/20">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center rounded-3xl gradient-bg p-12 relative overflow-hidden shadow-2xl shadow-emerald-500/20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to create amazing content?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join ContentStudio today and transform the way you write. No
              credit card required.
            </p>
            <Link href="/signup">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-emerald-600 hover:bg-white/90 border-0"
              >
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">ContentStudio</span>
          </div>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            Built with Next.js, Tailwind CSS, and Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
