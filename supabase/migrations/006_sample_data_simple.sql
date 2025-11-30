-- Create sample data for existing tables
-- This migration adds test data for perfiles, estudiantes, and profesores

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

-- The trigger handle_new_user will automatically create the profiles
-- Now we update the teacher records with additional info
WITH prof_data AS (
  SELECT u.id as usuario_id, (u.raw_user_meta_data->>'especialidad')::text as especialidad
  FROM auth.users u
  WHERE u.email IN ('profesor1@melodylabs.com', 'profesor2@melodylabs.com')
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
JOIN public.perfiles per ON per.usuario_id = pd.usuario_id
WHERE p.perfil_id = per.id;

-- Update student records with levels and instruments
WITH est_data AS (
  SELECT u.id as usuario_id, (u.raw_user_meta_data->>'nombre')::text as nombre
  FROM auth.users u
  WHERE u.email IN ('estudiante1@melodylabs.com', 'estudiante2@melodylabs.com', 'estudiante3@melodylabs.com')
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
JOIN public.perfiles per ON per.usuario_id = ed.usuario_id
WHERE e.perfil_id = per.id;