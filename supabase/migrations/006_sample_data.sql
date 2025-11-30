-- Create sample data for testing the dashboard
-- This migration adds test data for courses, students, teachers, and enrollments

-- Insert sample teachers (they need to exist in perfiles first)
INSERT INTO public.perfiles (usuario_id, email, nombre, apellido, rol) VALUES
(gen_random_uuid(), 'profesor1@melodylabs.com', 'Carlos', 'Rodríguez', 'profesor'),
(gen_random_uuid(), 'profesor2@melodylabs.com', 'María', 'González', 'profesor');

-- Get the teacher profile IDs
WITH prof_perfiles AS (
  SELECT id, email FROM public.perfiles WHERE rol = 'profesor'
)
INSERT INTO public.profesores (perfil_id, especialidad, experiencia_anos, biografia, tarifa_por_hora)
SELECT 
  p.id,
  CASE 
    WHEN p.email = 'profesor1@melodylabs.com' THEN 'Piano Clásico'
    WHEN p.email = 'profesor2@melodylabs.com' THEN 'Guitarra Acústica'
  END,
  CASE 
    WHEN p.email = 'profesor1@melodylabs.com' THEN 15
    WHEN p.email = 'profesor2@melodylabs.com' THEN 8
  END,
  CASE 
    WHEN p.email = 'profesor1@melodylabs.com' THEN 'Pianista concertista con más de 15 años de experiencia enseñando piano clásico y teoría musical.'
    WHEN p.email = 'profesor2@melodylabs.com' THEN 'Guitarrista profesional especializado en guitarra acústica y fingerstyle.'
  END,
  CASE 
    WHEN p.email = 'profesor1@melodylabs.com' THEN 45.00
    WHEN p.email = 'profesor2@melodylabs.com' THEN 35.00
  END
FROM prof_perfiles p;

-- Insert sample students
INSERT INTO public.perfiles (usuario_id, email, nombre, apellido, rol) VALUES
(gen_random_uuid(), 'estudiante1@melodylabs.com', 'Ana', 'Martínez', 'estudiante'),
(gen_random_uuid(), 'estudiante2@melodylabs.com', 'Luis', 'Fernández', 'estudiante'),
(gen_random_uuid(), 'estudiante3@melodylabs.com', 'Sofía', 'López', 'estudiante');

-- Get the student profile IDs and create student records
WITH est_perfiles AS (
  SELECT id, email FROM public.perfiles WHERE rol = 'estudiante'
)
INSERT INTO public.estudiantes (perfil_id, nivel_musical, instrumento_principal, experiencia_anos)
SELECT 
  p.id,
  CASE 
    WHEN p.email = 'estudiante1@melodylabs.com' THEN 'intermedio'
    WHEN p.email = 'estudiante2@melodylabs.com' THEN 'principiante'
    WHEN p.email = 'estudiante3@melodylabs.com' THEN 'avanzado'
  END,
  CASE 
    WHEN p.email = 'estudiante1@melodylabs.com' THEN 'Piano'
    WHEN p.email = 'estudiante2@melodylabs.com' THEN 'Guitarra'
    WHEN p.email = 'estudiante3@melodylabs.com' THEN 'Violín'
  END,
  CASE 
    WHEN p.email = 'estudiante1@melodylabs.com' THEN 3
    WHEN p.email = 'estudiante2@melodylabs.com' THEN 0
    WHEN p.email = 'estudiante3@melodylabs.com' THEN 7
  END
FROM est_perfiles p;

-- Insert sample courses
WITH prof_ids AS (
  SELECT p.id as profesor_id, p.especialidad
  FROM public.profesores p
  JOIN public.perfiles per ON per.id = p.perfil_id
  WHERE per.rol = 'profesor'
)
INSERT INTO public.cursos (titulo, descripcion, profesor_id, nivel, duracion_semanas, precio, estado, fecha_inicio, fecha_fin, max_estudiantes)
SELECT 
  CASE 
    WHEN p.especialidad = 'Piano Clásico' THEN 'Curso de Piano para Principiantes'
    WHEN p.especialidad = 'Guitarra Acústica' THEN 'Guitarra Acústica desde Cero'
  END,
  CASE 
    WHEN p.especialidad = 'Piano Clásico' THEN 'Aprende los fundamentos del piano clásico de manera progresiva y divertida.'
    WHEN p.especialidad = 'Guitarra Acústica' THEN 'Domina la guitarra acústica con técnicas modernas y canciones populares.'
  END,
  p.profesor_id,
  'principiante',
  12,
  CASE 
    WHEN p.especialidad = 'Piano Clásico' THEN 299.00
    WHEN p.especialidad = 'Guitarra Acústica' THEN 199.00
  END,
  'activo',
  CURRENT_DATE - INTERVAL '1 week',
  CURRENT_DATE + INTERVAL '11 weeks',
  15
FROM prof_ids p;

-- Insert sample enrollments
WITH curso_ids AS (
  SELECT id, titulo FROM public.cursos LIMIT 2
),
estudiante_ids AS (
  SELECT e.perfil_id, p.nombre 
  FROM public.estudiantes e
  JOIN public.perfiles p ON p.id = e.perfil_id
  LIMIT 3
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
  SELECT i.id, c.titulo, p.nombre as estudiante_nombre
  FROM public.inscripciones i
  JOIN public.cursos c ON c.id = i.curso_id
  JOIN public.estudiantes e ON e.perfil_id = i.estudiante_id
  JOIN public.perfiles p ON p.id = e.perfil_id
  LIMIT 3
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