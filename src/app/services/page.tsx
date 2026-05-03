"use client";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Smartphone, Cloud, Palette, Check, ArrowRight, Code2, Database, Layout, Terminal, Cpu, GitBranch, Container, Server, Layers, MousePointer, PenTool } from "lucide-react";

const divisions = [
  {
    id: "fullstack",
    icon: Monitor,
    title: "Full Stack Development",
    subtitle: "Enterprise-grade web applications",
    color: "var(--vto-primary)",
    desc: "Tim Full Stack kami membangun aplikasi web enterprise yang robust menggunakan teknologi terdepan. Dari backend yang scalable hingga frontend yang responsif, kami menangani seluruh stack.",
    techs: [
      { icon: Code2, name: "Java (Spring Boot)", desc: "Backend framework untuk enterprise" },
      { icon: Layout, name: "Angular", desc: "Frontend framework yang powerful" },
      { icon: Database, name: "PostgreSQL", desc: "Database relasional yang handal" },
      { icon: Terminal, name: "REST & GraphQL API", desc: "API design modern" },
    ],
    features: ["Microservices Architecture", "API Development & Integration", "Database Design & Optimization", "Real-time Applications", "Authentication & Security", "Performance Optimization"],
  },
  {
    id: "android",
    icon: Smartphone,
    title: "Android Development",
    subtitle: "Native mobile applications",
    color: "var(--vto-success)",
    desc: "Kami membangun aplikasi Android native yang performant dan user-friendly. Dengan pendekatan modern architecture pattern, aplikasi kami siap untuk jutaan pengguna.",
    techs: [
      { icon: Code2, name: "Kotlin & Java", desc: "Bahasa utama Android" },
      { icon: Database, name: "Firebase", desc: "Backend-as-a-Service" },
      { icon: Layout, name: "Jetpack Compose", desc: "Modern UI toolkit" },
      { icon: Layers, name: "Material Design 3", desc: "Design system Google" },
    ],
    features: ["Native Android Development", "MVVM & Clean Architecture", "Push Notifications", "Offline-First Approach", "Payment Integration", "App Store Optimization"],
  },
  {
    id: "devops",
    icon: Cloud,
    title: "DevOps Solutions",
    subtitle: "Infrastructure & automation",
    color: "var(--vto-cta)",
    desc: "Tim DevOps kami mengotomasi pipeline deployment, mengelola cloud infrastructure, dan memastikan sistem Anda berjalan 24/7 dengan high availability.",
    techs: [
      { icon: Container, name: "Docker & Kubernetes", desc: "Containerization & orchestration" },
      { icon: GitBranch, name: "CI/CD Pipeline", desc: "Jenkins, GitLab CI, GitHub Actions" },
      { icon: Server, name: "AWS / GCP / Azure", desc: "Multi-cloud strategy" },
      { icon: Cpu, name: "Monitoring & Logging", desc: "Prometheus, Grafana, ELK" },
    ],
    features: ["Infrastructure as Code (Terraform)", "Automated Testing & Deployment", "Container Orchestration", "Cloud Migration Strategy", "24/7 Monitoring & Alerting", "Disaster Recovery Planning"],
  },
  {
    id: "uiux",
    icon: Palette,
    title: "UI/UX Design",
    subtitle: "User-centered design solutions",
    color: "var(--vto-purple)",
    desc: "Divisi Design kami menciptakan pengalaman digital yang intuitif dan indah. Dari riset user hingga design system, kami memastikan setiap pixel bermakna.",
    techs: [
      { icon: MousePointer, name: "User Research", desc: "Interview, survey, usability testing" },
      { icon: PenTool, name: "Figma & Sketch", desc: "Design & prototyping tools" },
      { icon: Layers, name: "Design System", desc: "Scalable component library" },
      { icon: Layout, name: "Responsive Design", desc: "Multi-device optimization" },
    ],
    features: ["UX Research & Strategy", "Wireframing & Prototyping", "Visual Design & Branding", "Design System Development", "Usability Testing", "Accessibility Compliance"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Our Services</span>
            <h1 className="mt-3 font-sans text-4xl font-bold text-white sm:text-5xl">Layanan &amp; Expertise</h1>
            <p className="mt-6 max-w-2xl text-sm font-mono leading-relaxed text-[var(--vto-text-muted)]">
              Empat divisi utama dengan keahlian mendalam di masing-masing bidang. Dari konsep hingga deployment, kami siap menjadi partner teknologi Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divisions */}
      {divisions.map((div, idx) => (
        <section key={div.id} id={div.id} className={`relative py-24 ${idx % 2 === 0 ? '' : 'border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)]'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              {/* Left: Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${div.color} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${div.color} 30%, transparent)` }}>
                  <div.icon className="h-7 w-7" style={{ color: div.color }} />
                </div>
                <h2 className="font-sans text-2xl font-bold text-white sm:text-3xl">{div.title}</h2>
                <p className="text-xs font-mono tracking-wider mt-1" style={{ color: div.color }}>{div.subtitle}</p>
                <p className="mt-4 text-sm font-mono leading-relaxed text-[var(--vto-text-muted)]">{div.desc}</p>

                {/* Features */}
                <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {div.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs font-mono text-[var(--vto-text-muted)]">
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: div.color }} />
                      {f}
                    </div>
                  ))}
                </div>

                <Link href="/portfolio" className="mt-6 inline-flex items-center gap-2 text-sm font-mono font-semibold transition-all cursor-pointer" style={{ color: div.color }}>
                  Lihat Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Right: Tech Stack */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {div.techs.map((t) => (
                  <div key={t.name} className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg)] p-5 transition-all hover:border-transparent" style={{ ['--hover-color' as string]: div.color }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${div.color} 10%, transparent)` }}>
                      <t.icon className="h-5 w-5" style={{ color: div.color }} />
                    </div>
                    <h4 className="font-sans text-sm font-semibold text-white">{t.name}</h4>
                    <p className="mt-1 text-[11px] font-mono text-[var(--vto-text-dim)]">{t.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[var(--vto-primary)]/10 via-transparent to-[var(--vto-cta)]/10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-sans text-3xl font-bold text-white">Butuh Solusi Custom?</h2>
          <p className="mt-4 text-sm font-mono text-[var(--vto-text-muted)]">Setiap bisnis unik. Konsultasikan kebutuhan spesifik Anda dan kami akan merancang solusi yang tepat.</p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-8 py-3.5 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_30px_var(--vto-cta-glow)] cursor-pointer">
            Konsultasi Gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
