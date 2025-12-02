"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/hooks/useAuthMock";
import type { LoginPayload } from "@/types/auth";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await login(data);
      toast.success("Inicio de sesión exitoso");
      const isAdmin = res.user.role === "teacher" || res.user.role === "admin";
      router.push(isAdmin ? "/admin/dashboard" : "/student/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Error al iniciar sesión");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-gray-600">Accede a tu cuenta</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-4"
          aria-labelledby="login-title"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="mt-1 w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="mt-1 w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}
