"use client";

import { useState, useEffect } from "react";
import {  getSupabase  } from "../../../../lib/supabase";

export default function CreateClient({
  editId,
}: {
  editId?: string;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!editId) return;

    async function load() {
   const supabase = getSupabase();
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", editId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setExcerpt(data.excerpt);
        setCategory(data.category);
        setSelectedTags(data.tags || []);
        setIsEdit(true);
      }
    }

    load();
  }, [editId]);

  return (
    <div className="p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 w-full mt-2"
      />
    </div>
  );
}