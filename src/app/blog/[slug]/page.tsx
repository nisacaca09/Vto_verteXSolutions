"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { supabase, type Blog } from "../../../lib/supabase";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      console.log("DETAIL:", data, error);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setArticle(data);
      setLoading(false);
    }

    if (slug) fetchDetail();
  }, [slug]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!article) {
    return <div className="text-white p-10">Artikel tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--vto-bg)]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-white">
          {article.title}
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          {article.author} • {article.read_time}
        </p>

        <div className="mt-6 text-gray-300 whitespace-pre-line">
          {article.content}
        </div>
      </div>

      <Footer />
    </div>
  );
}