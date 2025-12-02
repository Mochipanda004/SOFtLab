-- Crear usuario administrador por defecto
-- Este script debe ejecutarse manualmente después de configurar Supabase

-- Primero, crear el usuario en auth.users (esto normalmente se hace desde la aplicación)
-- Pero vamos a crear una función para facilitar la creación del admin

CREATE OR REPLACE FUNCTION public.crear_admin_por_defecto()
RETURNS UUID AS $$
DECLARE
    admin_user_id UUID;
    admin_perfil_id UUID;
BEGIN
    -- Verificar si ya existe un administrador
    IF EXISTS (SELECT 1 FROM public.perfiles WHERE rol = 'admin') THEN
        RAISE NOTICE 'Ya existe un administrador en el sistema';
        RETURN NULL;
    END IF;

    -- Crear usuario admin (esto se hace desde auth.users)
    -- Como no podemos crear directamente en auth.users desde aquí,
    -- vamos a crear un registro temporal que indique que se necesita crear el admin
    
    INSERT INTO public.perfiles (usuario_id, email, nombre, apellido, rol)
    VALUES (
        '00000000-0000-0000-0000-000000000001', -- ID temporal
        'admin@melodylabs.edu.co',
        'Administrador',
        'Melody Labs',
        'admin'
    ) RETURNING id INTO admin_perfil_id;
    
    RAISE NOTICE 'Perfil de administrador creado con ID: %', admin_perfil_id;
    RAISE NOTICE 'IMPORTANTE: Debes crear el usuario en auth.users con email: admin@melodylabs.edu.co';
    RAISE NOTICE 'Luego actualizar el usuario_id en perfiles con el ID real del usuario creado';
    
    RETURN admin_perfil_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ejecutar la función para crear el perfil admin
SELECT public.crear_admin_por_defecto();