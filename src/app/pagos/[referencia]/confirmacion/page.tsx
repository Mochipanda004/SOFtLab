'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ConfirmacionPagoProps {
  params: { referencia: string }
}

export default function ConfirmacionPagoPage({ params }: ConfirmacionPagoProps) {
  const [loading, setLoading] = useState(true)
  const [pago, setPago] = useState<any>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchEstadoPago()
  }, [params.referencia])

  const fetchEstadoPago = async () => {
    try {
      const response = await fetch(`/api/pagos/${params.referencia}/estado`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener el estado del pago')
      }

      setPago(data.pago)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el estado del pago')
      setLoading(false)
    }
  }

  const getEstadoIcono = (estado: string) => {
    switch (estado) {
      case 'aprobado':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'rechazado':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'pendiente':
        return <Clock className="w-16 h-16 text-yellow-500" />
      default:
        return <AlertCircle className="w-16 h-16 text-gray-500" />
    }
  }

  const getEstadoTitulo = (estado: string) => {
    switch (estado) {
      case 'aprobado':
        return '¡Pago Exitoso!'
      case 'rechazado':
        return 'Pago Rechazado'
      case 'pendiente':
        return 'Pago en Proceso'
      default:
        return 'Estado del Pago'
    }
  }

  const getEstadoDescripcion = (estado: string) => {
    switch (estado) {
      case 'aprobado':
        return 'Tu pago ha sido procesado exitosamente. Ya estás inscrito en el curso.'
      case 'rechazado':
        return 'Tu pago fue rechazado. Por favor, intenta con otro método de pago.'
      case 'pendiente':
        return 'Tu pago está siendo procesado. Recibirás una notificación cuando se complete.'
      default:
        return 'Estado del pago no disponible.'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando estado del pago...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          {getEstadoIcono(pago?.estado)}
          <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
            {getEstadoTitulo(pago?.estado)}
          </h1>
          <p className="text-gray-600 text-lg">
            {getEstadoDescripcion(pago?.estado)}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalles del Pago</CardTitle>
            <CardDescription>
              Referencia: {pago?.referencia_pago}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Curso:</span>
              <span className="font-medium">{pago?.inscripciones?.cursos?.titulo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monto:</span>
              <span className="font-bold text-lg">${pago?.monto?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <Badge 
                variant={
                  pago?.estado === 'aprobado' ? 'default' :
                  pago?.estado === 'rechazado' ? 'destructive' :
                  'secondary'
                }
              >
                {pago?.estado?.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha:</span>
              <span className="text-sm">
                {pago?.fecha_pago ? new Date(pago.fecha_pago).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {pago?.estado === 'aprobado' ? (
            <>
              <Link href="/estudiante/cursos">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ver Mis Cursos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/estudiante">
                <Button variant="outline">
                  Ir al Dashboard
                </Button>
              </Link>
            </>
          ) : pago?.estado === 'rechazado' ? (
            <>
              <Link href={`/pagos/${pago?.referencia_pago}`}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Intentar de Nuevo
                </Button>
              </Link>
              <Link href="/estudiante/cursos">
                <Button variant="outline">
                  Ver Mis Cursos
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button onClick={() => window.location.reload()} variant="outline">
                Actualizar Estado
              </Button>
              <Link href="/estudiante/cursos">
                <Button variant="outline">
                  Ver Mis Cursos
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Si tienes alguna pregunta sobre tu pago, por favor contacta a nuestro equipo de soporte.
          </p>
          <Link href="/contacto" className="text-purple-600 hover:text-purple-500">
            Contactar Soporte
          </Link>
        </div>
      </div>
    </div>
  )
}