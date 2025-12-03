import { Link } from "react-router-dom";

export default function Resumen() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Mi Dashboard</h2>
        <p className="text-sm text-gray-600">Bienvenido de vuelta, Estudiante. Aquí está tu resumen de actividades.</p>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Cursos activos</p>
            <p className="text-2xl font-semibold text-gray-900">1</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">♪</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Asistencia</p>
            <p className="text-2xl font-semibold text-gray-900">92%</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">✓</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Eval. pendientes</p>
            <p className="text-2xl font-semibold text-gray-900">2</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">📝</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border bg-white p-6 min-h-[106px]">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Progreso general</p>
            <p className="text-2xl font-semibold text-gray-900">45%</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">🎖️</div>
        </div>
      </div>

      <div className="rounded-2xl border p-0 overflow-hidden bg-white">
        <div className="flex items-center justify-between p-6" style={{ backgroundImage: "linear-gradient(90deg,#179ae31a 0%,#971bde1a 100%)" }}>
          <div className="flex items-center gap-4 flex-1">
            <div className="h-14 w-14 rounded-full flex items-center justify-center" style={{ backgroundImage: "linear-gradient(180deg,#179ae3 0%, #971bde 100%)" }}>
              🎓
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Explora nuestros cursos</p>
              <p className="text-sm text-gray-600">Descubre todos los cursos disponibles y sus precios</p>
            </div>
          </div>
          <Link
            to="/cursos"
            className="rounded-md px-4 py-2 text-sm text-white"
            style={{ backgroundImage: "linear-gradient(180deg,#179ae3 0%, #971bde 100%)" }}
          >
            Ver catálogo
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                    <p className="text-sm text-gray-600">Prof. María González • Sala 101</p>
                  </div>
                </div>
                <span className="text-xs rounded-md border px-2 py-1">Lunes 18:00</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">📘</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Piano Básico</p>
                    <p className="text-sm text-gray-600">Prof. María González • Sala 101</p>
                  </div>
                </div>
                <span className="text-xs rounded-md border px-2 py-1">Miércoles 18:00</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white">
            <div className="px-6 pt-6">
              <p className="text-sm font-medium text-gray-900">Notificaciones</p>
            </div>
            <div className="px-6 pb-6 space-y-3 mt-6">
              <div className="flex items-start gap-3 rounded-xl border px-4 py-4">
                <div className="h-4 w-4">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Nueva evaluación disponible:</p>
                  <p className="text-sm font-semibold text-gray-700">Quiz - Teoría Musical 1</p>
                  <p className="text-sm text-gray-600">Fecha límite: 25 de octubre.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border px-4 py-4">
                <div className="h-4 w-4">📦</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Nuevos materiales disponibles:</p>
                  <p className="text-sm font-semibold text-gray-700">Escalas Mayores - Ejercicios</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <p className="text-sm font-medium text-gray-900">Mi Progreso</p>
            <div className="mt-8 flex flex-col items-center">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#179ae3" />
                    <stop offset="100%" stopColor="#971bde" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle cx="60" cy="60" r="52" stroke="url(#g)" strokeWidth="8" fill="none" strokeDasharray="327" strokeDashoffset="180" transform="rotate(-90 60 60)" />
              </svg>
              <div className="mt-4 text-2xl font-semibold text-gray-900">45%</div>
              <div className="text-sm text-gray-600">Progreso General</div>
            </div>
            <div className="mt-8 space-y-4">
              <div>
                <div className="flex justify-between text-sm"><span>Asistencia</span><span>92%</span></div>
                <div className="h-2 rounded-full bg-gray-200 mt-2"><div className="h-2 rounded-full bg-blue-500" style={{ width: "92%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm"><span>Evaluaciones</span><span>75%</span></div>
                <div className="h-2 rounded-full bg-gray-200 mt-2"><div className="h-2 rounded-full bg-blue-500" style={{ width: "75%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm"><span>Materiales completados</span><span>60%</span></div>
                <div className="h-2 rounded-full bg-gray-200 mt-2"><div className="h-2 rounded-full bg-blue-500" style={{ width: "60%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm"><span>Prácticas entregadas</span><span>55%</span></div>
                <div className="h-2 rounded-full bg-gray-200 mt-2"><div className="h-2 rounded-full bg-blue-500" style={{ width: "55%" }} /></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
