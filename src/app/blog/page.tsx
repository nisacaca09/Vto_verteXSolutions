"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Eye, ArrowRight, User, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { getSupabase, type Blog } from "../../lib/supabase";

const categories = [
  "All",
  "IT Solutions",
  "Tutorial",
  "Case Study",
  "Company News",
  "Tips & Tricks",
];

const categoryColors: Record<string, string> = {
  "IT Solutions": "#2563EB",
  "Tutorial": "#10B981",
  "Case Study": "#F97316",
  "Company News": "#F59E0B",
  "Tips & Tricks": "#8B5CF6",
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
     const supabase = getSupabase();
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (data) setArticles(data);
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = activeCat === "All" || a.category === activeCat;
      const matchSearch =
        !search || a.title.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [activeCat, search, articles]);

  const featured = articles[0];

  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <div className="noise-overlay" />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] font-mono tracking-[4px] text-[var(--vto-cta)] uppercase">
              Blog & Insights
            </span>

            <h1 className="mt-3 font-sans text-4xl font-bold text-white sm:text-5xl">
              VTO Blog
            </h1>

            <p className="mt-4 max-w-xl text-sm font-mono text-[var(--vto-text-muted)]">
              Artikel, tutorial, dan insights seputar teknologi dan IT consulting.
            </p>
          </motion.div>

          {/* SEARCH */}
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vto-text-dim)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-3 pl-11 pr-4 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${featured.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden transition-all hover:border-[var(--vto-primary)]/30 cursor-pointer"
              >
                <div className="grid md:grid-cols-5">
                  {/* IMAGE */}
                  <div
                    className="md:col-span-2 h-48 md:h-auto flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${
                        categoryColors[featured.category] || "#2563EB"
                      }22, ${
                        categoryColors[featured.category] || "#2563EB"
                      }08)`,
                    }}
                  >
                    <span
                      className="font-sans text-5xl font-bold opacity-10"
                      style={{ color: categoryColors[featured.category] }}
                    >
                      VTO
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="md:col-span-3 p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full px-3 py-1 text-[10px] font-mono bg-[var(--vto-cta)]/15 text-[var(--vto-cta)] font-semibold">
                        Featured
                      </span>
                      <span className="rounded-full px-3 py-1 text-[10px] font-mono bg-[var(--vto-primary)]/10 text-[var(--vto-primary)]">
                        {featured.category}
                      </span>
                    </div>

                    <h2 className="font-sans text-2xl font-bold text-white mb-3">
                      {featured.title}
                    </h2>

                    <p className="text-sm font-mono text-[var(--vto-text-dim)] mb-4">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--vto-text-dim)]">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.read_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {featured.views}
                      </span>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-[var(--vto-primary)]">
                      Baca Selengkapnya <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER */}
      <section className="border-y border-[var(--vto-border)] bg-[var(--vto-bg-card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={cn(
                  "shrink-0 rounded-lg px-4 py-2 text-xs font-mono transition-all border",
                  activeCat === c
                    ? "bg-[var(--vto-primary)]/10 text-[var(--vto-primary)] border-[var(--vto-primary)]/30"
                    : "text-[var(--vto-text-dim)] border-transparent hover:text-white hover:bg-[var(--vto-bg-elevated)]"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-[var(--vto-bg-card)] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <Link key={a.slug} href={`/blog/${a.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden hover:border-[var(--vto-primary)]/30 transition-all cursor-pointer"
                  >
                    {/* THUMB */}
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${
                          categoryColors[a.category] || "#2563EB"
                        }18, ${
                          categoryColors[a.category] || "#2563EB"
                        }05)`,
                      }}
                    >
                      <span className="text-3xl font-bold opacity-10 text-white">
                        VTO
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <span className="text-[9px] font-mono text-[var(--vto-primary)]">
                        {a.category}
                      </span>

                      <h3 className="mt-2 text-sm font-semibold text-white line-clamp-2">
                        {a.title}
                      </h3>

                      <p className="mt-2 text-[11px] text-[var(--vto-text-dim)] line-clamp-2">
                        {a.excerpt}
                      </p>

                      <div className="mt-4 flex justify-between text-[10px] text-[var(--vto-text-dim)]">
                        <span>{a.author}</span>
                        <span className="flex gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {a.read_time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {a.views}
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-[var(--vto-text-dim)]">
                Tidak ada artikel ditemukan.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}