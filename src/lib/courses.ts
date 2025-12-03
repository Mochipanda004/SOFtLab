import { getSupabase } from "@/lib/supabase/client";
import { featuredCourses } from "@/mock/courses";

export async function fetchCourses() {
  const supabase = getSupabase();
  if (!supabase) return featuredCourses;
  const { data, error } = await supabase.from("courses").select("*");
  if (error || !data || data.length === 0) {
    console.warn("Courses from mock", { error });
    return featuredCourses;
  }
  console.log("Courses from Supabase", { count: data.length });
  return data;
}

export async function fetchCourseById(id: string) {
  const supabase = getSupabase();
  if (!supabase) return featuredCourses.find((c) => c.id === id) ?? null;
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();
  if (error) {
    console.warn("Course from mock", { id, error });
    return featuredCourses.find((c) => c.id === id) ?? null;
  }
  return data;
}

export async function enrollInCourse(courseId: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase no configurado");
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) throw new Error("Debes iniciar sesión para inscribirte");
  const { error } = await supabase
    .from("enrollments")
    .insert({ course_id: courseId, student_id: userId, status: "active" });
  if (error) {
    console.error("Enrollment error", JSON.stringify(error, null, 2));
    throw new Error(error.message || "Error de inscripción");
  }
  return true;
}

export async function joinWaitlist(courseId: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase no configurado");
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) throw new Error("Usuario no autenticado");
  const { error } = await supabase.from("waitlists").insert({ course_id: courseId, user_id: userId });
  if (error) throw new Error(error.message);
  return true;
}
