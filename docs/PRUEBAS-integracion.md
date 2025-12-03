# Pruebas de Integración (Manual)

## Flujo 1: Registro y Login
1. Abrir `/register` y registrar estudiante.
2. Redirección a `/login?registered=1`.
3. Login con credenciales; debe llevar a `/`.

## Flujo 2: Admin
1. Crear usuario admin en Supabase y setear `profiles.role='admin'`.
2. Login como admin; redirección a `/admin/dashboard`.
3. Navegación en panel y acceso a gestiones.

## Flujo 3: Catálogo
1. Abrir `/cursos`; ver grid y detalles.
2. Abrir `/cursos/:id`; visualizar secciones (acerca, programa, requisitos, profesor).

## Flujo 4: Inscripción y Lista de Espera
1. En curso disponible, probar `enrollInCourse(courseId)` desde UI (o consola).
2. Si curso agotado, probar `joinWaitlist(courseId)`.

## Configuración previa
- `.env.local` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- Esquema SQL ejecutado y políticas habilitadas.

