-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'alumno' CHECK (role IN ('alumno', 'profesor', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create cursos table
CREATE TABLE cursos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  categoria TEXT NOT NULL,
  nivel TEXT NOT NULL CHECK (nivel IN ('basico', 'intermedio', 'avanzado')),
  modalidad TEXT NOT NULL CHECK (modalidad IN ('presencial', 'virtual', 'hibrido')),
  precio INTEGER NOT NULL CHECK (precio > 0),
  duracion_meses INTEGER NOT NULL CHECK (duracion_meses > 0),
  cupo_maximo INTEGER NOT NULL CHECK (cupo_maximo > 0),
  imagen_url TEXT,
  estado TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create curso_profesores table (many-to-many relationship)
CREATE TABLE curso_profesores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
  profesor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(curso_id, profesor_id)
);

-- Create salas table
CREATE TABLE salas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  capacidad INTEGER NOT NULL CHECK (capacidad > 0),
  ubicacion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create clases table
CREATE TABLE clases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
  sala_id UUID REFERENCES salas(id) ON DELETE SET NULL,
  profesor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha_clase DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create inscripciones table
CREATE TABLE inscripciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  alumno_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
  estado TEXT NOT NULL DEFAULT 'reservado' CHECK (estado IN ('reservado', 'pagado', 'cancelado')),
  fecha_reserva TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  fecha_pago TIMESTAMP WITH TIME ZONE,
  fecha_expiracion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(alumno_id, curso_id)
);

-- Create asistencias table
CREATE TABLE asistencias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clase_id UUID REFERENCES clases(id) ON DELETE CASCADE,
  alumno_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  estado TEXT NOT NULL CHECK (estado IN ('presente', 'ausente', 'justificado')),
  fecha_clase DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(clase_id, alumno_id)
);

-- Create materiales table
CREATE TABLE materiales (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
  profesor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo_archivo TEXT NOT NULL,
  archivo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create evaluaciones table
CREATE TABLE evaluaciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('teorica', 'practica')),
  fecha_evaluacion DATE NOT NULL,
  porcentaje_calificacion INTEGER NOT NULL CHECK (porcentaje_calificacion > 0 AND porcentaje_calificacion <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create calificaciones table
CREATE TABLE calificaciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  evaluacion_id UUID REFERENCES evaluaciones(id) ON DELETE CASCADE,
  alumno_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  calificacion DECIMAL(5,2) CHECK (calificacion >= 0 AND calificacion <= 100),
  comentarios TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(evaluacion_id, alumno_id)
);

-- Create certificados table
CREATE TABLE certificados (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  alumno_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
  codigo_certificado TEXT NOT NULL UNIQUE,
  fecha_emision DATE NOT NULL DEFAULT CURRENT_DATE,
  nota_final DECIMAL(5,2) NOT NULL CHECK (nota_final >= 0 AND nota_final <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create pagos table
CREATE TABLE pagos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  inscripcion_id UUID REFERENCES inscripciones(id) ON DELETE CASCADE,
  referencia_pago TEXT NOT NULL UNIQUE,
  monto INTEGER NOT NULL CHECK (monto > 0),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
  metodo_pago TEXT NOT NULL DEFAULT 'pse' CHECK (metodo_pago IN ('pse')),
  respuesta_pse JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create planes_membresia table
CREATE TABLE planes_membresia (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio_mensual INTEGER NOT NULL CHECK (precio_mensual > 0),
  beneficios TEXT[],
  duracion_meses INTEGER NOT NULL CHECK (duracion_meses > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create membresias table
CREATE TABLE membresias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  alumno_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES planes_membresia(id) ON DELETE CASCADE,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado TEXT NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa', 'vencida', 'cancelada')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create eventos table
CREATE TABLE eventos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha_evento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  ubicacion TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('concierto', 'recital', 'taller', 'seminario')),
  google_forms_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create faq table
CREATE TABLE faq (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  categoria TEXT NOT NULL,
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_cursos_categoria ON cursos(categoria);
CREATE INDEX idx_cursos_nivel ON cursos(nivel);
CREATE INDEX idx_cursos_estado ON cursos(estado);
CREATE INDEX idx_inscripciones_alumno ON inscripciones(alumno_id);
CREATE INDEX idx_inscripciones_curso ON inscripciones(curso_id);
CREATE INDEX idx_inscripciones_estado ON inscripciones(estado);
CREATE INDEX idx_clases_curso ON clases(curso_id);
CREATE INDEX idx_clases_fecha ON clases(fecha_clase);
CREATE INDEX idx_asistencias_clase ON asistencias(clase_id);
CREATE INDEX idx_asistencias_alumno ON asistencias(alumno_id);
CREATE INDEX idx_materiales_curso ON materiales(curso_id);
CREATE INDEX idx_evaluaciones_curso ON evaluaciones(curso_id);
CREATE INDEX idx_calificaciones_evaluacion ON calificaciones(evaluacion_id);
CREATE INDEX idx_calificaciones_alumno ON calificaciones(alumno_id);
CREATE INDEX idx_pagos_inscripcion ON pagos(inscripcion_id);
CREATE INDEX idx_pagos_referencia ON pagos(referencia_pago);
CREATE INDEX idx_membresias_alumno ON membresias(alumno_id);
CREATE INDEX idx_membresias_estado ON membresias(estado);
CREATE INDEX idx_faq_categoria ON faq(categoria);
CREATE INDEX idx_fq_activo ON faq(activo);