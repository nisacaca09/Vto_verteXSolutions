"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Monitor, Smartphone, Cloud, Palette, ArrowRight,
  Building2, Users, FolderKanban, Mail, Info, Home, FileText,
  Landmark, HeartPulse, ShoppingCart, GraduationCap, Factory,
  Shield, LayoutDashboard, Settings, User
} from "lucide-react";
import { cn } from "../lib/utils";

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  href: string;
  tags: string[];
  color: string;
};

const searchIndex: SearchItem[] = [
  // Pages
  { id: "home", title: "Home", description: "Halaman utama VTO verTexsOlution", category: "Halaman", icon: Home, href: "/", tags: ["home", "beranda", "utama", "landing"], color: "var(--vto-primary)" },
  { id: "about", title: "About Us", description: "Profil perusahaan, visi misi, tim expert", category: "Halaman", icon: Info, href: "/about", tags: ["about", "tentang", "profil", "perusahaan", "visi", "misi", "tim", "team"], color: "var(--vto-primary)" },
  { id: "services", title: "Services", description: "Layanan IT Consultant VTO", category: "Halaman", icon: FileText, href: "/services", tags: ["layanan", "services", "jasa", "konsultasi", "it"], color: "var(--vto-primary)" },
  { id: "portfolio", title: "Portfolio", description: "Koleksi proyek yang telah kami kerjakan", category: "Halaman", icon: FolderKanban, href: "/portfolio", tags: ["portfolio", "proyek", "project", "karya"], color: "var(--vto-primary)" },
  { id: "contact", title: "Contact", description: "Hubungi tim VTO untuk konsultasi", category: "Halaman", icon: Mail, href: "/contact", tags: ["contact", "hubungi", "kontak", "konsultasi"], color: "var(--vto-primary)" },

  // Services
  { id: "svc-fs", title: "Full Stack Development", description: "Solusi end-to-end dengan Java, Angular & PostgreSQL", category: "Layanan", icon: Monitor, href: "/services#fullstack", tags: ["full stack", "java", "angular", "postgresql", "spring boot", "web", "backend", "frontend", "developer", "enterprise"], color: "#2563EB" },
  { id: "svc-android", title: "Android Development", description: "Aplikasi mobile native dengan Kotlin/Java", category: "Layanan", icon: Smartphone, href: "/services#android", tags: ["android", "mobile", "kotlin", "java", "firebase", "jetpack", "compose", "aplikasi"], color: "#10B981" },
  { id: "svc-devops", title: "DevOps Solutions", description: "CI/CD, containerization, cloud infrastructure", category: "Layanan", icon: Cloud, href: "/services#devops", tags: ["devops", "docker", "kubernetes", "ci/cd", "cloud", "aws", "gcp", "azure", "server", "infrastructure", "deploy"], color: "#F97316" },
  { id: "svc-uiux", title: "UI/UX Design", description: "Design thinking, wireframe, prototype, design system", category: "Layanan", icon: Palette, href: "/services#uiux", tags: ["ui", "ux", "design", "figma", "prototype", "wireframe", "desain", "user interface", "user experience"], color: "#8B5CF6" },

  // Portfolio Projects
  { id: "p-bankpro", title: "BankPro — Core Banking System", description: "Sistem core banking untuk PT Bank Nusantara", category: "Portfolio", icon: Landmark, href: "/portfolio", tags: ["bankpro", "core banking", "bank", "nusantara", "perbankan", "keuangan", "transaksi", "java", "spring"], color: "#2563EB" },
  { id: "p-shopverse", title: "ShopVerse — E-Commerce Platform", description: "Multi-vendor marketplace untuk TokoBesar.id", category: "Portfolio", icon: ShoppingCart, href: "/portfolio", tags: ["shopverse", "e-commerce", "marketplace", "toko", "online", "belanja"], color: "#2563EB" },
  { id: "p-medicare", title: "MediCare — Hospital Management", description: "Sistem manajemen rumah sakit terintegrasi", category: "Portfolio", icon: HeartPulse, href: "/portfolio", tags: ["medicare", "hospital", "rumah sakit", "kesehatan", "emr", "medis", "healthcare"], color: "#2563EB" },
  { id: "p-bankgo", title: "BankGo — Mobile Banking App", description: "Aplikasi mobile banking untuk 500K+ nasabah", category: "Portfolio", icon: Smartphone, href: "/portfolio", tags: ["bankgo", "mobile banking", "transfer", "pembayaran", "qr pay", "android"], color: "#10B981" },
  { id: "p-foodrush", title: "FoodRush — Food Delivery App", description: "Aplikasi delivery makanan dengan real-time tracking", category: "Portfolio", icon: Smartphone, href: "/portfolio", tags: ["foodrush", "food delivery", "makanan", "delivery", "ojek online", "android"], color: "#10B981" },
  { id: "p-mediapp", title: "MediApp — Healthcare Patient App", description: "Booking appointment, telemedicine, pengingat obat", category: "Portfolio", icon: Smartphone, href: "/portfolio", tags: ["mediapp", "healthcare", "pasien", "telemedicine", "booking", "dokter", "android"], color: "#10B981" },
  { id: "p-autodeploy", title: "AutoDeploy — CI/CD FinTech", description: "Pipeline CI/CD otomatis untuk FinTech", category: "Portfolio", icon: Cloud, href: "/portfolio", tags: ["autodeploy", "ci/cd", "fintech", "pipeline", "deployment", "devops", "jenkins"], color: "#F97316" },
  { id: "p-govcloud", title: "GovCloud — Cloud Migration", description: "Migrasi infrastruktur pemerintah ke cloud", category: "Portfolio", icon: Building2, href: "/portfolio", tags: ["govcloud", "cloud", "migrasi", "pemerintah", "government", "kominfo", "terraform"], color: "#F97316" },
  { id: "p-infrawatch", title: "InfraWatch — Infra Monitoring", description: "Platform monitoring infrastruktur 24/7", category: "Portfolio", icon: Cloud, href: "/portfolio", tags: ["infrawatch", "monitoring", "infrastruktur", "prometheus", "grafana", "alerting"], color: "#F97316" },
  { id: "p-bankui", title: "BankUI — Dashboard Redesign", description: "Redesign dashboard internal bank", category: "Portfolio", icon: Palette, href: "/portfolio", tags: ["bankui", "dashboard", "redesign", "bank", "figma", "ui", "ux"], color: "#8B5CF6" },
  { id: "p-edudesign", title: "EduDesign — E-Learning Design", description: "Design platform e-learning dengan gamification", category: "Portfolio", icon: GraduationCap, href: "/portfolio", tags: ["edudesign", "e-learning", "pendidikan", "gamification", "belajar", "edukasi"], color: "#8B5CF6" },
  { id: "p-tripcraft", title: "TripCraft — Travel App Prototype", description: "Prototype high-fidelity aplikasi travel", category: "Portfolio", icon: Palette, href: "/portfolio", tags: ["tripcraft", "travel", "wisata", "prototype", "ar guide", "itinerary"], color: "#8B5CF6" },

  // Industries
  { id: "ind-banking", title: "Banking & Finance", description: "Solusi teknologi untuk industri perbankan dan keuangan", category: "Industri", icon: Landmark, href: "/services", tags: ["bank", "banking", "keuangan", "finance", "fintech", "perbankan"], color: "var(--vto-cta)" },
  { id: "ind-health", title: "Healthcare", description: "Sistem kesehatan dan rumah sakit digital", category: "Industri", icon: HeartPulse, href: "/services", tags: ["health", "healthcare", "kesehatan", "rumah sakit", "hospital", "medis"], color: "var(--vto-cta)" },
  { id: "ind-gov", title: "Government", description: "E-Government dan layanan publik digital", category: "Industri", icon: Building2, href: "/services", tags: ["government", "pemerintah", "e-gov", "publik"], color: "var(--vto-cta)" },
  { id: "ind-retail", title: "Retail & E-Commerce", description: "Platform e-commerce dan sistem retail", category: "Industri", icon: ShoppingCart, href: "/services", tags: ["retail", "e-commerce", "toko", "belanja", "marketplace"], color: "var(--vto-cta)" },
  { id: "ind-edu", title: "Education", description: "Platform e-learning dan sistem pendidikan", category: "Industri", icon: GraduationCap, href: "/services", tags: ["education", "pendidikan", "e-learning", "sekolah", "universitas", "belajar"], color: "var(--vto-cta)" },
  { id: "ind-mfg", title: "Manufacturing", description: "Sistem manufaktur dan industri 4.0", category: "Industri", icon: Factory, href: "/services", tags: ["manufacturing", "manufaktur", "industri", "pabrik", "produksi"], color: "var(--vto-cta)" },

  // Dashboard quick links
  { id: "dash-admin", title: "Admin Dashboard", description: "Kelola proyek, users, dan konten CMS", category: "Dashboard", icon: Shield, href: "/admin", tags: ["admin", "dashboard", "kelola", "manage", "panel"], color: "#EF4444" },
  { id: "dash-user", title: "User Dashboard", description: "Lihat status proyek dan informasi akun", category: "Dashboard", icon: LayoutDashboard, href: "/dashboard", tags: ["user", "dashboard", "proyek saya", "akun"], color: "#8B5CF6" },
  { id: "dash-settings", title: "Settings", description: "Pengaturan akun dan preferensi", category: "Dashboard", icon: Settings, href: "/admin/settings", tags: ["settings", "pengaturan", "konfigurasi", "profil"], color: "var(--vto-text-muted)" },
];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some(t => t.includes(q)) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    results.forEach(r => {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    });
    return groups;
  }, [results]);

  const handleSelect = useCallback((href: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(href);
  }, [router, onOpenChange]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  // Global Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        onClick={() => onOpenChange(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl rounded-2xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-[var(--vto-border)] px-5 py-4">
            <Search className="h-5 w-5 text-[var(--vto-text-dim)] shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari layanan, proyek, industri, halaman..."
              className="flex-1 bg-transparent text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:outline-none"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-1 rounded-md border border-[var(--vto-border)] px-2 py-0.5 text-[10px] font-mono text-[var(--vto-text-dim)] hover:text-white transition-colors cursor-pointer"
            >
              X
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto px-2 py-2">
            {!query.trim() ? (
              <div className="px-4 py-12 text-center">
                <Search className="mx-auto h-10 w-10 text-[var(--vto-border)] mb-3" />
                <p className="text-sm font-mono text-[var(--vto-text-dim)]">Ketik untuk mencari konten IT Consultant</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {["Java", "Angular", "Banking", "DevOps", "UI/UX", "Android"].map(t => (
                    <button key={t} onClick={() => setQuery(t)} className="rounded-lg border border-[var(--vto-border)] px-3 py-1.5 text-[10px] font-mono text-[var(--vto-text-dim)] hover:border-[var(--vto-primary)] hover:text-[var(--vto-primary)] transition-all cursor-pointer">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-mono text-[var(--vto-text-dim)]">Tidak ada hasil untuk &ldquo;<span className="text-white">{query}</span>&rdquo;</p>
                <p className="mt-2 text-xs font-mono text-[var(--vto-text-dim)]">Coba kata kunci lain seperti: Java, Banking, DevOps</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--vto-text-dim)]">
                    {category}
                  </div>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-[var(--vto-bg-elevated)] group cursor-pointer"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${item.color} 15%, transparent)` }}>
                        <item.icon className="h-4 w-4" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-sans font-medium text-white truncate">{item.title}</div>
                        <div className="text-[11px] font-mono text-[var(--vto-text-dim)] truncate">{item.description}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--vto-text-dim)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[var(--vto-border)] px-5 py-2.5">
            <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--vto-text-dim)]">
              <span>Navigate <kbd className="rounded border border-[var(--vto-border)] px-1 py-0.5 mx-0.5">↑↓</kbd></span>
              <span>Open <kbd className="rounded border border-[var(--vto-border)] px-1 py-0.5 mx-0.5">↵</kbd></span>
              <span>Close <kbd className="rounded border border-[var(--vto-border)] px-1 py-0.5 mx-0.5">X</kbd></span>
            </div>
            <span className="text-[10px] font-mono text-[var(--vto-text-dim)]">{results.length} hasil</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Compact search trigger button
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-3 py-1.5 text-xs font-mono text-[var(--vto-text-dim)] transition-all hover:border-[var(--vto-primary)] hover:text-white cursor-pointer"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Cari...</span>
    </button>
  );
}
