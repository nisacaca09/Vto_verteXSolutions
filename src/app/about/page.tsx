"use client";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Shield, Handshake, Sparkles, Award, Users, Calendar, Globe } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "Selalu mengadopsi teknologi terbaru dan pendekatan inovatif dalam setiap solusi." },
  { icon: Shield, title: "Quality", desc: "Standar kualitas tinggi dalam setiap baris kode dan deliverable yang kami hasilkan." },
  { icon: Handshake, title: "Collaboration", desc: "Bekerja erat dengan klien sebagai partner, bukan sekadar vendor." },
  { icon: Sparkles, title: "Integrity", desc: "Transparansi dan kejujuran menjadi fondasi setiap hubungan bisnis kami." },
];

const team = [
  { name: "Ahmad Rizky", role: "CEO & Founder", exp: "15+ tahun di industri IT" },
  { name: "Sarah Putri", role: "CTO", exp: "12+ tahun software architecture" },
  { name: "Budi Santoso", role: "Head of Development", exp: "10+ tahun full stack engineering" },
  { name: "Diana Chen", role: "Head of Design", exp: "8+ tahun UI/UX enterprise" },
  { name: "Reza Firmansyah", role: "Lead Android Engineer", exp: "9+ tahun mobile development" },
  { name: "Farah Amelia", role: "DevOps Lead", exp: "7+ tahun cloud infrastructure" },
];

const milestones = [
  { year: "2018", event: "VTO didirikan di Jakarta dengan 5 engineer" },
  { year: "2019", event: "Proyek pertama — Core Banking System untuk Bank Nusantara" },
  { year: "2020", event: "Ekspansi ke Android Development dan cloud services" },
  { year: "2021", event: "Menambah divisi UI/UX Design, tim berkembang menjadi 20+" },
  { year: "2023", event: "50+ klien enterprise di 6 industri berbeda" },
  { year: "2025", event: "Meraih sertifikasi ISO 27001 dan AWS Advanced Partner" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[var(--vto-primary)] opacity-[0.05] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">About Us</span>
            <h1 className="mt-3 font-sans text-4xl font-bold text-white sm:text-5xl">
              Membangun Masa Depan
              <br />
              <span className="text-[var(--vto-primary)] text-glow-blue">Digital Indonesia</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm font-mono leading-relaxed text-[var(--vto-text-muted)]">
              VTO (verTexsOlution) didirikan pada tahun 2018 dengan visi menjadi mitra teknologi terdepan di Indonesia. Kami percaya bahwa teknologi yang tepat dapat mentransformasi bisnis dan meningkatkan daya saing di era digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl border border-[var(--vto-primary)]/20 bg-[var(--vto-primary)]/5 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--vto-primary)]/15 border border-[var(--vto-primary)]/30">
                <Eye className="h-6 w-6 text-[var(--vto-primary)]" />
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3">Visi</h3>
              <p className="text-sm font-mono leading-relaxed text-[var(--vto-text-muted)]">
                Menjadi perusahaan IT Consultant terdepan di Indonesia yang dikenal karena inovasi, kualitas, dan dampak positif bagi bisnis klien di era transformasi digital.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl border border-[var(--vto-cta)]/20 bg-[var(--vto-cta)]/5 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--vto-cta)]/15 border border-[var(--vto-cta)]/30">
                <Target className="h-6 w-6 text-[var(--vto-cta)]" />
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3">Misi</h3>
              <ul className="space-y-2 text-sm font-mono leading-relaxed text-[var(--vto-text-muted)]">
                <li>• Memberikan solusi IT inovatif dan berkualitas tinggi</li>
                <li>• Membangun hubungan jangka panjang berbasis kepercayaan</li>
                <li>• Mengembangkan talenta digital terbaik Indonesia</li>
                <li>• Mendorong adopsi teknologi modern di berbagai industri</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Core Values</span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-white">Nilai-Nilai Kami</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6 text-center transition-all hover:border-[var(--vto-primary)]/30">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--vto-primary)]/10 border border-[var(--vto-primary)]/20">
                  <v.icon className="h-6 w-6 text-[var(--vto-primary)]" />
                </div>
                <h3 className="font-sans text-base font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-xs font-mono text-[var(--vto-text-dim)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Journey</span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-white">Perjalanan Kami</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--vto-primary)] via-[var(--vto-cta)] to-[var(--vto-primary)] opacity-30" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex items-start gap-6 pl-4">
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--vto-primary)] text-xs font-sans font-bold text-white shadow-[0_0_15px_var(--vto-primary-glow)]">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg)] p-4 flex-1">
                    <span className="text-xs font-mono text-[var(--vto-cta)] font-semibold">{m.year}</span>
                    <p className="mt-1 text-sm font-mono text-[var(--vto-text-muted)]">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Our Team</span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-white">Tim Expert Kami</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6 transition-all hover:border-[var(--vto-primary)]/30">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--vto-primary)]/20 to-[var(--vto-cta)]/20 border border-[var(--vto-border)]">
                  <span className="font-sans text-xl font-bold text-[var(--vto-primary)]">{t.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-sans text-base font-semibold text-white">{t.name}</h3>
                <p className="text-xs font-mono text-[var(--vto-primary)] mt-0.5">{t.role}</p>
                <p className="text-[11px] font-mono text-[var(--vto-text-dim)] mt-2">{t.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Recognition</span>
            <h2 className="mt-3 font-sans text-2xl font-bold text-white">Sertifikasi & Penghargaan</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Award, label: "ISO 27001 Certified" },
              { icon: Globe, label: "AWS Advanced Partner" },
              { icon: Award, label: "Google Cloud Partner" },
              { icon: Award, label: "Top IT Company 2025" },
            ].map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-3 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg)] p-6 text-center">
                <a.icon className="h-8 w-8 text-[var(--vto-cta)]" />
                <span className="text-xs font-mono text-[var(--vto-text-muted)]">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
