export default function Evaluaciones() {
  const items = [
    { title: "Quiz - Teoría Musical 1", tipo: "Teórica", limite: "24/10/2025", estado: { label: "Pendiente", color: "bg-purple-600" }, accion: "Realizar evaluación" },
    { title: "Evaluación Práctica - Escalas", tipo: "Práctica", limite: "31/10/2025", estado: { label: "Pendiente", color: "bg-purple-600" }, accion: "Realizar evaluación" },
    { title: "Quiz - Lectura de Partituras", tipo: "Teórica", limite: "17/10/2025", estado: { label: "Completada • 85%", color: "bg-green-600" }, accion: "Ver resultados" },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Mi Dashboard</h2>
        <p className="text-sm text-gray-600">Bienvenido de vuelta, Estudiante. Aquí está tu resumen de actividades.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Evaluaciones</p>
        <div className="mt-6 space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-xl border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{it.title}</p>
                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs text-gray-900">{it.tipo}</span>
                    <span className="text-gray-600">Fecha límite: {it.limite}</span>
                  </div>
                </div>
                <span className={`shrink-0 inline-flex items-center rounded-md px-2 py-1 text-xs text-white ${it.estado.color}`}>{it.estado.label}</span>
              </div>
              <div className="mt-3">
                {it.accion === "Realizar evaluación" ? (
                  <button className="rounded-md px-4 py-2 text-sm text-white bg-blue-600">{it.accion}</button>
                ) : (
                  <button className="rounded-md px-4 py-2 text-sm text-gray-900 border">{it.accion}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
