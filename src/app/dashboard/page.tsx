"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FolderKanban, Clock, CheckCircle, AlertCircle, Bell, ArrowRight, FileText } from "lucide-react";

const myStats = [
  { label: "Active Projects", value: "3", icon: FolderKanban, color: "var(--vto-primary)" },
  { label: "Completed", value: "5", icon: CheckCircle, color: "var(--vto-success)" },
  { label: "Pending Review", value: "1", icon: Clock, color: "var(--vto-warning)" },
];

const myProjects = [
  { name: "BankPro v2.1", status: "active", progress: 78, lastUpdate: "2 jam lalu", nextMilestone: "API Integration Phase" },
  { name: "BankGo Mobile", status: "active", progress: 45, lastUpdate: "1 hari lalu", nextMilestone: "UI Testing" },
  { name: "BankUI Redesign", status: "review", progress: 92, lastUpdate: "3 hari lalu", nextMilestone: "Final Approval" },
];

const notifications = [
  { msg: "BankPro v2.1: Milestone 'Backend API' completed", time: "2 jam lalu", type: "success" },
  { msg: "BankGo: New build available for testing", time: "1 hari lalu", type: "info" },
  { msg: "Invoice #INV-2024-012 ready for review", time: "2 hari lalu", type: "info" },
  { msg: "BankUI: Design feedback requested", time: "3 hari lalu", type: "warning" },
];

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-white">Welcome, John!</h1>
        <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Overview proyek Anda dengan VTO</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {myStats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)` }}>
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="font-sans text-2xl font-bold text-white">{s.value}</div>
                <div className="text-[10px] font-mono text-[var(--vto-text-dim)]">{s.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Projects */}
        <div className="lg:col-span-3 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--vto-border)] px-5 py-4">
            <h3 className="font-sans text-sm font-semibold text-white">My Projects</h3>
            <Link href="/dashboard/projects" className="text-[10px] font-mono text-[var(--vto-purple)] hover:underline cursor-pointer">View All</Link>
          </div>
          <div className="divide-y divide-[var(--vto-border)]">
            {myProjects.map((p) => (
              <div key={p.name} className="px-5 py-4 hover:bg-[var(--vto-bg-elevated)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-sans font-medium text-white">{p.name}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold ${
                    p.status === 'active' ? 'bg-[var(--vto-success)]/15 text-[var(--vto-success)]' :
                    'bg-[var(--vto-warning)]/15 text-[var(--vto-warning)]'
                  }`}>{p.status}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--vto-bg-elevated)]">
                    <div className="h-full rounded-full bg-[var(--vto-purple)]" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--vto-text-dim)]">{p.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--vto-text-dim)]">
                  <span>Next: {p.nextMilestone}</span>
                  <span>{p.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[var(--vto-border)] px-5 py-4">
            <Bell className="h-4 w-4 text-[var(--vto-purple)]" />
            <h3 className="font-sans text-sm font-semibold text-white">Notifications</h3>
          </div>
          <div className="divide-y divide-[var(--vto-border)]">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <div className="mt-0.5">
                  {n.type === 'success' ? <CheckCircle className="h-4 w-4 text-[var(--vto-success)]" /> :
                   n.type === 'warning' ? <AlertCircle className="h-4 w-4 text-[var(--vto-warning)]" /> :
                   <FileText className="h-4 w-4 text-[var(--vto-purple)]" />}
                </div>
                <div>
                  <p className="text-xs font-mono text-[var(--vto-text-muted)] leading-relaxed">{n.msg}</p>
                  <p className="text-[10px] font-mono text-[var(--vto-text-dim)] mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
