export default function TeacherCalificaciones() {
  const students = [
    { name: "Juan Estudiante", badge: "92% asistencia" },
    { name: "María López", badge: "100% asistencia" },
    { name: "Carlos Ramírez", badge: "85% asistencia" },
    { name: "Ana Martínez", badge: "77% asistencia" },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Estudiantes - Piano Básico</p>
        <div className="mt-6 space-y-3">
          {students.map((s, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-sm text-gray-900">{s.name}</span>
              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs text-white bg-purple-600">{s.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

