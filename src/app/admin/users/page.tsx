"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, UserPlus, Eye, Edit, Trash2, Shield, User, Mail } from "lucide-react";

const allUsers = [
  { id: 1, name: "Ahmad Rizky", email: "ahmad@vertexsolution.id", role: "Admin", status: "active", company: "VTO", lastLogin: "2 menit lalu", projects: 12 },
  { id: 2, name: "Sarah Putri", email: "sarah@vertexsolution.id", role: "Admin", status: "active", company: "VTO", lastLogin: "1 jam lalu", projects: 8 },
  { id: 3, name: "John Doe", email: "john@banknusantara.co.id", role: "User", status: "active", company: "PT Bank Nusantara", lastLogin: "3 jam lalu", projects: 3 },
  { id: 4, name: "Dewi Lestari", email: "dewi@medika.co.id", role: "User", status: "active", company: "RS Medika Utama", lastLogin: "1 hari lalu", projects: 2 },
  { id: 5, name: "Rudi Hartono", email: "rudi@kominfo.go.id", role: "User", status: "active", company: "Kementerian KOMINFO", lastLogin: "2 hari lalu", projects: 1 },
  { id: 6, name: "Lisa Wang", email: "lisa@tokobesar.id", role: "User", status: "inactive", company: "TokoBesar.id", lastLogin: "1 minggu lalu", projects: 1 },
  { id: 7, name: "Budi Santoso", email: "budi@vertexsolution.id", role: "Admin", status: "active", company: "VTO", lastLogin: "30 menit lalu", projects: 15 },
  { id: 8, name: "Andi Pratama", email: "andi@eduplatform.co.id", role: "User", status: "active", company: "EduPlatform", lastLogin: "5 jam lalu", projects: 1 },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filtered = useMemo(() => {
    return allUsers.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.company.toLowerCase().includes(search.toLowerCase());
      const matchRole = filterRole === "all" || u.role.toLowerCase() === filterRole;
      return matchSearch && matchRole;
    });
  }, [search, filterRole]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-white">Users</h1>
          <p className="text-xs font-mono text-[var(--vto-text-dim)] mt-1">Kelola pengguna dan hak akses</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-4 py-2.5 text-xs font-sans font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)] cursor-pointer">
          <UserPlus className="h-4 w-4" /> Add User
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vto-text-dim)]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari user, email, atau perusahaan..." className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] py-2 pl-9 pr-3 text-xs font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none transition-all" />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-[var(--vto-text-muted)] focus:border-[var(--vto-primary)] focus:outline-none cursor-pointer">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((u, i) => (
          <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-5 transition-all hover:border-[var(--vto-primary)]/30">
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--vto-primary)]/20 to-[var(--vto-cta)]/10 border border-[var(--vto-border)]">
                <span className="font-sans text-sm font-bold text-[var(--vto-primary)]">{u.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold flex items-center gap-1 ${u.role === 'Admin' ? 'bg-[var(--vto-cta)]/15 text-[var(--vto-cta)]' : 'bg-[var(--vto-primary)]/15 text-[var(--vto-primary)]'}`}>
                {u.role === 'Admin' ? <Shield className="h-2.5 w-2.5" /> : <User className="h-2.5 w-2.5" />}
                {u.role}
              </span>
            </div>
            <h4 className="font-sans text-sm font-semibold text-white">{u.name}</h4>
            <p className="text-[10px] font-mono text-[var(--vto-text-dim)] flex items-center gap-1 mt-0.5">
              <Mail className="h-2.5 w-2.5" />{u.email}
            </p>
            <p className="text-[10px] font-mono text-[var(--vto-text-dim)] mt-1">{u.company}</p>
            <div className="mt-3 flex items-center justify-between border-t border-[var(--vto-border)] pt-3">
              <div className="text-[10px] font-mono text-[var(--vto-text-dim)]">
                <span className="text-[var(--vto-text-muted)]">{u.projects}</span> projects
              </div>
              <span className={`h-2 w-2 rounded-full ${u.status === 'active' ? 'bg-[var(--vto-success)]' : 'bg-[var(--vto-text-dim)]'}`} title={u.status} />
            </div>
            <div className="mt-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {[{ icon: Eye, label: 'View' }, { icon: Edit, label: 'Edit' }, { icon: Trash2, label: 'Delete' }].map(({ icon: Icon, label }) => (
                <button key={label} className="flex-1 flex items-center justify-center gap-1 rounded-md border border-[var(--vto-border)] py-1.5 text-[10px] font-mono text-[var(--vto-text-dim)] hover:bg-[var(--vto-bg-elevated)] hover:text-white cursor-pointer" aria-label={label}>
                  <Icon className="h-3 w-3" />{label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
