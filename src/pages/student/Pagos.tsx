export default function Pagos() {
  const rows = [
    {
      fecha: "30 de sept de 2025",
      curso: "Piano Básico",
      metodo: "PSE",
      id: "PSE-2025-ABC123XYZ",
      monto: "$450.000 COP",
      estado: "Confirmado",
    },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Mi Dashboard</h2>
        <p className="text-sm text-gray-600">Bienvenido de vuelta, Estudiante. Aquí está tu resumen de actividades.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Historial de Pagos</p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm border rounded-xl overflow-hidden">
            <thead>
              <tr className="text-left text-gray-900 border-b">
                <th className="py-2 px-2">Fecha</th>
                <th className="py-2 px-2">Curso</th>
                <th className="py-2 px-2">Método</th>
                <th className="py-2 px-2">ID Transacción</th>
                <th className="py-2 px-2 text-right">Monto</th>
                <th className="py-2 px-2">Estado</th>
                <th className="py-2 px-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-2 whitespace-nowrap">{r.fecha}</td>
                  <td className="py-3 px-2 whitespace-nowrap">{r.curso}</td>
                  <td className="py-3 px-2 whitespace-nowrap">{r.metodo}</td>
                  <td className="py-3 px-2 font-mono whitespace-nowrap">{r.id}</td>
                  <td className="py-3 px-2 text-right whitespace-nowrap">{r.monto}</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs text-white bg-green-600">{r.estado}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button className="inline-flex items-center gap-1 text-sm"><span>👁️</span><span>Ver</span></button>
                      <button className="inline-flex items-center gap-1 text-sm"><span>🧾</span><span>Factura</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
