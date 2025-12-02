import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient | null {
  const URL = (import.meta as any).env?.VITE_SUPABASE_URL ?? (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL;
  const KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!URL || !KEY) {
    console.error("Supabase env vars missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local");
    return null;
  }
  return createClient(URL as string, KEY as string);
}
