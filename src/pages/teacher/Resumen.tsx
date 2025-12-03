export default function TeacherResumen() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div>
            <p className="text-sm text-gray-600">Cursos activos</p>
            <p className="text-2xl font-semibold text-gray-900">2</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">📘</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div>
            <p className="text-sm text-gray-600">Total estudiantes</p>
            <p className="text-2xl font-semibold text-gray-900">20</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">👥</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div>
            <p className="text-sm text-gray-600">Clases esta semana</p>
            <p className="text-2xl font-semibold text-gray-900">6</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">📅</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div>
            <p className="text-sm text-gray-600">Evaluaciones pendientes</p>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">📝</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white">
          <div className="px-6 pt-6">
            <p className="text-sm font-medium text-gray-900">Próximas Clases</p>
          </div>
          <div className="px-6 pb-6 space-y-3 mt-6">
            <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">📘</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Piano Básico</p>
                  <p className="text-sm text-gray-600">12 estudiantes • Sala 101</p>
                </div>
              </div>
              <span className="text-xs rounded-md border px-2 py-1">Hoy 18:00</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">📘</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Piano Intermedio</p>
                  <p className="text-sm text-gray-600">8 estudiantes • Sala 102</p>
                </div>
              </div>
              <span className="text-xs rounded-md border px-2 py-1">Viernes 16:00</span>
            </div>
            <button className="w-full rounded-md border px-4 py-2 text-sm text-gray-900">Ver todos los horarios</button>
          </div>
        </div>

        <div className="rounded-2xl border bg-white">
          <div className="px-6 pt-6">
            <p className="text-sm font-medium text-gray-900">Acciones Rápidas</p>
          </div>
          <div className="px-6 pb-6 space-y-3 mt-6">
            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-sm text-gray-900">Tomar asistencia</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-sm text-gray-900">Subir material</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-sm text-gray-900">Crear evaluación</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-sm text-gray-900">Ver calificaciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

