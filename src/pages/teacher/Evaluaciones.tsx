export default function TeacherEvaluaciones() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Crear Evaluación</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-900">Tipo de evaluación</label>
            <input className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-900">Título</label>
            <input className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="Ej: Quiz - Teoría Musical 1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-900">Fecha de inicio</label>
              <input className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-900">Fecha límite</label>
              <input className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-900">Instrucciones</label>
            <textarea className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm h-24" placeholder="Escribe las instrucciones para la evaluación..." />
          </div>
          <button className="w-full rounded-md px-4 py-2 text-sm text-white bg-blue-600">Crear evaluación</button>
        </div>
      </div>
    </div>
  );
}

