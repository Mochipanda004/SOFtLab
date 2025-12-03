export default function Materiales() {
  const items = [
    { title: "Escalas Mayores - Ejercicios", meta: "PDF • 2.4 MB • 14/10/2025" },
    { title: "Técnica de Dedos - Video Tutorial", meta: "Video • 45 MB • 09/10/2025" },
    { title: "Partituras Nivel 1", meta: "PDF • 5.1 MB • 04/10/2025" },
    { title: "Teoría Musical Básica", meta: "PDF • 3.2 MB • 30/09/2025" },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Mi Dashboard</h2>
        <p className="text-sm text-gray-600">Bienvenido de vuelta, Estudiante. Aquí está tu resumen de actividades.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Materiales del Curso</p>
        <div className="mt-6 space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl border px-4 py-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">📄</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{it.title}</p>
                  <p className="text-sm text-gray-600">{it.meta}</p>
                </div>
              </div>
              <button
                className="shrink-0 rounded-md px-4 py-2 text-sm text-gray-900 border"
                aria-label={`Descargar ${it.title}`}
              >
                Descargar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
