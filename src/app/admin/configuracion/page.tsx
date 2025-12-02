import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, Settings, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminConfiguracion() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Melody Labs</h1>
              <span className="text-sm text-gray-500">Panel de Administrador</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.nombre} {user.apellido}
              </span>
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  Volver al Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1 mb-8">
          <Link href="/admin" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Resumen
          </Link>
          <Link href="/admin/cursos" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Cursos
          </Link>
          <Link href="/admin/profesores" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Profesores
          </Link>
          <Link href="/admin/estudiantes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Estudiantes
          </Link>
          <Link href="/admin/reportes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Reportes
          </Link>
          <div className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-900 shadow-sm">
            Configuración
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Settings className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">
              Configuración General
            </h1>
          </div>
          <p className="text-gray-600">
            Administra la configuración de tu academia musical
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academy Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Academia</CardTitle>
              <CardDescription>
                Datos generales de Melody Labs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre de la Academia</Label>
                <Input 
                  id="nombre" 
                  defaultValue="Melody Labs"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email"
                  defaultValue="info@melodylabs.edu.co"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input 
                  id="telefono" 
                  defaultValue="+57 300 123 4567"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input 
                  id="direccion" 
                  defaultValue="Calle 123 # 45-67, Pereira, Colombia"
                  className="mt-1"
                />
              </div>
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>
                Opciones de funcionamiento del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="horario">Horario de Atención</Label>
                <Input 
                  id="horario" 
                  defaultValue="Lunes a Viernes 8:00 AM - 6:00 PM"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="max_estudiantes">Máximo de Estudiantes por Curso</Label>
                <Input 
                  id="max_estudiantes" 
                  type="number"
                  defaultValue="20"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="duracion_clase">Duración de Clases (minutos)</Label>
                <Input 
                  id="duracion_clase" 
                  type="number"
                  defaultValue="60"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="politica_cancelacion">Política de Cancelación</Label>
                <textarea 
                  id="politica_cancelacion" 
                  defaultValue="Las clases deben ser canceladas con al menos 24 horas de anticipación."
                  className="mt-1 w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Aplicar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>
                Opciones de pago y facturación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="moneda">Moneda Principal</Label>
                <select 
                  id="moneda" 
                  defaultValue="COP"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COP">COP - Peso Colombiano</option>
                  <option value="USD">USD - Dólar Estadounidense</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div>
                <Label htmlFor="impuesto">Impuesto (%)</Label>
                <Input 
                  id="impuesto" 
                  type="number"
                  defaultValue="19"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="metodos_pago">Métodos de Pago Aceptados</Label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Transferencia Bancaria
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    PSE (Pagos Seguros en Línea)
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Tarjeta de Crédito
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Tarjeta de Débito
                  </label>
                </div>
              </div>
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Guardar Configuración
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>
                Preferencias de comunicación con usuarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email_notificaciones">Email de Notificaciones</Label>
                <Input 
                  id="email_notificaciones" 
                  type="email"
                  defaultValue="notificaciones@melodylabs.edu.co"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Recordatorios Automáticos</Label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Recordatorio de clases (24h antes)
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Recordatorio de pagos pendientes
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Confirmación de inscripción
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Newsletter mensual
                  </label>
                </div>
              </div>
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Guardar Preferencias
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}