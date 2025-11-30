import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, Calendar, Award } from 'lucide-react'
import Link from 'next/link'

export default async function ProfesorDashboard() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'profesor' && user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Obtener el perfil del profesor
  const { data: perfilProfesor, error: perfilError } = await supabase
    .from('profesores')
    .select('id')
    .eq('perfil_id', user.id)
    .single()

  if (!perfilProfesor) {
    return <div>Error: No se encontró el perfil de profesor</div>
  }

  // Obtener cursos del profesor
  const { data: cursos, error: cursosError } = await supabase
    .from('cursos')
    .select('*')
    .eq('profesor_id', perfilProfesor.id)

  // Obtener estudiantes del profesor
  const { data: estudiantes, error: estudiantesError } = await supabase
    .from('inscripciones')
    .select(`
      *,
      estudiantes (
        id,
        perfiles (nombre, apellido, email)
      ),
      cursos (titulo)
    `)
    .eq('cursos.profesor_id', perfilProfesor.id)
    .eq('estado', 'pagado')

  // Obtener clases del profesor
  const { data: clases, error: clasesError } = await supabase
    .from('clases')
    .select(`
      *,
      cursos (titulo)
    `)
    .eq('profesor_id', perfilProfesor.id)
    .gte('fecha_hora', new Date().toISOString())
    .order('fecha_hora', { ascending: true })
    .limit(5)

  // Obtener evaluaciones pendientes
  const { data: evaluaciones, error: evaluacionesError } = await supabase
    .from('evaluaciones')
    .select(`
      *,
      cursos (titulo)
    `)
    .eq('profesor_id', user.id)
    .eq('estado', 'activa')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Melody Labs</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {user.full_name || user.email}
              </span>
              <form action="/auth/logout" method="post">
                <Button type="submit" variant="outline" size="sm">
                  Cerrar Sesión
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido a tu Dashboard, Profesor {user.full_name}!
          </h1>
          <p className="text-gray-600">
            Gestiona tus cursos, clases y estudiantes aquí.
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Cursos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cursos?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estudiantes?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas Clases</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clases?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evaluaciones Activas</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{evaluaciones?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mis Cursos */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>Cursos que impartes</CardDescription>
            </CardHeader>
            <CardContent>
              {cursos && cursos.length > 0 ? (
                <div className="space-y-4">
                  {cursos.map((curso) => (
                    <div key={curso.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {curso.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {curso.categoria} • {curso.nivel}
                        </p>
                      </div>
                      <Link href={`/profesor/cursos/${curso.id}`}>
                        <Button variant="outline" size="sm">
                          Gestionar
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No tienes cursos asignados</p>
                  <p className="text-sm text-gray-500">
                    Contacta al administrador para asignarte cursos.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Próximas Clases */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Clases</CardTitle>
              <CardDescription>Tus clases programadas</CardDescription>
            </CardHeader>
            <CardContent>
              {clases && clases.length > 0 ? (
                <div className="space-y-4">
                  {clases.map((clase) => (
                    <div key={clase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {clase.cursos?.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(clase.fecha_hora).toLocaleDateString()} a las {new Date(clase.fecha_hora).toLocaleTimeString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        clase.estado === 'programada' ? 'bg-blue-100 text-blue-800' :
                        clase.estado === 'en_curso' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {clase.estado}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No tienes clases programadas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navegación rápida */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Accesos Rápidos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/profesor/cursos">
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Mis Cursos
              </Button>
            </Link>
            <Link href="/profesor/estudiantes">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Mis Estudiantes
              </Button>
            </Link>
            <Link href="/profesor/clases">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Mis Clases
              </Button>
            </Link>
            <Link href="/profesor/evaluaciones">
              <Button variant="outline" className="w-full">
                <Award className="mr-2 h-4 w-4" />
                Evaluaciones
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}