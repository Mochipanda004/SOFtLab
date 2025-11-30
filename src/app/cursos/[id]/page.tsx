import React from "react";
import { COURSE_DATA } from "@/mocks/courses";
import Link from "next/link";

export default async function CursoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const curso = COURSE_DATA.find((c) => c.id === id);
  if (!curso) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-gray-600">Curso no encontrado.</p>
        <Link href="/cursos" className="text-blue-600 hover:underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero con imagen y etiquetas */}
      <section className="relative h-64 md:h-80 w-full">
        {curso.imagen_url && (
          <img
            src={curso.imagen_url}
            alt={curso.titulo}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-500 text-white shadow-sm">
              {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-600 text-white shadow-sm">
              {curso.modalidad.charAt(0).toUpperCase() +
                curso.modalidad.slice(1)}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {curso.titulo}
          </h1>
          <p className="text-white/90 text-sm">Por {curso.profesor.nombre}</p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-gray-200 rounded-2xl bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              Acerca del curso
            </h2>
            <p className="text-gray-700 text-sm">{curso.descripcion}</p>
          </div>

          <div className="border border-gray-200 rounded-2xl bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              ¿Qué aprenderás?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {(curso.aprendizajes && curso.aprendizajes.length > 0
                ? curso.aprendizajes
                : [
                    "Dominar la postura y técnica básica",
                    "Lectura de partituras en sol y fa",
                    "Escalas mayores y menores",
                    "Interpretación de piezas básicas",
                    "Teoría musical fundamental",
                  ]
              ).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Programa del curso
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              {(curso.programa && curso.programa.length > 0
                ? curso.programa
                : [
                    {
                      titulo: "Introducción al instrumento y postura",
                      duracion: "2 semanas",
                    },
                    {
                      titulo: "Técnica de dedos y escalas básicas",
                      duracion: "2 semanas",
                    },
                    {
                      titulo: "Lectura de partituras nivel 1",
                      duracion: "2 semanas",
                    },
                    {
                      titulo: "Piezas clásicas para principiantes",
                      duracion: "2 semanas",
                    },
                    {
                      titulo: "Teoría musical aplicada",
                      duracion: "2 semanas",
                    },
                    { titulo: "Recital final", duracion: "2 semanas" },
                  ]
              ).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <span>{item.titulo}</span>
                  <span className="ml-auto text-gray-500 text-xs">
                    Duración: {item.duracion}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-gray-200 rounded-2xl bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Requisitos
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {(curso.requisitos && curso.requisitos.length > 0
                ? curso.requisitos
                : [
                    "No se requiere experiencia previa",
                    "Acceso a instrumento y 30 min diarios de práctica",
                  ]
              ).map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl bg-white p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={curso.imagen_url ?? ""}
                alt="Profesor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                {curso.profesor.nombre.replace("Prof. ", "")}
              </h4>
              <p className="text-sm text-gray-600">
                {curso.profesor.bio ||
                  "Docente con amplia experiencia en interpretación y enseñanza."}
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha: información y CTA */}
        <aside className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm space-y-4">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                ${curso.precio.toLocaleString("es-CO")}
              </p>
              <p className="text-sm text-gray-600">
                Pago único por {curso.duracion_meses} meses
              </p>
            </div>
            <hr className="border-gray-200" />
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600">Duración</span>
                <span>{curso.duracion_meses} meses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Horario</span>
                <span>{curso.profesor.horario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Modalidad</span>
                <span>
                  {curso.modalidad.charAt(0).toUpperCase() +
                    curso.modalidad.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cupos</span>
                <span>
                  {curso.cupos_disponibles} de {curso.cupo_maximo} disponibles
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certificación</span>
                <span>{curso.certificacion ? "Incluida" : "No incluida"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Materiales</span>
                <span>
                  {(curso.materiales && curso.materiales.length) ||
                    curso.materiales_incluidos ||
                    0}{" "}
                  recursos incluidos
                </span>
              </div>
            </div>
            {curso.materiales && curso.materiales.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {curso.materiales.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
            <button className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm">
              Inscribirme ahora
            </button>
            <p className="text-[11px] text-gray-500 text-center">
              Al inscribirte, aceptas nuestros términos y condiciones
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
