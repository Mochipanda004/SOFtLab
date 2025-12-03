# Uso del Frontend

## Rutas
- `/` Home
- `/cursos` Catálogo
- `/cursos/:id` Detalle
- `/login` Login
- `/register` Registro
- `/admin/dashboard` Panel admin

## Autenticación en cliente
- Login: email y password; redirige según rol (`profiles.role`).
- Registro: crea usuario con `name` en metadata; admin/teacher se asignan desde backend.

## Estados y errores
- Formularios muestran errores y bloquean botón en carga.
- Si faltan variables VITE de Supabase, las vistas no rompen; acciones muestran mensaje de configuración.

## Integración de datos
- Cursos: carga desde Supabase si disponible; fallback a mocks.
- Inscripción: inserta en `enrollments` y muestra error si tabla no existe o falta configuración.

## Desarrollo
- Variables: `.env.local` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- Arranque: `npm install` + `npm run dev` (Vite).

