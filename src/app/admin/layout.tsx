"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, LayoutDashboard, FolderKanban, Users, Settings, LogOut, Menu,  Search, ChevronLeft, FileText } from "lucide-react";
import { cn } from "../../lib/utils";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/content", label: "Content", icon:FileText},
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[var(--vto-border)] bg-[var(--vto-bg-card)] transition-all duration-300",
        collapsed ? "w-16" : "w-60",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--vto-border)] px-4">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--vto-primary)]">
                <Monitor className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-sans text-sm font-bold text-white">VTO</span>
                <span className="ml-1 text-[8px] font-mono text-[var(--vto-text-dim)]">Admin</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--vto-primary)]">
              <Monitor className="h-4 w-4 text-white" />
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex h-6 w-6 items-center justify-center rounded text-[var(--vto-text-dim)] hover:text-white cursor-pointer" aria-label="Toggle sidebar">
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-mono transition-all",
                pathname === link.href
                  ? "bg-[var(--vto-primary)]/10 text-[var(--vto-primary)] border border-[var(--vto-primary)]/20"
                  : "text-[var(--vto-text-muted)] hover:bg-[var(--vto-bg-elevated)] hover:text-white border border-transparent",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? link.label : undefined}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[var(--vto-border)] p-2">
          <Link href="/login" className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-mono text-[var(--vto-text-dim)] transition-all hover:bg-[var(--vto-bg-elevated)] hover:text-white", collapsed && "justify-center px-2")}>
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main Content */}
      <main className={cn("flex-1 overflow-y-auto transition-all duration-300", collapsed ? "md:ml-16" : "md:ml-60")}>
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--vto-border)] bg-[var(--vto-bg)]/80 backdrop-blur-xl px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-1.5 text-[var(--vto-text-dim)] hover:bg-[var(--vto-bg-elevated)] md:hidden cursor-pointer" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vto-text-dim)]" />
              <input type="text" placeholder="Cari di dashboard..." className="w-48 lg:w-72 rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-1.5 pl-9 pr-3 text-xs font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--vto-primary)]/15 border border-[var(--vto-primary)]/30 text-xs font-sans font-bold text-[var(--vto-primary)]">
              A
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-sans font-medium text-white">Admin VTO</div>
              <div className="text-[10px] font-mono text-[var(--vto-text-dim)]">admin@vertexsolution.id</div>
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
