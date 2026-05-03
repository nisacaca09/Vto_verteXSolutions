"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Monitor, Smartphone, Cloud, Palette, Calendar, Users, ExternalLink } from "lucide-react";

const projects = [
  { id: 1, name: "BankPro v2.1", division: "Full Stack", status: "active", progress: 78, team: 8, startDate: "Jan 2024", desc: "Core banking system upgrade dengan fitur real-time transaction monitoring.", techs: ["Java", "Angular", "PostgreSQL"] },
  { id: 2, name: "BankGo Mobile", division: "Android", status: "active", progress: 45, team: 5, startDate: "Mar 2024", desc: "Mobile banking app dengan fitur QR Pay dan biometric authentication.", techs: ["Kotlin", "Firebase", "Jetpack Compose"] },
  { id: 3, name: "BankUI Redesign", division: "UI/UX", status: "review", progress: 92, team: 3, startDate: "Feb 2024", desc: "Redesign dashboard internal bank untuk meningkatkan workflow efficiency.", techs: ["Figma", "Design System", "Usability Testing"] },
  { id: 4, name: "Core Banking v1.0", division: "Full Stack", status: "completed", progress: 100, team: 7, startDate: "Jan 2023", desc: "Implementasi awal sistem core banking terintegrasi.", techs: ["Java Spring", "Angular", "PostgreSQL"] },
  { id: 5, name: "BankPro CI/CD", division: "DevOps", status: "completed", progress: 100, team: 3, startDate: "Sep 2023", desc: "Setup CI/CD pipeline dan cloud infrastructure untuk BankPro.", techs: ["Jenkins", "Docker", "AWS"] },
];

const divIcons: Record<string, React.ElementType> = { "Full Stack": Monitor, "Android": Smartphone, "DevOps": Cloud, "UI/UX": Palette };
const divColors: Record<string, string> = { "Full Stack": "var(--vto-primary)", "Android": "var(--vto-success)", "DevOps": "var(--vto-cta)", "UI/UX": "var(--vto-purple)" };

export default function UserProjectsPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => projects.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.division.toLowerCase().includes(search.toLowerCase()) || p.techs.some(t => t.toLowerCase().includes(search.toLowerCase()))), [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold text-white">My Projects</h1>
        <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Semua proyek yang dikerjakan VTO untuk Anda</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vto-text-dim)]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari proyek, divisi, atau teknologi..." className="w-full rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-3 pl-11 pr-4 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-purple)] focus:outline-none transition-all" />
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filtered.map((p, i) => {
          const Icon = divIcons[p.division] || Monitor;
          const color = divColors[p.division] || "var(--vto-primary)";
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="group rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-6 transition-all hover:border-transparent" style={{ ['--proj-color' as string]: color }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}>
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-white">{p.name}</h3>
                    <p className="text-xs font-mono mt-0.5" style={{ color }}>{p.division}</p>
                    <p className="mt-2 text-xs font-mono text-[var(--vto-text-dim)] leading-relaxed max-w-lg">{p.desc}</p>
                  </div>
                </div>
                <span className={`shrink-0 self-start rounded-full px-3 py-1 text-[10px] font-mono font-semibold ${
                  p.status === 'active' ? 'bg-[var(--vto-success)]/15 text-[var(--vto-success)]' :
                  p.status === 'review' ? 'bg-[var(--vto-warning)]/15 text-[var(--vto-warning)]' :
                  'bg-[var(--vto-primary)]/15 text-[var(--vto-primary)]'
                }`}>{p.status}</span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-[var(--vto-bg-elevated)]">
                  <div className="h-full rounded-full transition-all" style={{ width: `${p.progress}%`, background: color }} />
                </div>
                <span className="text-xs font-mono text-[var(--vto-text-muted)]">{p.progress}%</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-mono text-[var(--vto-text-dim)]">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.startDate}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{p.team} engineers</span>
                <div className="flex flex-wrap gap-1 ml-auto">
                  {p.techs.map(t => <span key={t} className="rounded-md border border-[var(--vto-border)] px-2 py-0.5 text-[9px]">{t}</span>)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
