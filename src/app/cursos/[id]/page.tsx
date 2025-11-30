import { useParams, Link } from "react-router-dom";
import { featuredCourses } from "@/mock/courses";

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
}

export default function CursoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const course = featuredCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">♪</span>
                <span className="text-gray-900 font-medium">Melody Labs</span>
              </Link>
            </div>
            <Link to="/cursos" className="text-sm text-blue-600">Volver al catálogo</Link>
          </div>
          <div className="mt-12 text-center text-gray-700">Curso no encontrado.</div>
        </div>
      </div>
    );
  }

  const description = `${course.instrument} • Nivel ${course.level} • ${course.modality}`;
  const duration = course.durationMonths ?? (course.scheduleText.match(/(\d+)\s*mes/)?.[1] ? Number(RegExp.$1) : undefined);
  const maxCap = course.maxCapacity ?? 12;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/cursos" className="rounded-md px-2 py-1 text-gray-600">←</Link>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">♪</span>
              <span className="text-gray-900 font-medium">Melody Labs</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-700 text-sm">Iniciar sesión</Link>
            <Link to="/register" className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white">Registrarse</Link>
          </div>
        </div>
      </div>

      {/* Hero image with badges */}
      <div className="relative w-full">
        <div className="mx-auto max-w-7xl">
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <img src={course.imageUrl} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute left-4 bottom-4 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium">{course.level}</span>
                <span className="inline-flex items-center rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium">{course.modality}</span>
              </div>
              <h1 className="mt-2 text-lg font-semibold">{course.title}</h1>
              <p className="mt-1 text-sm">Por Prof. {course.instructor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Acerca del curso */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-sm font-medium text-gray-900">Acerca del curso</h2>
              <p className="mt-3 text-sm text-gray-600">{course.description ?? description}</p>
            </section>

            {/* ¿Qué aprenderás? */}
            {course.learning && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-sm font-medium text-gray-900">¿Qué aprenderás?</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {course.learning.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2"><span className="inline-block h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 text-xs flex items-center justify-center">✓</span>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Programa del curso */}
            {course.program && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-sm font-medium text-gray-900">Programa del curso</h2>
                <ol className="mt-3 space-y-2 text-sm text-gray-700">
                  {course.program.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">{idx + 1}</span>{item}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Requisitos */}
            {course.requirements && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-sm font-medium text-gray-900">Requisitos</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {course.requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tu profesor */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-sm font-medium text-gray-900">Tu profesor</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100" />
                <div>
                  <div className="text-base font-semibold text-gray-900">{course.instructor}</div>
                  <p className="mt-1 text-sm text-gray-600">{course.teacherBio ?? ''}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Aside */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-3xl font-bold text-blue-600">{formatCOP(course.price)}</div>
            <div className="mt-1 text-sm text-gray-500">Pago único por {duration ?? 3} meses</div>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><span>⏳</span><span>Duración</span><span className="ml-auto text-gray-600">{duration ?? 3} meses</span></div>
              <div className="flex items-center gap-2"><span>🗓️</span><span>Horario</span><span className="ml-auto text-gray-600">{course.scheduleText.replace(/\s•\s\d+\smeses?/,'')}</span></div>
              <div className="flex items-center gap-2"><span>🏷️</span><span>Modalidad</span><span className="ml-auto text-gray-600">{course.modality}</span></div>
              <div className="flex items-center gap-2"><span>👥</span><span>Cupos</span><span className="ml-auto text-gray-600">{course.capacity === 0 ? 'Agotado' : `${course.capacity} de ${maxCap} disponibles`}</span></div>
              <div className="flex items-center gap-2"><span>🎓</span><span>Certificación</span><span className="ml-auto text-gray-600">{course.certificationIncluded ? 'Incluida' : 'No incluida'}</span></div>
              <div className="flex items-center gap-2"><span>📦</span><span>Materiales</span><span className="ml-auto text-gray-600">{course.materialsIncluded ?? 0} recursos incluidos</span></div>
            </div>
            {course.available ? (
              <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Inscribirse ahora</button>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 text-center">Cupos agotados</div>
                <button className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white">Unirme a lista de espera</button>
              </div>
            )}
            <p className="mt-2 text-center text-xs text-gray-500">Al inscribirte, aceptas nuestros términos y condiciones</p>
            <Link to="/cursos" className="mt-3 block text-center text-sm text-gray-600">Volver al catálogo</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
