"use client";
import { motion } from "framer-motion";
import { FolderKanban, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";

const stats = [
  { label: "Total Projects", value: "124", change: "+12%", up: true, icon: FolderKanban, color: "var(--vto-primary)" },
  { label: "Active Users", value: "1,847", change: "+8%", up: true, icon: Users, color: "var(--vto-success)" },
  { label: "Revenue (IDR)", value: "2.4M", change: "+23%", up: true, icon: DollarSign, color: "var(--vto-cta)" },
  { label: "Conversion Rate", value: "4.2%", change: "-0.3%", up: false, icon: TrendingUp, color: "var(--vto-purple)" },
];

const recentProjects = [
  { name: "BankPro v2.1", client: "PT Bank Nusantara", status: "active", progress: 78, division: "Full Stack" },
  { name: "MediApp Update", client: "RS Medika Utama", status: "active", progress: 45, division: "Android" },
  { name: "GovCloud Phase 2", client: "Kementerian KOMINFO", status: "review", progress: 92, division: "DevOps" },
  { name: "EduDesign v3", client: "EduPlatform", status: "active", progress: 34, division: "UI/UX" },
  { name: "ShopVerse Mobile", client: "TokoBesar.id", status: "pending", progress: 10, division: "Android" },
];

const recentActivity = [
  { action: "Project BankPro v2.1 milestone completed", time: "2 menit lalu", type: "success" },
  { action: "User baru terdaftar: john@company.com", time: "15 menit lalu", type: "info" },
  { action: "Invoice #INV-2024-089 dibuat", time: "1 jam lalu", type: "info" },
  { action: "Server alert: CPU usage > 90% (resolved)", time: "3 jam lalu", type: "warning" },
  { action: "Deploy MediApp v1.3.2 berhasil", time: "5 jam lalu", type: "success" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Overview performa VTO bulan ini</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)` }}>
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <span className={`flex items-center gap-0.5 text-[10px] font-mono font-semibold ${s.up ? 'text-[var(--vto-success)]' : 'text-[var(--vto-danger)]'}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.change}
              </span>
            </div>
            <div className="font-sans text-2xl font-bold text-white">{s.value}</div>
            <div className="text-[10px] font-mono text-[var(--vto-text-dim)] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Projects */}
        <div className="lg:col-span-3 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--vto-border)] px-5 py-4">
            <h3 className="font-sans text-sm font-semibold text-white">Active Projects</h3>
            <a href="/admin/projects" className="text-[10px] font-mono text-[var(--vto-primary)] hover:underline cursor-pointer">View All</a>
          </div>
          <div className="divide-y divide-[var(--vto-border)]">
            {recentProjects.map((p) => (
              <div key={p.name} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--vto-bg-elevated)] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-sans font-medium text-white truncate">{p.name}</div>
                  <div className="text-[10px] font-mono text-[var(--vto-text-dim)]">{p.client} • {p.division}</div>
                </div>
                <div className="hidden sm:block w-24">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[var(--vto-text-dim)]">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[var(--vto-bg-elevated)]">
                    <div className="h-full rounded-full bg-[var(--vto-primary)] transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold ${
                  p.status === 'active' ? 'bg-[var(--vto-success)]/15 text-[var(--vto-success)]' :
                  p.status === 'review' ? 'bg-[var(--vto-warning)]/15 text-[var(--vto-warning)]' :
                  'bg-[var(--vto-text-dim)]/15 text-[var(--vto-text-dim)]'
                }`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
          <div className="border-b border-[var(--vto-border)] px-5 py-4">
            <h3 className="font-sans text-sm font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="divide-y divide-[var(--vto-border)]">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <div className="mt-0.5">
                  {a.type === 'success' ? <CheckCircle className="h-4 w-4 text-[var(--vto-success)]" /> :
                   a.type === 'warning' ? <AlertCircle className="h-4 w-4 text-[var(--vto-warning)]" /> :
                   <Clock className="h-4 w-4 text-[var(--vto-primary)]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-[var(--vto-text-muted)] leading-relaxed">{a.action}</p>
                  <p className="text-[10px] font-mono text-[var(--vto-text-dim)] mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans text-sm font-semibold text-white">Revenue Overview</h3>
          <div className="flex gap-2">
            {["7D", "1M", "3M", "1Y"].map(p => (
              <button key={p} className={`rounded-md px-2.5 py-1 text-[10px] font-mono cursor-pointer ${p === '1M' ? 'bg-[var(--vto-primary)]/10 text-[var(--vto-primary)] border border-[var(--vto-primary)]/20' : 'text-[var(--vto-text-dim)] hover:text-white'}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2 h-40">
          {[35, 52, 41, 68, 55, 72, 60, 85, 78, 90, 70, 95].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md bg-gradient-to-t from-[var(--vto-primary)] to-[var(--vto-secondary)] transition-all hover:opacity-80" style={{ height: `${h}%` }} />
              <span className="text-[8px] font-mono text-[var(--vto-text-dim)]">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
