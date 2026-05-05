"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import { supabase, type Blog } from "../../../lib/supabase";

const categories = [
  "All",
  "IT Solutions",
  "Tutorial",
  "Case Study",
  "Company News",
  "Tips & Tricks",
];

type FilterStatus = "all" | "published" | "draft";

export default function ContentPage() {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    if (data) setArticles(data);
    setLoading(false);
  }

  async function deleteArticle(id: string) {
    if (!confirm("Yakin ingin hapus artikel ini?")) return;

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  async function toggleStatus(article: Blog) {
    const newStatus: Blog["status"] =
      article.status === "published" ? "draft" : "published";

    const updates = {
      status: newStatus,
      published_at:
        newStatus === "published"
          ? new Date().toISOString()
          : null,
    };

    const { error } = await supabase
      .from("blogs")
      .update(updates)
      .eq("id", article.id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setArticles((prev) =>
      prev.map((a) =>
        a.id === article.id
          ? {
              ...a,
              status: newStatus,
              published_at: updates.published_at,
            }
          : a
      )
    );
  }

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase());

      const matchCat =
        filterCat === "All" || a.category === filterCat;

      const matchStatus =
        filterStatus === "all" || a.status === filterStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [articles, search, filterCat, filterStatus]);

  const publishedCount = articles.filter(
    (a) => a.status === "published"
  ).length;

  const draftCount = articles.filter(
    (a) => a.status === "draft"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-white">
            Content Management
          </h1>
          <p className="mt-1 text-xs font-mono text-[var(--vto-text-dim)]">
            Kelola artikel dan konten blog VTO
          </p>
        </div>

        <Link
          href="/admin/content/create"
          className="flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-4 py-2.5 text-xs font-sans font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)]"
        >
          <Plus className="h-4 w-4" />
          Buat Artikel Baru
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Artikel",
            value: articles.length,
            icon: FileText,
            color: "var(--vto-primary)",
          },
          {
            label: "Published",
            value: publishedCount,
            icon: CheckCircle,
            color: "var(--vto-success)",
          },
          {
            label: "Draft",
            value: draftCount,
            icon: Clock,
            color: "var(--vto-warning)",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-4"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: `color-mix(in srgb, ${s.color} 15%, transparent)`,
              }}
            >
              <s.icon className="h-5 w-5" style={{ color: s.color }} />
            </div>

            <div>
              <div className="font-sans text-xl font-bold text-white">
                {s.value}
              </div>
              <div className="text-[10px] font-mono text-[var(--vto-text-dim)]">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vto-text-dim)]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] py-2 pl-9 pr-3 text-xs font-mono text-white placeholder:text-[var(--vto-text-dim)] focus:border-[var(--vto-primary)] focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as FilterStatus)
            }
            className="rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-white"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)]"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-sans text-sm font-semibold text-white">
                    {a.title}
                  </h3>

                  <p className="mt-1 text-[11px] font-mono text-[var(--vto-text-dim)]">
                    {a.excerpt}
                  </p>

                  <div className="mt-2 flex items-center gap-4 text-[10px] font-mono text-[var(--vto-text-dim)]">
                    <span>{a.author}</span>
                    <span>{a.read_time}</span>
                    <span>{a.views} views</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/blog/${a.slug}`}>
                    <Eye className="h-4 w-4" />
                  </Link>

                  <Link href={`/admin/content/edit/${a.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>

                  <button onClick={() => deleteArticle(a.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] py-16 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-[var(--vto-border)]" />
              <p className="text-sm font-mono text-[var(--vto-text-dim)]">
                Tidak ada artikel ditemukan
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}