import { getSupabase } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  full_name: string | null;
  role: "admin" | "teacher" | "student";
  avatar_url: string | null;
};

export async function getCurrentUser() {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function getProfileByUserId(userId: string) {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, avatar_url")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("Profiles query error", JSON.stringify(error, null, 2));
    return null;
  }
  return data as Profile;
}

export async function getUserRole() {
  const result = await getCurrentUserAndRole();
  return result?.role ?? null;
}

export async function getCurrentUserAndRole() {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error obteniendo usuario", userError);
    return null;
  }

  const email = (user.email || "").toLowerCase();
  const emailFallbackRole = (() => {
    if (email === "admin@melodylabs.com" || email === "elkinrojasortiz07@gmail.com") return "admin" as const;
    if (email === "profesor@melodylabs.com") return "teacher" as const;
    if (email === "estudiante@melodylabs.com") return "student" as const;
    return null;
  })();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role, rol, avatar_url")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error obteniendo perfil", profileError);
    if (emailFallbackRole) return { user, role: emailFallbackRole };
    return { user, role: "student" as const };
  }

  const rawRole = (profile as any)?.role ?? (profile as any)?.rol ?? "student";
  let role: "admin" | "teacher" | "student" = "student";
  if (rawRole === "admin") role = "admin";
  else if (rawRole === "teacher" || rawRole === "profesor") role = "teacher";
  else role = "student";

  if (emailFallbackRole) role = emailFallbackRole;

  return { user, role };
}
