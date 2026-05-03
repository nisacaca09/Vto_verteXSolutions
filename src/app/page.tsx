"use client";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor, Smartphone, Cloud, Palette, ChevronRight, ArrowRight,
  Building2, Landmark, HeartPulse, ShoppingCart, GraduationCap, Factory,
  Code2, Users, FolderKanban, Trophy
} from "lucide-react";

const services = [
  { icon: Monitor, title: "Full Stack Development", desc: "Solusi end-to-end dengan Java, Angular & PostgreSQL untuk sistem enterprise yang tangguh.", color: "var(--vto-primary)" },
  { icon: Smartphone, title: "Android Development", desc: "Aplikasi mobile native dengan Kotlin/Java dan arsitektur modern yang scalable.", color: "var(--vto-success)" },
  { icon: Cloud, title: "DevOps Solutions", desc: "CI/CD, containerization, dan cloud infrastructure untuk deployment yang efisien.", color: "var(--vto-cta)" },
  { icon: Palette, title: "UI/UX Design", desc: "Design thinking, wireframe, prototype, dan design system yang user-centered.", color: "var(--vto-purple)" },
];

const stats = [
  { num: "120+", label: "Projects Delivered", icon: FolderKanban },
  { num: "50+", label: "Enterprise Clients", icon: Building2 },
  { num: "35+", label: "Expert Engineers", icon: Users },
  { num: "8+", label: "Years Experience", icon: Trophy },
];

const industries = [
  { icon: Landmark, label: "Banking & Finance" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Building2, label: "Government" },
  { icon: ShoppingCart, label: "Retail & E-Commerce" },
  { icon: GraduationCap, label: "Education" },
  { icon: Factory, label: "Manufacturing" },
];

const clients = ["PT Bank Nusantara", "RS Medika Utama", "Kementerian KOMINFO", "TokoBesar.id", "EduPlatform", "IndustriTech Corp"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern" />
        {/* Gradient orb */}
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--vto-primary)] opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[var(--vto-cta)] opacity-[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-4 py-1.5 mb-6">
              <div className="h-2 w-2 rounded-full bg-[var(--vto-success)] animate-pulse" />
              <span className="text-[10px] font-mono text-[var(--vto-text-muted)] tracking-wider">IT CONSULTANT PARTNER</span>
            </div>
            <h1 className="font-sans text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Solusi Teknologi untuk
              <br />
              <span className="bg-gradient-to-r from-[var(--vto-primary)] via-[var(--vto-secondary)] to-[var(--vto-cta)] bg-clip-text text-transparent">
                Transformasi Digital
              </span>
              <br />
              Bisnis Anda
            </h1>
            <p className="mt-6 max-w-2xl text-sm font-mono leading-relaxed text-[var(--vto-text-muted)]">
              VTO (verTexsOlution) adalah mitra teknologi terpercaya yang membantu perusahaan membangun solusi software enterprise, aplikasi mobile, dan infrastruktur cloud yang inovatif.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-6 py-3 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_30px_var(--vto-cta-glow)] cursor-pointer">
                Konsultasi Gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-lg border border-[var(--vto-border)] px-6 py-3 text-sm font-sans text-[var(--vto-text-muted)] transition-all hover:border-[var(--vto-primary)] hover:text-white cursor-pointer">
                Lihat Portfolio <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Tech badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 flex flex-wrap gap-3">
            {["Java", "Angular", "PostgreSQL", "Kotlin", "Docker", "Kubernetes", "AWS", "Figma"].map((t, i) => (
              <span key={t} className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-3 py-1.5 text-[10px] font-mono text-[var(--vto-text-dim)] transition-all hover:border-[var(--vto-primary)] hover:text-[var(--vto-primary)]">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto mb-3 h-6 w-6 text-[var(--vto-primary)]" />
                <div className="font-sans text-3xl font-bold text-white text-glow-blue">{s.num}</div>
                <div className="mt-1 text-[10px] font-mono tracking-wider text-[var(--vto-text-dim)] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Our Expertise</span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-white sm:text-4xl">Layanan Kami</h2>
            <p className="mt-4 max-w-xl mx-auto text-sm font-mono text-[var(--vto-text-muted)]">Empat divisi utama yang siap membantu transformasi digital bisnis Anda</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6 transition-all duration-300 hover:border-transparent"
                style={{ ['--card-color' as string]: s.color }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(${s.color}11, transparent)` }} />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${s.color}15`, border: `1px solid ${s.color}33` }}>
                    <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-xs font-mono leading-relaxed text-[var(--vto-text-dim)]">{s.desc}</p>
                  <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-xs font-mono transition-colors cursor-pointer" style={{ color: s.color }}>
                    Pelajari <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Industries</span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-white sm:text-4xl">Industri yang Kami Layani</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((ind) => (
              <div key={ind.label} className="flex flex-col items-center gap-3 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg)] p-6 transition-all hover:border-[var(--vto-primary)] hover:bg-[var(--vto-primary)]/5">
                <ind.icon className="h-8 w-8 text-[var(--vto-primary)]" />
                <span className="text-[11px] font-mono text-center text-[var(--vto-text-muted)]">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Trusted By</span>
            <h2 className="mt-3 font-sans text-2xl font-bold text-white">Klien & Partner</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {clients.map((c) => (
              <div key={c} className="flex h-20 items-center justify-center rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-4 transition-all hover:border-[var(--vto-primary)]/30">
                <span className="text-xs font-sans font-semibold text-[var(--vto-text-dim)] text-center">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--vto-primary)]/10 via-transparent to-[var(--vto-cta)]/10" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-sans text-3xl font-bold text-white sm:text-4xl">Siap Memulai Proyek Anda?</h2>
          <p className="mt-4 text-sm font-mono text-[var(--vto-text-muted)]">Konsultasikan kebutuhan teknologi bisnis Anda dengan tim expert kami. Gratis, tanpa komitmen.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-8 py-3.5 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_30px_var(--vto-cta-glow)] cursor-pointer">
              Hubungi Kami <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
