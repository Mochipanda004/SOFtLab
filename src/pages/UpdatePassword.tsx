import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      setError("Configuración de Supabase no encontrada");
      setLoading(false);
      return;
    }
    const { error: updError } = await supabase.auth.updateUser({ password });
    if (updError) {
      setError(updError.message || "No se pudo actualizar la contraseña");
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl px-8 py-10">
        <h1 className="text-center text-sm font-medium text-gray-900">Restablecer contraseña</h1>
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-gray-900">Nueva contraseña</label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-900">Confirmar contraseña</label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-gradient-to-b from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Actualizando…" : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

