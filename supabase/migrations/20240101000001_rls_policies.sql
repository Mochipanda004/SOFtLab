-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE curso_profesores ENABLE ROW LEVEL SECURITY;
ALTER TABLE salas ENABLE ROW LEVEL SECURITY;
ALTER TABLE clases ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE asistencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE materiales ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE calificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificados ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes_membresia ENABLE ROW LEVEL SECURITY;
ALTER TABLE membresias ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can update any profile" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Cursos policies
CREATE POLICY "Active courses are viewable by everyone" ON cursos
  FOR SELECT USING (estado = 'activo');

CREATE POLICY "Admin can manage all courses" ON cursos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Inscripciones policies
CREATE POLICY "Students can view own enrollments" ON inscripciones
  FOR SELECT USING (alumno_id = auth.uid());

CREATE POLICY "Students can create own enrollments" ON inscripciones
  FOR INSERT WITH CHECK (alumno_id = auth.uid());

CREATE POLICY "Admin can view all enrollments" ON inscripciones
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Asistencias policies
CREATE POLICY "Students can view own attendance" ON asistencias
  FOR SELECT USING (alumno_id = auth.uid());

CREATE POLICY "Teachers can manage attendance for their classes" ON asistencias
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM clases 
      WHERE clases.id = asistencias.clase_id 
      AND clases.profesor_id = auth.uid()
    )
  );

-- Materiales policies
CREATE POLICY "Students can view materials for enrolled courses" ON materiales
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM inscripciones 
      WHERE inscripciones.curso_id = materiales.curso_id 
      AND inscripciones.alumno_id = auth.uid()
      AND inscripciones.estado = 'pagado'
    )
  );

CREATE POLICY "Teachers can manage materials for their courses" ON materiales
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM curso_profesores 
      WHERE curso_profesores.curso_id = materiales.curso_id 
      AND curso_profesores.profesor_id = auth.uid()
    )
  );

-- Calificaciones policies
CREATE POLICY "Students can view own grades" ON calificaciones
  FOR SELECT USING (alumno_id = auth.uid());

CREATE POLICY "Teachers can manage grades for their courses" ON calificaciones
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM evaluaciones 
      JOIN curso_profesores ON curso_profesores.curso_id = evaluaciones.curso_id
      WHERE evaluaciones.id = calificaciones.evaluacion_id 
      AND curso_profesores.profesor_id = auth.uid()
    )
  );

-- Pagos policies
CREATE POLICY "Students can view own payments" ON pagos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM inscripciones 
      WHERE inscripciones.id = pagos.inscripcion_id 
      AND inscripciones.alumno_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all payments" ON pagos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Membresias policies
CREATE POLICY "Students can view own memberships" ON membresias
  FOR SELECT USING (alumno_id = auth.uid());

-- Certificados policies
CREATE POLICY "Students can view own certificates" ON certificados
  FOR SELECT USING (alumno_id = auth.uid());

-- Eventos policies
CREATE POLICY "Events are viewable by everyone" ON eventos
  FOR SELECT USING (true);

-- FAQ policies
CREATE POLICY "FAQ is viewable by everyone" ON faq
  FOR SELECT USING (activo = true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON profiles TO anon, authenticated;
GRANT SELECT ON cursos TO anon, authenticated;
GRANT SELECT ON eventos TO anon, authenticated;
GRANT SELECT ON faq TO anon, authenticated;
GRANT SELECT ON planes_membresia TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT, INSERT ON inscripciones TO authenticated;
GRANT SELECT ON asistencias TO authenticated;
GRANT SELECT ON materiales TO authenticated;
GRANT SELECT ON calificaciones TO authenticated;
GRANT SELECT ON pagos TO authenticated;
GRANT SELECT ON membresias TO authenticated;
GRANT SELECT ON certificados TO authenticated;