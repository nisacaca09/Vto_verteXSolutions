"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Monitor, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--vto-bg)] px-4">
      <div className="noise-overlay" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[var(--vto-primary)] opacity-[0.06] blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-lg">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--vto-primary)]">
            <Monitor className="h-5 w-5 text-white" />
          </div>
          <span className="font-sans text-lg font-bold text-white">VTO</span>
          <span className="text-[10px] font-mono text-[var(--vto-text-muted)]">verTexsOlution</span>
        </div>

        <h1 className="font-sans text-2xl font-bold text-white">Buat Akun Baru</h1>
        <p className="mt-1 text-sm font-mono text-[var(--vto-text-dim)]">Daftar untuk mengakses dashboard VTO</p>

        <form onSubmit={handleRegister} className="mt-8 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Nama Depan *</label>
              <input type="text" required className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="John" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Nama Belakang *</label>
              <input type="text" required className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Email *</label>
            <input type="email" required className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="john@company.com" />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Perusahaan</label>
            <input type="text" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="PT Company" />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Password *</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} required className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 pr-12 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="Min. 8 karakter" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--vto-text-dim)] hover:text-white cursor-pointer" aria-label="Toggle password">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Konfirmasi Password *</label>
            <input type="password" required className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="Ulangi password" />
          </div>
          <label className="flex items-start gap-2 text-xs font-mono text-[var(--vto-text-dim)] cursor-pointer pt-2">
            <input type="checkbox" required className="mt-0.5 rounded border-[var(--vto-border)]" />
            Saya setuju dengan <a href="#" className="text-[var(--vto-primary)] hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-[var(--vto-primary)] hover:underline">Kebijakan Privasi</a>
          </label>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--vto-cta)] px-6 py-3.5 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_30px_var(--vto-cta-glow)] cursor-pointer">
            <UserPlus className="h-4 w-4" /> Daftar Sekarang
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-mono text-[var(--vto-text-dim)]">
          Sudah punya akun? <Link href="/login" className="text-[var(--vto-primary)] hover:underline cursor-pointer">Login</Link>
        </p>
        <p className="mt-3 text-center">
          <Link href="/" className="text-[10px] font-mono text-[var(--vto-text-dim)] hover:text-white transition-colors cursor-pointer">← Kembali ke Home</Link>
        </p>
      </motion.div>
    </div>
  );
}
