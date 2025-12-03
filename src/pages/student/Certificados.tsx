export default function Certificados() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Mi Dashboard</h2>
        <p className="text-sm text-gray-600">Bienvenido de vuelta, Estudiante. Aquí está tu resumen de actividades.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Mis Certificados</p>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">👤</div>
          <p className="mt-4 text-sm font-medium text-gray-900">Aún no tienes certificados</p>
          <p className="mt-2 text-sm text-gray-600">Completa tus cursos para obtener certificados oficiales</p>
        </div>
      </div>
    </div>
  );
}
