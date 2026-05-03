"use client";
import { useState } from "react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Cloud, Palette, ExternalLink, Calendar, Users, Code2 } from "lucide-react";
import { cn } from "../../lib/utils";

type Division = "all" | "fullstack" | "android" | "devops" | "uiux";

const filters: { key: Division; label: string; icon: React.ElementType; color: string }[] = [
  { key: "all", label: "All Projects", icon: Code2, color: "var(--vto-text-muted)" },
  { key: "fullstack", label: "Full Stack", icon: Monitor, color: "var(--vto-primary)" },
  { key: "android", label: "Android", icon: Smartphone, color: "var(--vto-success)" },
  { key: "devops", label: "DevOps", icon: Cloud, color: "var(--vto-cta)" },
  { key: "uiux", label: "UI/UX", icon: Palette, color: "var(--vto-purple)" },
];

const projects = [
  // Full Stack
  { id: 1, division: "fullstack" as const, name: "BankPro", title: "Core Banking System", client: "PT Bank Nusantara", year: "2024", team: 8, duration: "12 bulan", desc: "Sistem core banking terintegrasi yang menangani transaksi real-time, manajemen nasabah, dan reporting keuangan untuk bank regional.", techs: ["Java Spring Boot", "Angular 17", "PostgreSQL", "Redis", "Kafka"], color: "var(--vto-primary)" },
  { id: 2, division: "fullstack" as const, name: "ShopVerse", title: "E-Commerce Platform", client: "TokoBesar.id", year: "2023", team: 6, duration: "8 bulan", desc: "Platform e-commerce multi-vendor dengan fitur marketplace, payment gateway, dan inventory management untuk 10.000+ produk.", techs: ["Java", "Angular", "PostgreSQL", "Elasticsearch", "Stripe"], color: "var(--vto-primary)" },
  { id: 3, division: "fullstack" as const, name: "MediCare", title: "Hospital Management System", client: "RS Medika Utama", year: "2024", team: 7, duration: "10 bulan", desc: "Sistem manajemen rumah sakit yang mencakup EMR, penjadwalan dokter, billing, dan farmasi terintegrasi.", techs: ["Java Spring", "Angular", "PostgreSQL", "HL7 FHIR", "Docker"], color: "var(--vto-primary)" },
  // Android
  { id: 4, division: "android" as const, name: "BankGo", title: "Mobile Banking App", client: "PT Bank Nusantara", year: "2024", team: 5, duration: "6 bulan", desc: "Aplikasi mobile banking dengan fitur transfer, pembayaran, QR pay, dan mutasi real-time untuk 500.000+ nasabah.", techs: ["Kotlin", "Jetpack Compose", "Firebase", "Biometric Auth", "Room DB"], color: "var(--vto-success)" },
  { id: 5, division: "android" as const, name: "FoodRush", title: "Food Delivery App", client: "FoodRush Indonesia", year: "2023", team: 4, duration: "5 bulan", desc: "Aplikasi delivery makanan dengan fitur real-time tracking, rekomendasi AI, dan integrasi payment gateway lokal.", techs: ["Kotlin", "Google Maps SDK", "Firebase", "Midtrans", "ML Kit"], color: "var(--vto-success)" },
  { id: 6, division: "android" as const, name: "MediApp", title: "Healthcare Patient App", client: "RS Medika Utama", year: "2024", team: 4, duration: "4 bulan", desc: "Aplikasi pasien untuk booking appointment, akses rekam medis, telemedicine, dan pengingat obat.", techs: ["Kotlin", "Jetpack Compose", "WebRTC", "Firebase", "FHIR"], color: "var(--vto-success)" },
  // DevOps
  { id: 7, division: "devops" as const, name: "AutoDeploy", title: "CI/CD Pipeline FinTech", client: "FinPay Solutions", year: "2023", team: 3, duration: "3 bulan", desc: "Pipeline CI/CD otomatis untuk FinTech dengan automated testing, security scanning, dan zero-downtime deployment.", techs: ["Jenkins", "Docker", "Kubernetes", "SonarQube", "AWS EKS"], color: "var(--vto-cta)" },
  { id: 8, division: "devops" as const, name: "GovCloud", title: "Cloud Migration Government", client: "Kementerian KOMINFO", year: "2024", team: 5, duration: "6 bulan", desc: "Migrasi infrastruktur legacy pemerintah ke cloud dengan compliance keamanan tingkat tinggi dan data sovereignty.", techs: ["Terraform", "AWS GovCloud", "Ansible", "Vault", "CloudWatch"], color: "var(--vto-cta)" },
  { id: 9, division: "devops" as const, name: "InfraWatch", title: "Infrastructure Monitoring", client: "IndustriTech Corp", year: "2024", team: 3, duration: "4 bulan", desc: "Platform monitoring infrastruktur 24/7 dengan alerting cerdas, dashboard real-time, dan incident management otomatis.", techs: ["Prometheus", "Grafana", "ELK Stack", "PagerDuty", "Kubernetes"], color: "var(--vto-cta)" },
  // UI/UX
  { id: 10, division: "uiux" as const, name: "BankUI", title: "Banking Dashboard Redesign", client: "PT Bank Nusantara", year: "2023", team: 3, duration: "3 bulan", desc: "Redesign dashboard internal bank dengan fokus pada efisiensi workflow, data visualization, dan aksesibilitas.", techs: ["Figma", "Design System", "Usability Testing", "A/B Testing", "WCAG 2.1"], color: "var(--vto-purple)" },
  { id: 11, division: "uiux" as const, name: "EduDesign", title: "E-Learning Platform Design", client: "EduPlatform", year: "2024", team: 3, duration: "4 bulan", desc: "Design lengkap platform e-learning dengan gamification, progress tracking, dan adaptive learning interface.", techs: ["Figma", "Prototyping", "User Research", "Motion Design", "Design Tokens"], color: "var(--vto-purple)" },
  { id: 12, division: "uiux" as const, name: "TripCraft", title: "Travel App Prototype", client: "TripCraft.id", year: "2024", team: 2, duration: "2 bulan", desc: "Prototype high-fidelity aplikasi travel dengan fitur itinerary planner, social sharing, dan AR guide.", techs: ["Figma", "Principle", "User Testing", "Interaction Design", "Accessibility"], color: "var(--vto-purple)" },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Division>("all");
  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.division === activeFilter);

  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Portfolio</span>
            <h1 className="mt-3 font-sans text-4xl font-bold text-white sm:text-5xl">Projects Kami</h1>
            <p className="mt-4 max-w-2xl text-sm font-mono text-[var(--vto-text-muted)]">Koleksi proyek yang telah kami kerjakan di berbagai industri dan platform.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-4 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={cn(
                  "flex items-center gap-2 shrink-0 rounded-lg px-4 py-2.5 text-xs font-mono transition-all cursor-pointer",
                  activeFilter === f.key
                    ? "bg-[var(--vto-primary)]/10 text-[var(--vto-primary)] border border-[var(--vto-primary)]/30"
                    : "text-[var(--vto-text-dim)] hover:text-white hover:bg-[var(--vto-bg-elevated)] border border-transparent"
                )}
              >
                <f.icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden transition-all hover:border-transparent"
                >
                  {/* Header */}
                  <div className="relative h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${p.color} 15%, var(--vto-bg-card)), var(--vto-bg-card))` }}>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-semibold" style={{ background: `color-mix(in srgb, ${p.color} 20%, transparent)`, color: p.color }}>
                        {filters.find(f => f.key === p.division)?.label}
                      </span>
                    </div>
                    <span className="font-sans text-4xl font-bold opacity-20" style={{ color: p.color }}>{p.name}</span>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-sans text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-0.5 text-[11px] font-mono" style={{ color: p.color }}>{p.client}</p>
                    <p className="mt-3 text-xs font-mono text-[var(--vto-text-dim)] leading-relaxed line-clamp-3">{p.desc}</p>
                    {/* Meta */}
                    <div className="mt-4 flex items-center gap-4 text-[10px] font-mono text-[var(--vto-text-dim)]">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.year}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{p.team} orang</span>
                      <span>{p.duration}</span>
                    </div>
                    {/* Techs */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.techs.map((t) => (
                        <span key={t} className="rounded-md border border-[var(--vto-border)] bg-[var(--vto-bg)] px-2 py-0.5 text-[9px] font-mono text-[var(--vto-text-dim)]">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
