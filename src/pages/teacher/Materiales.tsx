export default function TeacherMateriales() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Subir Material</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-900">Curso</label>
            <input className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-900">Título del material</label>
            <input className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="Ej: Escalas Mayores - Ejercicios" />
          </div>
          <div>
            <label className="text-sm text-gray-900">Descripción</label>
            <textarea className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm h-24" placeholder="Describe el contenido del material..." />
          </div>
          <div>
            <label className="text-sm text-gray-900">Archivo</label>
            <div className="mt-2 h-32 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center">
              <div className="text-2xl">⬆️</div>
              <div className="mt-2 text-sm text-gray-700">Arrastra y suelta tu archivo aquí</div>
              <div className="text-xs text-gray-500">o haz clic para seleccionar (PDF, Video, Audio - máx. 100MB)</div>
            </div>
          </div>
          <button className="w-full rounded-md px-4 py-2 text-sm text-white bg-blue-600">Subir material</button>
        </div>
      </div>
    </div>
  );
}

