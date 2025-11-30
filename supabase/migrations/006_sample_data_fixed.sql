-- Create sample data for testing the dashboard
-- This migration adds test data for courses, students, teachers, and enrollments
-- First, we need to create auth users, then their profiles

-- Create sample teacher users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
VALUES 
(gen_random_uuid(), 'profesor1@melodylabs.com', crypt('Profesor123!', gen_salt('bf')), NOW(), '{"nombre": "Carlos", "apellido": "Rodríguez", "rol": "profesor", "especialidad": "Piano Clásico"}', NOW(), NOW(), 'authenticated'),
(gen_random_uuid(), 'profesor2@melodylabs.com', crypt('Profesor123!', gen_salt('bf')), NOW(), '{"nombre": "María", "apellido": "González", "rol": "profesor", "especialidad": "Guitarra Acústica"}', NOW(), NOW(), 'authenticated');

-- Create sample student users  
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
VALUES 
(gen_random_uuid(), 'estudiante1@melodylabs.com', crypt('Estudiante123!', gen_salt('bf')), NOW(), '{"nombre": "Ana", "apellido": "Martínez", "rol": "estudiante"}', NOW(), NOW(), 'authenticated'),
(gen_random_uuid(), 'estudiante2@melodylabs.com', crypt('Estudiante123!', gen_salt('bf')), NOW(), '{"nombre": "Luis", "apellido": "Fernández", "rol": "estudiante"}', NOW(), NOW(), 'authenticated'),
(gen_random_uuid(), 'estudiante3@melodylabs.com', crypt('Estudiante123!', gen_salt('bf')), NOW(), '{"nombre": "Sofía", "apellido": "López", "rol": "estudiante"}', NOW(), NOW(), 'authenticated');

-- Now create the profiles and teacher/student records
-- The trigger handle_new_user will automatically create the profiles
-- We just need to update the teacher records with additional info

-- Update teacher records with specialties and experience
WITH prof_data AS (
  SELECT id, (raw_user_meta_data->>'especialidad')::text as especialidad
  FROM auth.users 
  WHERE email IN ('profesor1@melodylabs.com', 'profesor2@melodylabs.com')
)
UPDATE public.profesores p
SET 
  experiencia_anos = CASE 
    WHEN pd.especialidad = 'Piano Clásico' THEN 15
    WHEN pd.especialidad = 'Guitarra Acústica' THEN 8
  END,
  biografia = CASE 
    WHEN pd.especialidad = 'Piano Clásico' THEN 'Pianista concertista con más de 15 años de experiencia enseñando piano clásico y teoría musical.'
    WHEN pd.especialidad = 'Guitarra Acústica' THEN 'Guitarrista profesional especializado en guitarra acústica y fingerstyle.'
  END,
  tarifa_por_hora = CASE 
    WHEN pd.especialidad = 'Piano Clásico' THEN 45.00
    WHEN pd.especialidad = 'Guitarra Acústica' THEN 35.00
  END
FROM prof_data pd
JOIN public.perfiles per ON per.usuario_id = pd.id
WHERE p.perfil_id = per.id;

-- Update student records with levels and instruments
WITH est_data AS (
  SELECT id, (raw_user_meta_data->>'nombre')::text as nombre
  FROM auth.users 
  WHERE email IN ('estudiante1@melodylabs.com', 'estudiante2@melodylabs.com', 'estudiante3@melodylabs.com')
)
UPDATE public.estudiantes e
SET 
  nivel_musical = CASE 
    WHEN ed.nombre = 'Ana' THEN 'intermedio'
    WHEN ed.nombre = 'Luis' THEN 'principiante'
    WHEN ed.nombre = 'Sofía' THEN 'avanzado'
  END,
  instrumento_principal = CASE 
    WHEN ed.nombre = 'Ana' THEN 'Piano'
    WHEN ed.nombre = 'Luis' THEN 'Guitarra'
    WHEN ed.nombre = 'Sofía' THEN 'Violín'
  END,
  experiencia_anos = CASE 
    WHEN ed.nombre = 'Ana' THEN 3
    WHEN ed.nombre = 'Luis' THEN 0
    WHEN ed.nombre = 'Sofía' THEN 7
  END
FROM est_data ed
JOIN public.perfiles per ON per.usuario_id = ed.id
WHERE e.perfil_id = per.id;

