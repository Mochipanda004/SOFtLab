import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default async function AdminCursos() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Get all courses with instructor information
  const { data: cursos } = await supabase
    .from('cursos')
    .select(`
      *,
      profesores!inner(
        perfiles!inner(nombre, apellido)
      )
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
          <div className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-900 shadow-sm">
            Cursos
          </div>
          <Link href="/admin/profesores" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Profesores
          </Link>
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
              Gestión de Cursos
            </h1>
            <p className="text-gray-600">
              Administra todos los cursos de la academia
            </p>
          </div>
          <Link href="/admin/cursos/nuevo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Curso
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos && cursos.map((curso) => (
            <Card key={curso.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{curso.titulo}</CardTitle>
                <CardDescription>
                  {curso.categoria} • {curso.nivel}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duración:</span>
                    <span>{curso.duracion_horas} horas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-medium">${curso.precio?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cupos:</span>
                    <span>{curso.cupos_maximos} disponibles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profesor:</span>
                    <span>{curso.profesores?.perfiles?.nombre} {curso.profesores?.perfiles?.apellido}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      curso.estado === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {curso.estado}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Link href={`/cursos/${curso.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                  </Link>
                  <div className="flex space-x-2">
                    <Link href={`/admin/cursos/${curso.id}/editar`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!cursos || cursos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay cursos disponibles</p>
            <Link href="/admin/cursos/nuevo">
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Curso
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}