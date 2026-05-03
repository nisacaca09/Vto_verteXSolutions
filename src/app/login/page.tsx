"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Monitor, Eye, EyeOff, Shield, User, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "user">("user");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[var(--vto-bg)]">
      <div className="noise-overlay" />

      {/* Left: Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--vto-primary)] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--vto-cta)] opacity-[0.06] blur-[100px]" />
        <div className="relative z-10 text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--vto-primary)] shadow-[0_0_30px_var(--vto-primary-glow)]">
              <Monitor className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-bold text-white">VTO</h2>
          <p className="text-xs font-mono tracking-[3px] text-[var(--vto-text-muted)] mt-1">verTexsOlution</p>
          <p className="mt-6 text-sm font-mono text-[var(--vto-text-dim)] leading-relaxed max-w-sm mx-auto">
            Platform CMS untuk mengelola proyek, tim, dan layanan IT Consultant Anda.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            {["Java", "Angular", "PostgreSQL"].map(t => (
              <span key={t} className="rounded-lg border border-[var(--vto-border)] px-3 py-1 text-[10px] font-mono text-[var(--vto-text-dim)]">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--vto-primary)]">
              <Monitor className="h-5 w-5 text-white" />
            </div>
            <span className="font-sans text-lg font-bold text-white">VTO</span>
          </div>

          <h1 className="font-sans text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm font-mono text-[var(--vto-text-dim)]">Masuk ke akun VTO Anda</p>

          {/* Role Toggle */}
          <div className="mt-6 flex rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-1">
            {(["user", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-mono transition-all cursor-pointer",
                  role === r ? "bg-[var(--vto-primary)] text-white shadow-[0_0_15px_var(--vto-primary-glow)]" : "text-[var(--vto-text-dim)] hover:text-white"
                )}
              >
                {r === "admin" ? <Shield className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                {r === "admin" ? "Admin" : "User"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-4 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder={role === "admin" ? "admin@vertexsolution.id" : "user@company.com"} />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-4 py-3 pr-12 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--vto-primary)] transition-all" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--vto-text-dim)] hover:text-white transition-colors cursor-pointer" aria-label="Toggle password">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-mono text-[var(--vto-text-dim)] cursor-pointer">
                <input type="checkbox" className="rounded border-[var(--vto-border)] bg-[var(--vto-bg-card)]" />
                Remember me
              </label>
              <a href="#" className="text-xs font-mono text-[var(--vto-primary)] hover:underline cursor-pointer">Lupa password?</a>
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--vto-cta)] px-6 py-3.5 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_30px_var(--vto-cta-glow)] cursor-pointer">
              {role === "admin" ? "Login sebagai Admin" : "Login sebagai User"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-mono text-[var(--vto-text-dim)]">
            Belum punya akun? <Link href="/register" className="text-[var(--vto-primary)] hover:underline cursor-pointer">Daftar Sekarang</Link>
          </p>
          <p className="mt-4 text-center">
            <Link href="/" className="text-[10px] font-mono text-[var(--vto-text-dim)] hover:text-white transition-colors cursor-pointer">← Kembali ke Home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
