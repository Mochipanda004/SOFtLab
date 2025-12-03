export default function TeacherAsistencia() {
  const rows = [
    { nombre: "Juan Estudiante", total: "12/13 clases", porcentaje: 92, presente: true },
    { nombre: "María López", total: "13/13 clases", porcentaje: 100, presente: true },
    { nombre: "Carlos Ramírez", total: "11/13 clases", porcentaje: 85, presente: false },
    { nombre: "Ana Martínez", total: "10/13 clases", porcentaje: 77, presente: true },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white">
        <div className="px-6 pt-6">
          <p className="text-sm font-medium text-gray-900">Tomar Asistencia - Piano Básico</p>
          <p className="mt-2 text-sm text-gray-600">Lunes 18 de octubre, 2025</p>
        </div>
        <div className="px-6 pb-6 mt-6">
          <div className="border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 text-sm text-gray-900 border-b">
              <div className="col-span-6 py-2 px-2">Estudiante</div>
              <div className="col-span-5 py-2 px-2">Asistencia Total</div>
              <div className="col-span-1 py-2 text-center">Presente</div>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-12 items-center border-b">
                <div className="col-span-6 px-2 py-3">
                  <div className="text-sm text-gray-900">{r.nombre}</div>
                  <div className="text-sm text-gray-600">{r.total}</div>
                </div>
                <div className="col-span-5 px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${r.porcentaje}%` }} />
                    </div>
                    <div className="text-sm text-gray-600 w-10">{r.porcentaje}%</div>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <input type="checkbox" defaultChecked={r.presente} className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="rounded-md px-4 py-2 text-sm text-white bg-blue-600">Guardar asistencia</button>
            <button className="rounded-md px-4 py-2 text-sm text-gray-900 border">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

