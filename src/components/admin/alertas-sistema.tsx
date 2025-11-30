import { AlertTriangle, Calendar, FileText } from 'lucide-react'

interface AlertaSistema {
  id: string
  tipo: 'warning' | 'info' | 'success'
  mensaje: string
  icono: 'alert' | 'calendar' | 'document'
}

interface AlertasSistemaProps {
  alertas: AlertaSistema[]
}

export default function AlertasSistema({ alertas }: AlertasSistemaProps) {
  const getIcono = (icono: string) => {
    switch (icono) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'calendar':
        return <Calendar className="w-5 h-5 text-gray-500" />
      case 'document':
        return <FileText className="w-5 h-5 text-gray-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  const getTextoColor = (tipo: string) => {
    switch (tipo) {
      case 'warning':
        return 'text-red-600'
      case 'info':
        return 'text-gray-700'
      case 'success':
        return 'text-green-600'
      default:
        return 'text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Alertas del Sistema</h3>
      <div className="space-y-4">
        {alertas.map((alerta) => (
          <div key={alerta.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl">
            {getIcono(alerta.icono)}
            <p className={`text-sm ${getTextoColor(alerta.tipo)}`}>
              {alerta.mensaje}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}