import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const URL = (import.meta as any).env?.VITE_SUPABASE_URL;
  const KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  if (!URL || !KEY) {
    console.error("Variables de entorno de Supabase faltantes: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local");
    return null;
  }
  cached = createClient(URL as string, KEY as string);
  return cached;
}