-- Insert sample courses
WITH prof_info AS (
  SELECT per.id as profesor_id, per.nombre, (u.raw_user_meta_data->>'especialidad')::text as especialidad
  FROM auth.users u
  JOIN public.perfiles per ON per.usuario_id = u.id
  WHERE u.email IN ('profesor1@melodylabs.com', 'profesor2@melodylabs.com')
)
INSERT INTO public.cursos (titulo, descripcion, profesor_id, nivel, duracion_semanas, precio, estado, fecha_inicio, fecha_fin, max_estudiantes)
SELECT 
  CASE 
    WHEN pi.especialidad = 'Piano Clásico' THEN 'Curso de Piano para Principiantes'
    WHEN pi.especialidad = 'Guitarra Acústica' THEN 'Guitarra Acústica desde Cero'
  END,
  CASE 
    WHEN pi.especialidad = 'Piano Clásico' THEN 'Aprende los fundamentos del piano clásico de manera progresiva y divertida.'
    WHEN pi.especialidad = 'Guitarra Acústica' THEN 'Domina la guitarra acústica con técnicas modernas y canciones populares.'
  END,
  pi.profesor_id,
  'principiante',
  12,
  CASE 
    WHEN pi.especialidad = 'Piano Clásico' THEN 299.00
    WHEN pi.especialidad = 'Guitarra Acústica' THEN 199.00
  END,
  'activo',
  CURRENT_DATE - INTERVAL '1 week',
  CURRENT_DATE + INTERVAL '11 weeks',
  15
FROM prof_info pi;

-- Insert sample enrollments
WITH curso_ids AS (
  SELECT id, titulo FROM public.cursos LIMIT 2
),
estudiante_ids AS (
  SELECT e.perfil_id, per.nombre 
  FROM public.estudiantes e
  JOIN public.perfiles per ON per.id = e.perfil_id
  JOIN auth.users u ON u.id = per.usuario_id
  WHERE u.email IN ('estudiante1@melodylabs.com', 'estudiante2@melodylabs.com', 'estudiante3@melodylabs.com')
)
INSERT INTO public.inscripciones (curso_id, estudiante_id, fecha_inscripcion, estado, progreso)
SELECT 
  c.id,
  e.perfil_id,
  CURRENT_DATE - INTERVAL '3 days',
  'activa',
  CASE 
    WHEN e.nombre = 'Ana' THEN 25
    WHEN e.nombre = 'Luis' THEN 10
    WHEN e.nombre = 'Sofía' THEN 40
  END
FROM curso_ids c
CROSS JOIN estudiante_ids e;

-- Insert sample classes (lecciones)
WITH curso_ids AS (
  SELECT id, titulo FROM public.cursos LIMIT 2
)
INSERT INTO public.clases (curso_id, titulo, descripcion, duracion_minutos, orden, tipo, fecha_programada)
SELECT 
  c.id,
  CASE 
    WHEN c.titulo = 'Curso de Piano para Principiantes' THEN 
      CASE 
        WHEN generate_series(1, 5) = 1 THEN 'Introducción al Piano'
        WHEN generate_series(1, 5) = 2 THEN 'Notas Musicales Básicas'
        WHEN generate_series(1, 5) = 3 THEN 'Escalas Mayores'
        WHEN generate_series(1, 5) = 4 THEN 'Primeras Melodías'
        ELSE 'Ejercicios de Coordinación'
      END
    WHEN c.titulo = 'Guitarra Acústica desde Cero' THEN 
      CASE 
        WHEN generate_series(1, 5) = 1 THEN 'Partes de la Guitarra'
        WHEN generate_series(1, 5) = 2 THEN 'Afinación y Postura'
        WHEN generate_series(1, 5) = 3 THEN 'Acordes Básicos'
        WHEN generate_series(1, 5) = 4 THEN 'Ritmos Simples'
        ELSE 'Transiciones entre Acordes'
      END
  END,
  'Lección práctica con ejercicios guiados',
  60,
  generate_series(1, 5),
  'practica',
  CURRENT_DATE + INTERVAL '1 day' * generate_series(1, 5)
FROM curso_ids c;

-- Insert sample payments
WITH inscripcion_ids AS (
  SELECT i.id, c.titulo, per.nombre as estudiante_nombre
  FROM public.inscripciones i
  JOIN public.cursos c ON c.id = i.curso_id
  JOIN public.estudiantes e ON e.perfil_id = i.estudiante_id
  JOIN public.perfiles per ON per.id = e.perfil_id
  JOIN auth.users u ON u.id = per.usuario_id
  WHERE u.email IN ('estudiante1@melodylabs.com', 'estudiante2@melodylabs.com', 'estudiante3@melodylabs.com')
)
INSERT INTO public.pagos (inscripcion_id, monto, fecha_pago, metodo_pago, estado, referencia)
SELECT 
  i.id,
  CASE 
    WHEN i.titulo = 'Curso de Piano para Principiantes' THEN 299.00
    WHEN i.titulo = 'Guitarra Acústica desde Cero' THEN 199.00
  END,
  CURRENT_DATE - INTERVAL '2 days',
  'tarjeta_credito',
  'completado',
  CONCAT('REF-', LEFT(md5(random()::text), 8))
FROM inscripcion_ids i;