-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS public.perfiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID UNIQUE NOT NULL,
    email TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    rol TEXT NOT NULL CHECK (rol IN ('admin', 'profesor', 'estudiante')),
    telefono TEXT,
    fecha_nacimiento DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Tabla de estudiantes (extiende perfiles)
CREATE TABLE IF NOT EXISTS public.estudiantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    perfil_id UUID UNIQUE NOT NULL,
    nivel_musical TEXT CHECK (nivel_musical IN ('principiante', 'intermedio', 'avanzado')),
    instrumento_principal TEXT,
    experiencia_anos INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_perfil_estudiante FOREIGN KEY (perfil_id) REFERENCES public.perfiles(id) ON DELETE CASCADE
);

-- Tabla de profesores (extiende perfiles)
CREATE TABLE IF NOT EXISTS public.profesores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    perfil_id UUID UNIQUE NOT NULL,
    especialidad TEXT,
    experiencia_anos INTEGER DEFAULT 0,
    certificaciones TEXT[],
    biografia TEXT,
    tarifa_por_hora DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_perfil_profesor FOREIGN KEY (perfil_id) REFERENCES public.perfiles(id) ON DELETE CASCADE
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_perfiles_usuario_id ON public.perfiles(usuario_id);
CREATE INDEX IF NOT EXISTS idx_perfiles_rol ON public.perfiles(rol);
CREATE INDEX IF NOT EXISTS idx_perfiles_email ON public.perfiles(email);
CREATE INDEX IF NOT EXISTS idx_estudiantes_perfil_id ON public.estudiantes(perfil_id);
CREATE INDEX IF NOT EXISTS idx_profesores_perfil_id ON public.profesores(perfil_id);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_perfiles_updated_at BEFORE UPDATE ON public.perfiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_estudiantes_updated_at BEFORE UPDATE ON public.estudiantes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profesores_updated_at BEFORE UPDATE ON public.profesores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();