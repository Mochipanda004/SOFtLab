import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, MapPin } from "lucide-react";

interface CourseCardProps {
  curso: {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    nivel: "basico" | "intermedio" | "avanzado";
    modalidad: "presencial" | "virtual" | "hibrido";
    precio: number;
    duracion_meses: number;
    cupo_maximo: number;
    imagen_url: string | null;
    profesor?: {
      nombre: string;
      horario: string;
    };
    cupos_disponibles: number;
    badges?: string[];
  };
}

const nivelColors = {
  basico: "bg-green-100 text-green-800",
  intermedio: "bg-yellow-100 text-yellow-800",
  avanzado: "bg-red-100 text-red-800",
};

const modalidadColors = {
  presencial: "bg-purple-100 text-purple-800",
  virtual: "bg-blue-100 text-blue-800",
  hibrido: "bg-orange-100 text-orange-800",
};

export function CourseCard({ curso }: CourseCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const getBadgeVariant = (badge: string) => {
    if (badge.toLowerCase().includes("nuevo")) return "bg-green-500 text-white";
    if (badge.toLowerCase().includes("popular"))
      return "bg-purple-500 text-white";
    if (badge.toLowerCase().includes("descuento"))
      return "bg-orange-500 text-white";
    return "bg-gray-500 text-white";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Course Image */}
      <div className="relative h-48">
        {curso.imagen_url ? (
          <img
            src={curso.imagen_url}
            alt={curso.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-6xl opacity-50">♪</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {curso.badges?.map((badge, index) => (
            <span
              key={index}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-sm ${getBadgeVariant(
                badge
              )}`}
            >
              {badge}
            </span>
          ))}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-sm ${
              nivelColors[curso.nivel]
            }`}
          >
            {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-sm ${
              modalidadColors[curso.modalidad]
            }`}
          >
            {curso.modalidad.charAt(0).toUpperCase() + curso.modalidad.slice(1)}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Course Title and Category */}
        <div className="mb-4">
          <h3 className="text-[17px] font-semibold text-gray-900 mb-0.5">
            {curso.titulo}
          </h3>
          <p className="text-gray-600 text-sm">{curso.categoria}</p>
        </div>

        {/* Course Details */}
        <div className="space-y-2.5 mb-3.5">
          {curso.profesor && (
            <div className="flex items-center text-gray-600 text-sm">
              <User className="w-4 h-4 mr-2" />
              <span>{curso.profesor.nombre}</span>
            </div>
          )}

          {curso.profesor?.horario && (
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{curso.profesor.horario}</span>
            </div>
          )}

          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{curso.duracion_meses} meses</span>
          </div>
        </div>

        {/* Price and Availability */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-semibold text-blue-600">
              ${curso.precio.toLocaleString("es-CO")}
            </span>
            <span className="text-gray-600 text-xs ml-1">COP</span>
          </div>

          <div className="text-right">
            {curso.cupos_disponibles > 0 && (
              <>
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  <span>{curso.cupos_disponibles} cupos</span>
                </div>
                <p className="text-[11px] text-gray-500">disponibles</p>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/cursos/${curso.id}`} className="block">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm">
            Ver detalles
          </Button>
        </Link>

        {/* Collapsible Description */}
        {/* Descripción resumida opcional debajo del botón */}
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {curso.descripcion}
        </p>
      </div>
    </div>
  );
}
