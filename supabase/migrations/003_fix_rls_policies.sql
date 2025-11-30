-- Fix RLS policy infinite recursion issue

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Administradores pueden ver todos los perfiles" ON public.perfiles;

-- Create a fixed policy using auth.jwt() instead of checking perfiles table
CREATE POLICY "Administradores pueden ver todos los perfiles" ON public.perfiles
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'admin'
    );

-- Alternative approach: Create a function to check admin role without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.perfiles 
        WHERE usuario_id = auth.uid() 
        AND rol = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the previous policy and create a new one using the function
DROP POLICY IF EXISTS "Administradores pueden ver todos los perfiles" ON public.perfiles;

CREATE POLICY "Administradores pueden ver todos los perfiles" ON public.perfiles
    FOR SELECT USING (
        public.is_admin()
    );

-- Also fix the estudiantes policy that might have similar issues
DROP POLICY IF EXISTS "Estudiantes pueden ver su propia info" ON public.estudiantes;

CREATE POLICY "Estudiantes pueden ver su propia info" ON public.estudiantes
    FOR SELECT USING (
        auth.uid() IN (
            SELECT usuario_id 
            FROM public.perfiles 
            WHERE rol = 'estudiante' 
            AND id = (
                SELECT perfil_id 
                FROM public.estudiantes 
                WHERE estudiantes.perfil_id = perfiles.id
            )
        )
    );

-- Fix profesores policy
DROP POLICY IF EXISTS "Profesores pueden ver su propia info" ON public.profesores;

CREATE POLICY "Profesores pueden ver su propia info" ON public.profesores
    FOR SELECT USING (
        auth.uid() IN (
            SELECT usuario_id 
            FROM public.perfiles 
            WHERE rol = 'profesor' 
            AND id = (
                SELECT perfil_id 
                FROM public.profesores 
                WHERE profesores.perfil_id = perfiles.id
            )
        )
    );