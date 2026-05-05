"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Clock, Send, CheckCircle, Tag } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { supabase, type Blog } from "../../../../lib/supabase";

const categories = ["IT Solutions", "Tutorial", "Case Study", "Company News", "Tips & Tricks"];
const availableTags = ["Java", "Angular", "PostgreSQL", "Kotlin", "DevOps", "Docker", "Kubernetes", "AWS", "UI/UX", "Figma", "Spring Boot", "Firebase", "Mobile", "Cloud", "Security", "IT Solution"];

// Fungsi untuk generate slug dari title
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function CreateContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("Admin VTO");
  const [readTime, setReadTime] = useState("5 min");
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Auto-generate slug saat title berubah
  useEffect(() => {
    if (!isEdit) {
      setSlug(generateSlug(title));
    }
  }, [title, isEdit]);

  // Load artikel jika edit mode
  useEffect(() => {
    if (editId) {
      async function loadArticle() {
        const { data } = await supabase.from("blogs").select("*").eq("id", editId).single();
        if (data) {
          setTitle(data.title);
          setSlug(data.slug || generateSlug(data.title));
          setContent(data.content);
          setExcerpt(data.excerpt);
          setCategory(data.category);
          setSelectedTags(data.tags || []);
          setAuthor(data.author);
          setReadTime(data.read_time);
          setIsEdit(true);
        }
      }
      loadArticle();
    }
  }, [editId]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  async function handleSave(status: "draft" | "published") {
    if (!title || !content || !excerpt || !category) {
      alert("Mohon isi Title, Excerpt, Content, dan Category.");
      return;
    }

    setSaving(true);

    const articleData = {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      category,
      tags: selectedTags,
      status,
      author,
      read_time: readTime,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    let result;

    if (isEdit && editId) {
      result = await supabase.from("blogs").update(articleData).eq("id", editId);
    } else {
      result = await supabase.from("blogs").insert(articleData);
    }

    console.log("SUPABASE RESULT:", result);

    if (result.error) {
      alert(result.error.message);
      console.error(result.error);
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => router.push("/admin/content"), 1500);
  }

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-xs font-mono text-[var(--vto-text-muted)] hover:text-white transition-colors cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Editor
          </button>
          <span className="text-[10px] font-mono text-[var(--vto-cta)] bg-[var(--vto-cta)]/10 px-3 py-1 rounded-full">Preview Mode</span>
        </div>
        <article className="max-w-3xl mx-auto">
          {category && <span className="rounded-full px-3 py-1 text-[10px] font-mono bg-[var(--vto-primary)]/10 text-[var(--vto-primary)]">{category}</span>}
          <h1 className="mt-4 font-sans text-3xl font-bold text-white leading-tight">{title || "Judul Artikel"}</h1>
          <p className="mt-4 text-sm font-mono text-[var(--vto-text-muted)]">{excerpt || "Excerpt..."}</p>
          <div className="mt-6 border-t border-[var(--vto-border)] pt-6 text-sm font-mono text-[var(--vto-text-muted)] leading-[1.9] whitespace-pre-wrap">{content || "Konten artikel..."}</div>
          {selectedTags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--vto-border)] pt-6">
              {selectedTags.map(t => <span key={t} className="rounded-md border border-[var(--vto-border)] px-2.5 py-1 text-[10px] font-mono text-[var(--vto-text-dim)]">{t}</span>)}
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/content" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--vto-border)] text-[var(--vto-text-dim)] hover:text-white hover:border-[var(--vto-primary)] transition-all cursor-pointer"><ArrowLeft className="h-4 w-4" /></Link>
          <div>
            <h1 className="font-sans text-xl font-bold text-white">{isEdit ? "Edit Artikel" : "Buat Artikel Baru"}</h1>
            <p className="text-[10px] font-mono text-[var(--vto-text-dim)]">Content Management System</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 rounded-lg border border-[var(--vto-border)] px-4 py-2 text-xs font-mono text-[var(--vto-text-muted)] hover:border-[var(--vto-primary)] hover:text-white transition-all cursor-pointer"><Eye className="h-3.5 w-3.5" /> Preview</button>
          <button onClick={() => handleSave("draft")} disabled={saving} className="flex items-center gap-2 rounded-lg border border-[var(--vto-border)] px-4 py-2 text-xs font-mono text-[var(--vto-text-muted)] hover:border-[var(--vto-warning)] hover:text-[var(--vto-warning)] transition-all cursor-pointer disabled:opacity-50"><Clock className="h-3.5 w-3.5" /> Draft</button>
          <button onClick={() => handleSave("published")} disabled={saving || saved} className="flex items-center gap-2 rounded-lg bg-[var(--vto-cta)] px-4 py-2 text-xs font-sans font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)] disabled:opacity-50 cursor-pointer">
            {saved ? <><CheckCircle className="h-3.5 w-3.5" /> Saved!</> : saving ? "Saving..." : <><Send className="h-3.5 w-3.5" /> Publish</>}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul Artikel" className="w-full rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-5 py-4 text-xl font-sans font-bold text-white placeholder:text-[var(--vto-text-dim)]/50 focus:border-[var(--vto-primary)] focus:outline-none transition-all" />

          {/* Slug preview */}
          {title && (
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-mono text-[var(--vto-text-dim)]">URL:</span>
              <span className="text-[10px] font-mono text-[var(--vto-primary)]">/blog/{slug}</span>
            </div>
          )}

          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Tulis excerpt / ringkasan artikel..." rows={2} className="w-full rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-5 py-3 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)]/50 focus:border-[var(--vto-primary)] focus:outline-none transition-all resize-none" />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Tulis konten artikel Anda di sini..." rows={20} className="w-full rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] px-5 py-4 text-sm font-mono text-white placeholder:text-[var(--vto-text-dim)]/40 focus:border-[var(--vto-primary)] focus:outline-none transition-all resize-y leading-relaxed" />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--vto-border)]"><h3 className="text-xs font-sans font-semibold text-white">Kategori *</h3></div>
            <div className="p-5">
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2.5 text-xs font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none cursor-pointer">
                <option value="">Pilih kategori...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--vto-border)]"><h3 className="text-xs font-sans font-semibold text-white">Detail</h3></div>
            <div className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-mono text-[var(--vto-text-dim)] uppercase tracking-wider mb-1.5 block">Author</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[var(--vto-text-dim)] uppercase tracking-wider mb-1.5 block">Read Time</label>
                <input type="text" value={readTime} onChange={e => setReadTime(e.target.value)} className="w-full rounded-lg border border-[var(--vto-border)] bg-[var(--vto-bg)] px-3 py-2 text-xs font-mono text-white focus:border-[var(--vto-primary)] focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--vto-border)] bg-[var(--vto-bg-card)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--vto-border)]"><h3 className="text-xs font-sans font-semibold text-white flex items-center gap-2"><Tag className="h-3.5 w-3.5 text-[var(--vto-cta)]" /> Tags</h3></div>
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map(t => (
                  <button key={t} onClick={() => toggleTag(t)} className={cn(
                    "rounded-md px-2.5 py-1 text-[10px] font-mono transition-all cursor-pointer border",
                    selectedTags.includes(t)
                      ? "bg-[var(--vto-primary)]/15 text-[var(--vto-primary)] border-[var(--vto-primary)]/30"
                      : "text-[var(--vto-text-dim)] border-[var(--vto-border)] hover:border-[var(--vto-primary)]/30"
                  )}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}