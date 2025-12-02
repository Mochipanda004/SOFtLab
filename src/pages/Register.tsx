import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSupabase } from "@/lib/supabase/client";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Ingresa tu nombre" }),
    email: z.string().email({ message: "Ingresa un correo válido" }),
    role: z
      .string({ required_error: "Selecciona tu rol" })
      .refine((v) => v === "student" || v === "teacher", {
        message: "Selecciona tu rol",
      }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    confirm: z.string().min(6, { message: "Confirma tu contraseña" }),
    terms: z.literal(true, {
      errorMap: () => ({
        message: "Debes aceptar la Política de Tratamiento de Datos",
      }),
    }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema), mode: "onBlur" });

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Configuración de Supabase no encontrada");
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      });
      if (error) throw new Error(error.message);
      navigate("/login?registered=1");
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <div className="absolute top-4 flex flex-col items-center">
        <div className="rounded-full p-5 bg-gradient-to-b from-blue-500 to-purple-500">
          <span className="text-white text-2xl">♪</span>
        </div>
        <div className="mt-4 text-blue-600 text-base md:text-lg">Academia de Música</div>
        <div className="mt-1 text-blue-600 text-base md:text-lg">Melody Labs</div>
      </div>

      <div className="mx-4 mt-24 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl px-8 py-10">
        <h1 className="mt-6 text-center text-sm font-medium text-gray-900">Crear Cuenta</h1>

        <div className="mt-6">
          <div className="h-px w-full bg-gray-200" />
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label className="block text-sm text-gray-900">Nombre Completo</label>
            <input
              type="text"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="Juan Pérez"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-900">Correo Electrónico</label>
            <input
              type="email"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-900">Tipo de Usuario</label>
            <select
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              {...register("role")}
            >
              <option value="">Selecciona tu rol</option>
              <option value="student">Estudiante</option>
              <option value="teacher">Profesor</option>
            </select>
            {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-900">Contraseña</label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="Mínimo 6 caracteres"
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-900">Confirmar Contraseña</label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              placeholder="Repite tu contraseña"
              {...register("confirm")}
            />
            {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm.message}</p>}
          </div>

          <label className="mt-1 flex items-start gap-2 text-sm text-gray-700">
            <input type="checkbox" className="mt-1 h-4 w-4" {...register("terms")} />
            <span>Acepto la Política de Tratamiento de Datos (Ley Habeas Data)</span>
          </label>
          {errors.terms && <p className="text-xs text-red-600">{errors.terms.message as string}</p>}

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-gradient-to-b from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Creando…" : "Crear Cuenta"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-600">Inicia sesión aquí</Link>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad</p>
      </div>
    </div>
  );
}
