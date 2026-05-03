"use client";
import { useState } from "react";
import { Save, Monitor, Bell, Shield, Globe, Palette, Database } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-sans text-2xl font-bold text-white">Settings</h1>
        <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Konfigurasi sistem VTO CMS</p>
      </div>

      {/* General */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-6 py-4">
          <Globe className="h-4 w-4 text-[var(--vto-primary)]" />
          <h3 className="font-sans text-sm font-semibold text-white">General</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Site Name</label>
              <input defaultValue="VTO (verTexsOlution)" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Site URL</label>
              <input defaultValue="https://vertexsolution.id" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Site Description</label>
            <textarea defaultValue="IT Consultant yang menyediakan solusi teknologi inovatif untuk transformasi digital bisnis Anda." rows={3} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none transition-all resize-none" />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Contact Email</label>
            <input defaultValue="hello@vertexsolution.id" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-6 py-4">
          <Bell className="h-4 w-4 text-[var(--vto-cta)]" />
          <h3 className="font-sans text-sm font-semibold text-white">Notifications</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Email notifications for new projects", defaultChecked: true },
            { label: "Email notifications for new users", defaultChecked: true },
            { label: "Weekly summary report", defaultChecked: false },
            { label: "System alerts (server, performance)", defaultChecked: true },
          ].map((n) => (
            <label key={n.label} className="flex items-center justify-between rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 cursor-pointer hover:border-[var(--vto-primary)]/30 transition-all">
              <span className="text-xs font-mono text-[var(--vto-text-muted)]">{n.label}</span>
              <input type="checkbox" defaultChecked={n.defaultChecked} className="rounded border-[var(--vto-border)]" />
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-6 py-4">
          <Shield className="h-4 w-4 text-[var(--vto-success)]" />
          <h3 className="font-sans text-sm font-semibold text-white">Security</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Session Timeout</label>
              <select defaultValue="30" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none cursor-pointer">
                <option value="15">15 menit</option>
                <option value="30">30 menit</option>
                <option value="60">1 jam</option>
                <option value="120">2 jam</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] mb-2 block">Max Login Attempts</label>
              <select defaultValue="5" className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-2.5 text-sm font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none cursor-pointer">
                <option value="3">3 attempts</option>
                <option value="5">5 attempts</option>
                <option value="10">10 attempts</option>
              </select>
            </div>
          </div>
          <label className="flex items-center justify-between rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-4 py-3 cursor-pointer">
            <span className="text-xs font-mono text-[var(--vto-text-muted)]">Two-Factor Authentication</span>
            <input type="checkbox" defaultChecked className="rounded border-[var(--vto-border)]" />
          </label>
        </div>
      </div>

      {/* Database */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-6 py-4">
          <Database className="h-4 w-4 text-[var(--vto-purple)]" />
          <h3 className="font-sans text-sm font-semibold text-white">Database (PostgreSQL)</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Status", value: "Connected", color: "var(--vto-success)" },
              { label: "Version", value: "PostgreSQL 16.2", color: "var(--vto-text-muted)" },
              { label: "Size", value: "2.4 GB / 10 GB", color: "var(--vto-text-muted)" },
            ].map((d) => (
              <div key={d.label} className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] p-4">
                <div className="text-[10px] font-mono text-[var(--vto-text-dim)] uppercase tracking-wider">{d.label}</div>
                <div className="mt-1 text-sm font-mono font-semibold" style={{ color: d.color }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-6 py-3 text-sm font-sans font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)] cursor-pointer">
        <Save className="h-4 w-4" /> {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
