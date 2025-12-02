'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Calendar, Users, CreditCard, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface InscripcionCursoProps {
  params: { id: string }
  curso: {
    id: string
    titulo: string
    descripcion: string
    precio: number
    duracion_semanas: number
    nivel: string
    categoria: string
    modalidad: string
    cupo_maximo: number
  }
}

export default function InscripcionCursoPage({ params, curso }: InscripcionCursoProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [metodoPago, setMetodoPago] = useState<'pse' | 'tarjeta' | null>(null)
  const router = useRouter()

  const handleInscripcion = async () => {
    if (!metodoPago) {
      setError('Por favor selecciona un método de pago')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/cursos/${params.id}/inscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metodo_pago: metodoPago,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la inscripción')
      }

      // Redirigir a la página de pago o confirmación
      if (metodoPago === 'pse') {
        router.push(`/pagos/pse/${data.referencia_pago}`)
      } else {
        router.push(`/pagos/tarjeta/${data.referencia_pago}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la inscripción')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href={`/cursos/${params.id}`} className="text-purple-600 hover:text-purple-500">
            ← Volver al curso
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información del curso */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Confirmar Inscripción</CardTitle>
                <CardDescription>
                  Revisa la información del curso y selecciona tu método de pago
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Detalles del curso */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{curso.titulo}</h3>
                  <p className="text-gray-600 mb-4">{curso.descripcion}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Duración</p>
                        <p className="font-medium">{curso.duracion_semanas} semanas</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Modalidad</p>
                        <p className="font-medium capitalize">{curso.modalidad}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sm">
                        {curso.nivel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sm">
                        {curso.categoria}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Método de pago */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Método de Pago</h4>
                  <div className="space-y-3">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        metodoPago === 'pse'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMetodoPago('pse')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-6 h-6 text-purple-600" />
                          <div>
                            <p className="font-medium">PSE - Transferencia Bancaria</p>
                            <p className="text-sm text-gray-600">Pago seguro a través de tu banco</p>
                          </div>
                        </div>
                        {metodoPago === 'pse' && (
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        metodoPago === 'tarjeta'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMetodoPago('tarjeta')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-6 h-6 text-purple-600" />
                          <div>
                            <p className="font-medium">Tarjeta de Crédito/Débito</p>
                            <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        {metodoPago === 'tarjeta' && (
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleInscripcion}
                  disabled={loading || !metodoPago}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? 'Procesando...' : 'Continuar con el Pago'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resumen de pago */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Curso:</span>
                  <span className="font-medium">{curso.titulo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-medium">${curso.precio?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">{curso.duracion_semanas} semanas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nivel:</span>
                  <span className="font-medium capitalize">{curso.nivel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modalidad:</span>
                  <span className="font-medium capitalize">{curso.modalidad}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total a pagar:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${curso.precio?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Información importante:</p>
                      <p>
                        Una vez completado el pago, recibirás un correo de confirmación con los detalles del curso y acceso a las clases.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}