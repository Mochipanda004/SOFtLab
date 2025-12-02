import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, Award, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default async function EstudianteDashboard() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'estudiante' && user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Obtener el perfil del estudiante
  const { data: perfilEstudiante, error: perfilError } = await supabase
    .from('estudiantes')
    .select('id')
    .eq('perfil_id', user.id)
    .single()

  if (!perfilEstudiante) {
    return <div>Error: No se encontró el perfil de estudiante</div>
  }

  // Obtener cursos del estudiante
  const { data: cursos, error: cursosError } = await supabase
    .from('inscripciones')
    .select(`
      *,
      cursos (*)
    `)
    .eq('estudiante_id', perfilEstudiante.id)
    .eq('estado', 'pagado')

  // Obtener próximas clases
  const { data: clases, error: clasesError } = await supabase
    .from('clases')
    .select(`
      *,
      cursos (titulo)
    `)
    .eq('estudiante_id', perfilEstudiante.id)
    .gte('fecha_hora', new Date().toISOString())
    .order('fecha_hora', { ascending: true })
    .limit(5)

  // Obtener certificados
  const { data: certificados, error: certificadosError } = await supabase
    .from('certificados')
    .select('*')
    .eq('estudiante_id', perfilEstudiante.id)

  // Obtener membresía actual
  const { data: membresia, error: membresiaError } = await supabase
    .from('membresias')
    .select('*')
    .eq('alumno_id', user.id)
    .eq('estado', 'activa')
    .single()

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
                Bienvenido, {user.nombre} {user.apellido}
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
            ¡Bienvenido a tu Dashboard, {user.nombre}!
          </h1>
          <p className="text-gray-600">
            Gestiona tus cursos, clases y progreso musical aquí.
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cursos?.length || 0}</div>
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
              <CardTitle className="text-sm font-medium">Certificados</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificados?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membresía</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {membresia ? 'Activa' : 'No activa'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cursos Activos */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>Cursos en los que estás inscrito</CardDescription>
            </CardHeader>
            <CardContent>
              {cursos && cursos.length > 0 ? (
                <div className="space-y-4">
                  {cursos.map((inscripcion) => (
                    <div key={inscripcion.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {inscripcion.cursos?.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Inscrito el {new Date(inscripcion.fecha_inscripcion).toLocaleDateString()}
                        </p>
                      </div>
                      <Link href={`/estudiante/cursos/${inscripcion.curso_id}`}>
                        <Button variant="outline" size="sm">
                          Ver Curso
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No estás inscrito en ningún curso</p>
                  <Link href="/cursos">
                    <Button>Explorar Cursos</Button>
                  </Link>
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
            <Link href="/estudiante/cursos">
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Mis Cursos
              </Button>
            </Link>
            <Link href="/estudiante/clases">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Mis Clases
              </Button>
            </Link>
            <Link href="/estudiante/evaluaciones">
              <Button variant="outline" className="w-full">
                Mis Evaluaciones
              </Button>
            </Link>
            <Link href="/estudiante/pagos">
              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Mis Pagos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}