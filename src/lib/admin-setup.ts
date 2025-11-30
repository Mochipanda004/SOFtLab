import { createClient } from "@/lib/supabase";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function createDefaultAdmin() {
  const supabase = createClient();

  try {
    // Verificar si ya existe un administrador
    const { data: existingAdmin } = await supabase
      .from("perfiles")
      .select("id")
      .eq("rol", "admin")
      .maybeSingle();

    if (existingAdmin) {
      console.log("Ya existe un administrador en el sistema");
      return { success: false, message: "Ya existe un administrador" };
    }

    // Intentar crear el usuario con signUp
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: "elkinrojasortiz07@gmail.com",
      password: "AdminMelody2024!",
      options: {
        data: {
          nombre: "Administrador",
          apellido: "Melody Labs",
          rol: "admin",
        },
        emailRedirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/login`,
      },
    });

    if (authError) {
      console.error("Error al crear usuario admin:", authError);

      // Si el error es por email inválido, intentar con otro formato
      if (
        authError.message.includes("invalid") ||
        authError.message.includes("email")
      ) {
        console.log("Intentando con email alternativo...");

        const { data: altAuthData, error: altAuthError } =
          await supabase.auth.signUp({
            email: "melodylabs.admin@example.com",
            password: "AdminMelody2024!",
            options: {
              data: {
                nombre: "Administrador",
                apellido: "Melody Labs",
                rol: "admin",
              },
              emailRedirectTo: `${
                process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
              }/login`,
            },
          });

        if (altAuthError) {
          console.error("Error con email alternativo:", altAuthError);
          return { success: false, error: altAuthError.message };
        }

        if (altAuthData.user) {
          console.log(
            "Usuario administrador creado exitosamente con email alternativo"
          );
          console.log("Email: elkinrojasortiz07@gmail.com");
          console.log("Contraseña: AdminMelody2024!");

          return {
            success: true,
            message: "Administrador creado exitosamente",
            userId: altAuthData.user.id,
            email: "elkinrojasortiz07@gmail.com",
          };
        }
      }

      return { success: false, error: authError.message };
    }

    if (authData.user) {
      console.log("Usuario administrador creado exitosamente");
      console.log("Email: elkinrojasortiz07@gmail.com");
      console.log("Contraseña: AdminMelody2024!");
      console.log(
        "IMPORTANTE: Cambia la contraseña después del primer inicio de sesión"
      );

      return {
        success: true,
        message: "Administrador creado exitosamente",
        userId: authData.user.id,
        email: "elkinrojasortiz07@gmail.com",
      };
    }

    return { success: false, message: "No se pudo crear el usuario" };
  } catch (error) {
    console.error("Error en createDefaultAdmin:", error);
    return { success: false, error: "Error al crear administrador" };
  }
}

// Función para verificar si existe un administrador
export async function checkAdminExists() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("perfiles")
      .select("id")
      .eq("rol", "admin")
      .maybeSingle(); // Usar maybeSingle en lugar de single para evitar errores cuando no hay resultados

    if (error) {
      console.error("Error al verificar admin:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error en checkAdminExists:", error);
    return false;
  }
}