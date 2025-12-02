import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'

interface DashboardStatsProps {
  totalEstudiantes: number
  estudiantesEsteMes: number
  cursosActivos: number
  cursosInactivos: number
  ingresosMes: number
  ingresosVariacion: number
  tasaOcupacion: number
}

export default function DashboardStats({
  totalEstudiantes,
  estudiantesEsteMes,
  cursosActivos,
  cursosInactivos,
  ingresosMes,
  ingresosVariacion,
  tasaOcupacion
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Estudiantes */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Total Estudiantes</p>
          <p className="text-3xl font-bold text-gray-900">{totalEstudiantes}</p>
          <p className="text-xs text-green-600">+{estudiantesEsteMes} este mes</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Cursos Activos */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Cursos Activos</p>
          <p className="text-3xl font-bold text-gray-900">{cursosActivos}</p>
          <p className="text-xs text-gray-500">{cursosInactivos} inactivos</p>
        </div>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Ingresos del Mes */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Ingresos del Mes</p>
          <p className="text-3xl font-bold text-gray-900">${ingresosMes}M</p>
          <p className="text-xs text-green-600">+{ingresosVariacion}%</p>
        </div>
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-purple-600" />
        </div>
      </div>

      {/* Tasa de Ocupación */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Tasa de Ocupación</p>
          <p className="text-3xl font-bold text-gray-900">{tasaOcupacion}%</p>
          <p className="text-xs text-gray-500">De capacidad total</p>
        </div>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-orange-600" />
        </div>
      </div>
    </div>
  )
}