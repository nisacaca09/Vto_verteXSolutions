import { createClient } from "@supabase/supabase-js";

let supabaseInstance: any = null;

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabaseInstance;
}

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  author: string;
  read_time: string;
  views: number;
  published_at: string | null;
};