import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSupabase } from "@/lib/supabase/client";
import { getCurrentUser, getProfileByUserId } from "@/lib/auth";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }
      const profile = await getProfileByUserId(user.id);
      let name = profile?.full_name ?? "";
      if (!name) {
        const email = user.email ?? "";
        if (email.toLowerCase() === "profesor@melodylabs.com") {
          name = "Profesor";
        } else {
          const local = email.split("@")[0] || "";
          name = local ? local.charAt(0).toUpperCase() + local.slice(1) : "";
        }
      }
      setDisplayName(name);
      setLoading(false);
    })();
  }, [navigate]);

  const supabase = getSupabase();
  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  const tabs = [
    { label: "Resumen", href: "/profesor/resumen" },
    { label: "Mi Horario", href: "/profesor/horario" },
    { label: "Asistencia", href: "/profesor/asistencia" },
    { label: "Materiales", href: "/profesor/materiales" },
    { label: "Evaluaciones", href: "/profesor/evaluaciones" },
    { label: "Calificaciones", href: "/profesor/calificaciones" },
    { label: "Tareas", href: "/profesor/tareas" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-indigo-600 font-semibold">Melody Labs</a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{loading ? "" : displayName}</span>
            <button onClick={signOut} className="text-sm text-gray-500 hover:text-gray-900">Salir</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl bg-gray-100 p-1 flex items-center gap-2 overflow-hidden">
          {tabs.map((t) => {
            const active = location.pathname === t.href || (t.href.endsWith("/resumen") && (location.pathname === "/profesor" || location.pathname === "/profesor/resumen"));
            return (
              <button
                key={t.href}
                onClick={() => navigate(t.href)}
                className={`flex-1 h-8 rounded-2xl text-sm ${active ? "bg-white text-gray-900 font-medium" : "text-gray-700"}`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="mt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
