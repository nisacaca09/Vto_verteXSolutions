"use client";
import { useState } from "react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />
      <Navbar />

      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[var(--vto-cta)] opacity-[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">Contact Us</span>
            <h1 className="mt-3 font-sans text-4xl font-bold text-white sm:text-5xl">Hubungi Kami</h1>
            <p className="mt-4 max-w-xl text-sm font-mono text-[var(--vto-text-muted)]">Siap memulai proyek? Kirim pesan dan tim kami akan menghubungi Anda dalam 24 jam.</p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Nama Lengkap *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Telepon</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="+62 812 xxxx xxxx" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Perusahaan</label>
                    <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="PT Company" />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Layanan yang Dibutuhkan</label>
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all cursor-pointer">
                    <option value="">Pilih layanan...</option>
                    <option value="fullstack">Full Stack Development</option>
                    <option value="android">Android Development</option>
                    <option value="devops">DevOps Solutions</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                <div className="mt-6">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Pesan *</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all resize-none" placeholder="Ceritakan kebutuhan proyek Anda..." />
                </div>
                <button type="submit" disabled={submitted} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--vto-cta)] px-6 py-3.5 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_30px_var(--vto-cta-glow)] disabled:opacity-50 cursor-pointer">
                  {submitted ? (<><CheckCircle className="h-4 w-4" /> Pesan Terkirim!</>) : (<><Send className="h-4 w-4" /> Kirim Pesan</>)}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
              {[
                { icon: Building2, title: "Kantor Pusat", lines: ["Gedung Cyber Lt. 12", "Jl. Kuningan Barat No. 8", "Jakarta Selatan 12710"] },
                { icon: Phone, title: "Telepon", lines: ["+62 21-1234-5678", "+62 812-3456-7890 (WhatsApp)"] },
                { icon: Mail, title: "Email", lines: ["hello@vertexsolution.id", "support@vertexsolution.id"] },
                { icon: Clock, title: "Jam Operasional", lines: ["Senin - Jumat: 09:00 - 18:00 WIB", "Sabtu: 09:00 - 14:00 WIB"] },
              ].map((info) => (
                <div key={info.title} className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--vto-primary)]/10 border border-[var(--vto-primary)]/20">
                      <info.icon className="h-5 w-5 text-[var(--vto-primary)]" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-white mb-1">{info.title}</h4>
                      {info.lines.map((l) => (
                        <p key={l} className="text-xs font-mono text-[var(--vto-text-dim)] leading-relaxed">{l}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-[var(--vto-primary)] mb-2" />
                 <p className="text-xs font-mono text-[var(--vto-text-dim)]">Jakarta, Indonesia</p>
                 <p className="text-[10px] font-mono text-[var(--vto-text-dim)] mt-1"> Headquarters / Main Office</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
