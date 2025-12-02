-- Habilitar RLS en las tablas
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profesores ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles
-- Todos los usuarios autenticados pueden ver su propio perfil
CREATE POLICY "Usuarios pueden ver su propio perfil" ON public.perfiles
    FOR SELECT USING (
        auth.uid() = usuario_id
    );

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON public.perfiles
    FOR UPDATE USING (
        auth.uid() = usuario_id
    );

-- Administradores pueden ver todos los perfiles
CREATE POLICY "Administradores pueden ver todos los perfiles" ON public.perfiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.perfiles
            WHERE usuario_id = auth.uid()
            AND rol = 'admin'
        )
    );

-- Políticas para estudiantes
-- Estudiantes pueden ver su propia información
CREATE POLICY "Estudiantes pueden ver su propia info" ON public.estudiantes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.perfiles
            WHERE usuario_id = auth.uid()
            AND rol = 'estudiante'
            AND id = (
                SELECT perfil_id FROM public.estudiantes
                WHERE estudiantes.perfil_id = perfiles.id
            )
        )
    );

-- Profesores y admin pueden ver información de estudiantes
CREATE POLICY "Profesores y admin pueden ver estudiantes" ON public.estudiantes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.perfiles
            WHERE usuario_id = auth.uid()
            AND rol IN ('profesor', 'admin')
        )
    );

-- Políticas para profesores
-- Profesores pueden ver su propia información
CREATE POLICY "Profesores pueden ver su propia info" ON public.profesores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.perfiles
            WHERE usuario_id = auth.uid()
            AND rol = 'profesor'
            AND id = (
                SELECT perfil_id FROM public.profesores
                WHERE profesores.perfil_id = perfiles.id
            )
        )
    );

-- Administradores pueden ver información de profesores
CREATE POLICY "Administradores pueden ver profesores" ON public.profesores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.perfiles
            WHERE usuario_id = auth.uid()
            AND rol = 'admin'
        )
    );

-- Función trigger para crear perfil cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Crear perfil base
    INSERT INTO public.perfiles (usuario_id, email, nombre, apellido, rol)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'nombre', 'Usuario'),
        COALESCE(NEW.raw_user_meta_data->>'apellido', 'Nuevo'),
        COALESCE(NEW.raw_user_meta_data->>'rol', 'estudiante')
    );
    
    -- Si es estudiante, crear registro en tabla estudiantes
    IF NEW.raw_user_meta_data->>'rol' = 'estudiante' OR NEW.raw_user_meta_data->>'rol' IS NULL THEN
        INSERT INTO public.estudiantes (perfil_id)
        SELECT id FROM public.perfiles WHERE usuario_id = NEW.id;
    END IF;
    
    -- Si es profesor, crear registro en tabla profesores
    IF NEW.raw_user_meta_data->>'rol' = 'profesor' THEN
        INSERT INTO public.profesores (perfil_id, especialidad)
        SELECT id, COALESCE(NEW.raw_user_meta_data->>'especialidad', 'Música General')
        FROM public.perfiles WHERE usuario_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();