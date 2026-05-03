"use client";
import { useState } from "react";
import { Save, User, Mail, Building2, Phone, Globe, Lock, Eye, EyeOff } from "lucide-react";

export default function UserProfilePage() {
  const [saved, setSaved] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-sans text-2xl font-bold text-white">Profile</h1>
        <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Kelola informasi akun Anda</p>
      </div>

      {/* Avatar & Name */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--vto-purple)]/20 to-[var(--vto-primary)]/20 border border-[var(--vto-border)]">
            <span className="font-sans text-2xl font-bold text-[var(--vto-purple)]">JD</span>
          </div>
          <div>
            <h2 className="font-sans text-xl font-bold text-white">John Doe</h2>
            <p className="text-xs font-mono text-[var(--vto-text-dim)]">PT Bank Nusantara</p>
            <p className="text-[10px] font-mono text-[var(--vto-purple)] mt-1">Client Account • Active since Jan 2023</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-6 py-4">
          <User className="h-4 w-4 text-[var(--vto-purple)]" />
          <h3 className="font-sans text-sm font-semibold text-white">Personal Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">First Name</label>
              <input defaultValue="John" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Last Name</label>
              <input defaultValue="Doe" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label>
            <input defaultValue="john@banknusantara.co.id" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
              <input defaultValue="+62 812 3456 7890" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 flex items-center gap-1"><Building2 className="h-3 w-3" /> Company</label>
              <input defaultValue="PT Bank Nusantara" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-6 py-4">
          <Lock className="h-4 w-4 text-[var(--vto-cta)]" />
          <h3 className="font-sans text-sm font-semibold text-white">Change Password</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Current Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} placeholder="••••••••" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 pr-10 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--vto-text-dim)] hover:text-white cursor-pointer" aria-label="Toggle">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">New Password</label>
              <input type="password" placeholder="Min. 8 karakter" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Confirm Password</label>
              <input type="password" placeholder="Ulangi password" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-6 py-3 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)] cursor-pointer">
        <Save className="h-4 w-4" /> {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
