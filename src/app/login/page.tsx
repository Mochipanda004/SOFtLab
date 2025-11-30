import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMock } from "@/hooks/useAuthMock";

const loginSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthMock();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const onSubmit = async (data: LoginForm) => {
    try {
      const u = await login({ email: data.email, password: data.password });
      if (u.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <div className="absolute top-8 flex flex-col items-center">
        <div className="rounded-full p-5 bg-gradient-to-b from-blue-500 to-purple-500">
          <span className="text-white text-2xl">♪</span>
        </div>
        <div className="mt-4 text-blue-600 text-sm">Academia de Música</div>
        <div className="mt-2 text-gray-600 text-sm">Melody Labs</div>
      </div>

      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl px-8 py-10">
        <h1 className="text-center text-sm font-medium text-gray-900">Iniciar Sesión</h1>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label className="block text-sm text-gray-900">Correo Electrónico</label>
            <input
              type="email"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
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
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="text-sm text-blue-600">¿Olvidaste tu contraseña?</div>

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

        <div className="mt-6 flex items-center">
          <div className="h-px w-full bg-gray-200" />
          <span className="mx-3 text-sm text-gray-500">O continúa con</span>
          <div className="h-px w-full bg-gray-200" />
        </div>

        <button className="mt-6 w-full h-10 rounded-lg border border-gray-200 text-sm flex items-center justify-center gap-2">
          <span className="text-gray-700">G</span>
          <span className="text-gray-900">Continuar con Google</span>
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? {" "}
          <Link to="/register" className="text-blue-600">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}

