import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Mail, Phone, Calendar, Award } from 'lucide-react'
import Link from 'next/link'

export default async function AdminProfesores() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Get all teachers with their profile information
  const { data: profesores } = await supabase
    .from('profesores')
    .select(`
      *,
      perfiles!inner(*)
    `)
    .order('created_at', { ascending: false })

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
          <div className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-900 shadow-sm">
            Profesores
          </div>
          <Link href="/admin/estudiantes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Estudiantes
          </Link>
          <Link href="/admin/reportes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Reportes
          </Link>
          <Link href="/admin/configuracion" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Configuración
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Profesores
            </h1>
            <p className="text-gray-600">
              Administra todos los profesores de la academia
            </p>
          </div>
          <Link href="/admin/profesores/nuevo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Profesor
            </Button>
          </Link>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profesores && profesores.map((profesor) => (
            <Card key={profesor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  {profesor.perfiles.nombre} {profesor.perfiles.apellido}
                </CardTitle>
                <CardDescription>
                  Profesor de {profesor.especialidad}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">{profesor.perfiles.email}</span>
                  </div>
                  {profesor.perfiles.telefono && (
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">{profesor.perfiles.telefono}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">
                      Se unió el {new Date(profesor.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">
                      {profesor.anos_experiencia} años de experiencia
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      profesor.estado === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profesor.estado}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Link href={`/admin/profesores/${profesor.id}`}>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </Link>
                  <div className="flex space-x-2">
                    <Link href={`/admin/profesores/${profesor.id}/editar`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!profesores || profesores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay profesores registrados</p>
            <Link href="/admin/profesores/nuevo">
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Primer Profesor
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}