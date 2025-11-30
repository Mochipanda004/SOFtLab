-- Fix RLS policies to prevent infinite recursion
-- This migration fixes the recursive policies in the perfiles table

-- Drop existing recursive policies
DROP POLICY IF EXISTS "Administradores pueden ver todos los perfiles" ON public.perfiles;
DROP POLICY IF EXISTS "Usuarios ven su propio perfil" ON public.perfiles;
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.perfiles;

-- Create non-recursive policies using JWT claims
CREATE POLICY "Usuarios ven su propio perfil" ON public.perfiles
    FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Admin puede ver todos los perfiles" ON public.perfiles
    FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON public.perfiles
    FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Admin puede actualizar cualquier perfil" ON public.perfiles
    FOR UPDATE USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Fix trigger to handle both 'rol' and 'role' fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Crear perfil base
    INSERT INTO public.perfiles (usuario_id, email, nombre, apellido, rol)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'nombre', NEW.raw_user_meta_data->>'full_name', 'Usuario'),
        COALESCE(NEW.raw_user_meta_data->>'apellido', 'Nuevo'),
        COALESCE(NEW.raw_user_meta_data->>'rol', NEW.raw_user_meta_data->>'role', 'estudiante')
    );
    
    -- Si es estudiante, crear registro en tabla estudiantes
    IF NEW.raw_user_meta_data->>'rol' = 'estudiante' OR NEW.raw_user_meta_data->>'role' = 'estudiante' OR (NEW.raw_user_meta_data->>'rol' IS NULL AND NEW.raw_user_meta_data->>'role' IS NULL) THEN
        INSERT INTO public.estudiantes (perfil_id)
        SELECT id FROM public.perfiles WHERE usuario_id = NEW.id;
    END IF;
    
    -- Si es profesor, crear registro en tabla profesores
    IF NEW.raw_user_meta_data->>'rol' = 'profesor' OR NEW.raw_user_meta_data->>'role' = 'profesor' THEN
        INSERT INTO public.profesores (perfil_id, especialidad)
        SELECT id, COALESCE(NEW.raw_user_meta_data->>'especialidad', 'Música General')
        FROM public.perfiles WHERE usuario_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;