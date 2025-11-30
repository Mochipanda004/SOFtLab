import type { Course } from "@/mock/courses";
import { Link } from "react-router-dom";

const levelColor: Record<Course["level"], string> = {
  Básico: "bg-green-500",
  Intermedio: "bg-orange-400",
  Avanzado: "bg-red-500",
};

const modalityColor: Record<Course["modality"], string> = {
  Presencial: "bg-purple-600",
  Virtual: "bg-blue-600",
  Híbrido: "bg-purple-600",
};

function Badge({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${className}`}
    >
      {label}
    </span>
  );
}

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PublicCourseCard({ c }: { c: Course }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={c.imageUrl}
          alt={c.title}
          className="h-40 w-full object-cover"
        />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <Badge label={c.level} className={levelColor[c.level]} />
          <Badge label={c.modality} className={modalityColor[c.modality]} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
        <p className="text-sm text-gray-600">{c.instrument}</p>
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span>Prof. {c.instructor.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🗓️</span>
            <span>{c.scheduleText}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-blue-600 font-semibold">
            {formatCOP(c.price)}
          </span>
          <span className="text-sm text-gray-500">
            {c.available ? `${c.capacity} cupos disponibles` : "Cupos agotados"}
          </span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link to={`/cursos/${c.id}`} className="w-full inline-flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          Ver detalles
        </Link>
      </div>
    </article>
  );
}
