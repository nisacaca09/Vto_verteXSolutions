"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, MoreHorizontal, Monitor, Smartphone, Cloud, Palette, Eye, Edit, Trash2 } from "lucide-react";
import { cn } from "../../../lib/utils";

const allProjects = [
  { id: 1, name: "BankPro v2.1", client: "PT Bank Nusantara", division: "Full Stack", status: "active", priority: "high", progress: 78, team: 8, budget: "850M", startDate: "2024-01" },
  { id: 2, name: "ShopVerse Mobile", client: "TokoBesar.id", division: "Android", status: "pending", priority: "medium", progress: 10, team: 4, budget: "320M", startDate: "2024-06" },
  { id: 3, name: "MediApp Update", client: "RS Medika Utama", division: "Android", status: "active", priority: "high", progress: 45, team: 5, budget: "420M", startDate: "2024-03" },
  { id: 4, name: "GovCloud Phase 2", client: "Kementerian KOMINFO", division: "DevOps", status: "review", priority: "urgent", progress: 92, team: 5, budget: "1.2B", startDate: "2023-09" },
  { id: 5, name: "EduDesign v3", client: "EduPlatform", division: "UI/UX", status: "active", priority: "medium", progress: 34, team: 3, budget: "180M", startDate: "2024-04" },
  { id: 6, name: "InfraWatch v2", client: "IndustriTech Corp", division: "DevOps", status: "completed", priority: "low", progress: 100, team: 3, budget: "280M", startDate: "2023-11" },
  { id: 7, name: "FoodRush Redesign", client: "FoodRush Indonesia", division: "UI/UX", status: "active", priority: "medium", progress: 60, team: 3, budget: "150M", startDate: "2024-02" },
  { id: 8, name: "MediCare Upgrade", client: "RS Medika Utama", division: "Full Stack", status: "active", priority: "high", progress: 55, team: 7, budget: "720M", startDate: "2024-01" },
];

const divisionIcons: Record<string, React.ElementType> = { "Full Stack": Monitor, "Android": Smartphone, "DevOps": Cloud, "UI/UX": Palette };

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [filterDivision, setFilterDivision] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = useMemo(() => {
    return allProjects.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
      const matchDiv = filterDivision === "all" || p.division === filterDivision;
      const matchStatus = filterStatus === "all" || p.status === filterStatus;
      return matchSearch && matchDiv && matchStatus;
    });
  }, [search, filterDivision, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-white">Projects</h1>
          <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Kelola semua proyek VTO</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-4 py-2.5 text-xs font-sans font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)] cursor-pointer">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vto-text-dim)]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari project atau client..." className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] py-2 pl-9 pr-3 text-xs font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none transition-all" />
        </div>
        <div className="flex gap-2">
          <select value={filterDivision} onChange={e => setFilterDivision(e.target.value)} className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-[var(--vto-text-muted)] focus:border-[var(--vto-primary)] focus:outline-none cursor-pointer">
            <option value="all">All Divisions</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Android">Android</option>
            <option value="DevOps">DevOps</option>
            <option value="UI/UX">UI/UX</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-[var(--vto-text-muted)] focus:border-[var(--vto-primary)] focus:outline-none cursor-pointer">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--vto-border)] bg-[var(--vto-bg-elevated)]">
                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)]">Project</th>
                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] hidden sm:table-cell">Division</th>
                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] hidden md:table-cell">Progress</th>
                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)]">Status</th>
                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)] hidden lg:table-cell">Budget</th>
                <th className="px-5 py-3 text-right text-[10px] font-mono uppercase tracking-wider text-[var(--vto-text-dim)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--vto-border)]">
              {filtered.map((p, i) => {
                const Icon = divisionIcons[p.division] || Monitor;
                return (
                  <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-[var(--vto-bg-elevated)] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-sans font-medium text-white">{p.name}</div>
                      <div className="text-[10px] font-mono text-[var(--vto-text-dim)]">{p.client}</div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--vto-text-muted)]">
                        <Icon className="h-3.5 w-3.5" />{p.division}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-[var(--vto-bg)]">
                          <div className="h-full rounded-full bg-[var(--vto-primary)]" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-[var(--vto-text-dim)]">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold ${
                        p.status === 'active' ? 'bg-[var(--vto-success)]/15 text-[var(--vto-success)]' :
                        p.status === 'review' ? 'bg-[var(--vto-warning)]/15 text-[var(--vto-warning)]' :
                        p.status === 'completed' ? 'bg-[var(--vto-primary)]/15 text-[var(--vto-primary)]' :
                        'bg-[var(--vto-text-dim)]/15 text-[var(--vto-text-dim)]'
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-xs font-mono text-[var(--vto-text-muted)]">IDR {p.budget}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {[Eye, Edit, Trash2].map((Icon, idx) => (
                          <button key={idx} className="rounded-md p-1.5 text-[var(--vto-text-dim)] hover:bg-[var(--vto-bg)] hover:text-white transition-all cursor-pointer" aria-label={['View','Edit','Delete'][idx]}>
                            <Icon className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--vto-border)] px-5 py-3">
          <span className="text-[10px] font-mono text-[var(--vto-text-dim)]">{filtered.length} of {allProjects.length} projects</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(n => (
              <button key={n} className={`h-7 w-7 rounded-md text-[10px] font-mono cursor-pointer ${n === 1 ? 'bg-[var(--vto-primary)]/10 text-[var(--vto-primary)] border border-[var(--vto-primary)]/20' : 'text-[var(--vto-text-dim)] hover:bg-[var(--vto-bg-elevated)]'}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
