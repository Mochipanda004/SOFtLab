## Objetivos y Alcance
- Implementar autenticación/registro con roles: estudiante, profesor, administrador (admin con cuenta predefinida).
- Conectar frontend Vite/React con Supabase usando `import.meta.env.VITE_*`.
- Integrar UI existente (Home, Catálogo, Detalles, Admin) con backend, con errores y cargas manejadas.
- Validar login/registro, catálogo por rol, y dashboard básico.
- Entregar código limpio, validaciones front/back, manejo seguro de credenciales, y pruebas de integración.

## Arquitectura Técnica
- **Frontend**: Vite + React 18 + React Router + Tailwind; supabase-js (cliente) para auth y data.
- **Backend (Supabase)**: Auth gestionado por Supabase, Postgres con RLS, Edge Functions (opcional) para operaciones atómicas (matrículas / listas de espera).
- **Config**: `.env.local` con `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (solo claves públicas); no exponer service role en frontend.

## Modelo de Datos (Tablas)
- **profiles**: id (FK auth.users), name, role (admin|teacher|student), avatar_url.
- **instructors**: id, name, bio, avatar_url (si se separa de profiles para contenido público).
- **courses**: id, title, instrument, level, modality, image_url, instructor_id (FK), schedule_text, price, capacity, max_capacity, duration_months, certification_included (bool), materials_included (int), available (bool), description.
- **course_learning**: id, course_id (FK), item_text, sort_order.
- **course_program**: id, course_id (FK), item_text, sort_order.
- **course_requirements**: id, course_id (FK), item_text, sort_order.
- **enrollments**: id, course_id (FK), user_id (FK), status (active|completed|cancelled), enrolled_at.
- **waitlists**: id, course_id (FK), user_id (FK), joined_at.
- **audit_logs**: id, actor_id, action, resource, metadata, created_at.

## RLS y Roles
- **profiles**: cada usuario puede ver/editar su perfil; admin puede ver/editar todos.
- **courses**: lectura pública; escritura solo admin.
- **course_***: lectura pública; escritura admin.
- **enrollments**: usuario ve sus registros; admin/teacher pueden leer por curso.
- **waitlists**: usuario ve sus entradas; admin/teacher por curso.
- **Sembrado de roles**: trigger `handle_new_user()` que inserta `profiles` con `name` y `role` por defecto (student). Admin predefinido: crear usuario y setear `profiles.role='admin'` mediante SQL seed.

## Flujo de Autenticación
- **Registro (students/teachers)**:
  - Frontend: `supabase.auth.signUp({ email, password, options: { data: { name }}})`.
  - Backend: trigger crea `profiles` y setea `role='student'` por defecto; permitir que profesores seleccionen rol → validar con revisión admin o autoasignar `role='teacher'` si el formulario lo indica.
- **Login**:
  - Frontend: `supabase.auth.signInWithPassword`.
  - Redirecciones: admin → `/admin/dashboard`; teacher → `/`; student → `/`.
- **Admin predefinido**:
  - Crear usuario (correo/contraseña seguros) y marcar `profiles.role='admin'`.

## Conexión Supabase (Cliente)
- **Archivo**: `src/lib/supabase/client.ts`.
- **Implementación**:
  - Exponer `getSupabase()` que lee: `import.meta.env.VITE_SUPABASE_URL`, `import.meta.env.VITE_SUPABASE_ANON_KEY`.
  - Retornar cliente o `null` con log si faltan claves.
- **Variables**: `.env.local` con:
  - `VITE_SUPABASE_URL=https://<project>.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=<anon_key>`

## Integración Frontend–Backend
- **Mantenimiento UI**: conservar componentes actuales (Home, Catálogo, Detalle, Admin, Login, Registro).
- **Data fetching**:
  - Catálogo/Detalle: seleccionar datos desde tablas Supabase; mapear arrays `learning`, `program`, `requirements`.
  - Inscripciones: escribir en `enrollments`; si `available=false` o `capacity==0`, escribir en `waitlists`.
- **Manejo de estados**: loading + error en cada acción (login, registro, carga de cursos, inscripción).
- **Protección de rutas**: layout Admin con guard (verificar `profiles.role` en cliente y ocultar/redirect si no es admin).

## API/Funciones Opcionales (Edge Functions)
- **/enroll**: transacción para asegurar decremento de `capacity` y crear `enrollments` atomizado.
- **/join-waitlist**: insertar en `waitlists` con validaciones.
- **/course-upsert**: admin crea/edita curso y secciones relacionadas.
- Uso con `supabase.functions.invoke` desde frontend.

## Dashboard Administrativo Básico
- **Panel**: métricas de cursos, estudiantes, inscripciones activas, cursos “agotado”.
- **Gestiones**: CRUD de cursos, profesores, estudiantes; recursos (storage) si aplica.

## Manejo de Errores y Seguridad
- **Frontend**: mostrar mensajes claros en formularios y vistas; deshabilitar botones en loading; retry básico.
- **Tokens**: solo anon key en cliente; no exponer service role; validar sesión con `supabase.auth.getUser()`.
- **RLS**: garantizar que lectura/escritura cumplan permisos por rol.

## Validaciones
- **Frontend**: Zod + RHF para email, password (mín 6), nombre, aceptación de términos.
- **Backend**: constraints (NOT NULL, FK), triggers de consistencia (capacidad disponible), checks en Edge Functions.

## Pruebas de Integración
- **Casos**:
  - Registro estudiante y login; redirección correcta.
  - Registro profesor y login; permisos adecuados.
  - Admin login con cuenta predefinida.
  - Carga de catálogo y detalle; contenido mostrado.
  - Inscripción exitosa; cupos decrementan; estado en dashboard.
  - Lista de espera cuando el curso está agotado.
- **Herramientas**: pruebas manuales + scripts ligeros; opcional Playwright/Cypress.

## Entregables
- Frontend funcional con rutas y flujos.
- Supabase con tablas, RLS, triggers y (opcional) Edge Functions.
- Documentación:
  - Variables `.env.local` y cómo obtener claves.
  - SQL de creación de tablas y políticas.
  - Flujo de roles y guardas de ruta.
  - Cómo correr y validar.

## Plan de Implementación (Pasos)
1. Completar `.env.local` con `VITE_*` y verificar `getSupabase()`.
2. Crear/ajustar tablas y RLS en Supabase según modelo.
3. Sembrar admin y validar `profiles.role`.
4. Integrar lectura de cursos y detalle desde Supabase (reemplazar mocks progresivamente).
5. Conectar login y registro en cliente; redirecciones por rol.
6. Implementar inscripciones y lista de espera (cliente; opcional Edge Function).
7. Implementar guardas de rutas y métricas básicas en Admin.
8. Añadir manejo de errores y estados de carga.
9. Ejecutar pruebas de integración y documentar.

## Confirmación
- ¿Confirmas este plan para comenzar con la implementación paso a paso (primero autenticación/roles y modelo de datos en Supabase, luego integración de catálogo y panel administrativo)?