interface CursoReciente {
  id: string
  nombre: string
  profesor: string
  estudiantesActuales: number
  capacidadMaxima: number
  estado: 'lleno' | 'activo' | 'inactivo'
}

interface CursosRecientesProps {
  cursos: CursoReciente[]
}

export default function CursosRecientes({ cursos }: CursosRecientesProps) {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'lleno':
        return 'bg-blue-500 text-white'
      case 'activo':
        return 'bg-purple-500 text-white'
      case 'inactivo':
        return 'bg-gray-200 text-gray-700'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'lleno':
        return 'Lleno'
      case 'activo':
        return 'Activo'
      case 'inactivo':
        return 'Inactivo'
      default:
        return 'Desconocido'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Cursos Recientes</h3>
      <div className="space-y-4">
        {cursos.map((curso) => (
          <div key={curso.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{curso.nombre}</h4>
              <p className="text-sm text-gray-600">
                Prof. {curso.profesor} • {curso.estudiantesActuales}/{curso.capacidadMaxima} estudiantes
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(curso.estado)}`}>
              {getEstadoTexto(curso.estado)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}