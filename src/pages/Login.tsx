import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSupabase } from "@/lib/supabase/client";
import { getCurrentUserAndRole } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Configuración de Supabase no encontrada");
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        const msg = error.message || "Error de inicio de sesión";
        setError(msg);
        return;
      }
      const info = await getCurrentUserAndRole();
      if (!info?.user)
        throw new Error("No se pudo obtener el usuario tras el login");
      console.log("Login OK", { userId: info.user.id, role: info.role });
      if (info.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (info.role === "teacher") {
        navigate("/profesor", { replace: true });
      } else {
        navigate("/estudiante", { replace: true });
      }
    } catch (e: any) {
      const raw = e?.message ?? "Error";
      if (/rate limit/i.test(raw)) {
        setError(
          "Has intentado iniciar sesión demasiadas veces seguidas. Espera unos minutos e inténtalo de nuevo."
        );
      } else {
        setError(raw);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <a href="/" className="absolute top-4 left-4 text-blue-600 font-semibold">Melody Labs</a>
      <div className="absolute top-8 flex flex-col items-center">
        <div className="rounded-full p-5 bg-gradient-to-b from-blue-500 to-purple-500">
          <span className="text-white text-2xl">♪</span>
        </div>
        <div className="mt-4 text-blue-600 text-sm">Academia de Música</div>
        <div className="mt-2 text-gray-600 text-sm">Melody Labs</div>
      </div>

      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl px-8 py-10">
        <h1 className="text-center text-sm font-medium text-gray-900">
          Iniciar Sesión
        </h1>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label className="block text-sm text-gray-900">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-900">Contraseña</label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={async () => {
              setError(null);
              const supabase = getSupabase();
              if (!supabase) {
                setError("Configuración de Supabase no encontrada");
                return;
              }
              const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value || "";
              if (!email) {
                setError("Ingresa tu correo en el campo de arriba para enviar el enlace de recuperación");
                return;
              }
              const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/update-password",
              });
              if (resetError) {
                setError(resetError.message || "No se pudo enviar el correo de recuperación");
              } else {
                setError("Te enviamos un correo para restablecer tu contraseña");
              }
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-gradient-to-b from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Ingresando…" : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-6 flex items-center flex-nowrap">
          <div className="h-px w-full bg-gray-200" />
          <span className="mx-3 text-sm text-gray-500 whitespace-nowrap">O continúa con</span>
          <div className="h-px w full bg-gray-200" />
        </div>

        <button className="mt-6 w-full h-10 rounded-lg border border-gray-200 text-sm flex items-center justify-center gap-2">
          <span className="text-gray-700">G</span>
          <span className="text-gray-900">Continuar con Google</span>
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
