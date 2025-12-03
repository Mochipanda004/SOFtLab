export default function StudentDashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold text-gray-900">Progreso</h2>
          <p className="text-sm text-gray-600 mt-2">Tu avance general en los cursos.</p>
          <div className="mt-4 h-2 bg-gray-100 rounded">
            <div className="h-2 bg-indigo-600 rounded" style={{ width: "45%" }} />
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold text-gray-900">Próximas clases</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Piano Básico · Lunes 6:00 PM</span>
              <span className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700">Hoy</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Teoría Musical · Miércoles 7:00 PM</span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Mañana</span>
            </li>
          </ul>
        </div>
      </div>
      <aside className="space-y-6">
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-900">Estado de pagos</h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-700">Mensualidad de diciembre</span>
            <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-700">Pagado</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
          <ul className="mt-4 space-y-3">
            <li className="text-sm text-gray-700">Nueva guía de estudio en Piano Básico</li>
            <li className="text-sm text-gray-700">Se publicó tu calificación de la última evaluación</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

