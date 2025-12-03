# Configuración Supabase y Semillas

## Variables de entorno (Vite)
Añade a `.env.local`:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
```

## Crear esquema y políticas
Ejecuta en el SQL editor de Supabase el archivo `docs/supabase-schema.sql`.

## Cuenta de administrador
1. Crea el usuario admin desde el dashboard Auth (correo y contraseña seguros).
2. Ejecuta:

```sql
update public.profiles set role='admin' where id = (select id from auth.users where email = '<admin_email>');
```

## Roles para profesores
- Opciones:
  - Asignación manual por admin (recomendado al inicio):
    ```sql
    update public.profiles set role='teacher' where id = '<teacher_user_id>';
    ```
  - O permitir selección en registro y validar luego vía revisión admin.

## Edge Functions (opcional)
- `enroll`: operación atómica de inscripción + decremento de capacidad.
- `join-waitlist`: agrega a lista de espera.
- Invocación desde cliente: `supabase.functions.invoke('<fn>')`.

## Pruebas rápidas
1. Registro y login de estudiante.
2. Asignación de admin y acceso a `/admin/dashboard`.
3. Carga de cursos y detalle.
4. Inscripción en curso disponible.
5. Lista de espera si el curso está agotado.

