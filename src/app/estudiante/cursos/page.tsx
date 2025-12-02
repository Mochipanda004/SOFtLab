import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Calendar, Award, Clock, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default async function MisCursosPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'alumno' && user.role !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Obtener cursos del estudiante con información completa
  const { data: inscripciones, error } = await supabase
    .from('inscripciones')
    .select(`
      *,
      cursos (*),
      pagos (*)
    `)
    .eq('alumno_id', user.id)
    .order('fecha_inscripcion', { ascending: false })

  if (error) {
    console.error('Error al obtener cursos:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/estudiante" className="text-2xl font-bold text-gray-900">
                Melody Labs
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {user.full_name || user.email}
              </span>
              <Link href="/estudiante">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Cursos</h1>
          <p className="text-gray-600">
            Gestiona tus cursos y accede a las clases, materiales y evaluaciones.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inscripciones?.filter(i => i.estado === 'pagado').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inscripciones?.filter(i => i.estado === 'reservado').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inscripciones?.filter(i => i.estado === 'completado').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${inscripciones?.reduce((sum, i) => sum + (i.cursos?.precio || 0), 0)?.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de cursos */}
        {inscripciones && inscripciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inscripciones.map((inscripcion) => (
              <Card key={inscripcion.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{inscripcion.cursos?.titulo}</CardTitle>
                    <Badge 
                      variant={
                        inscripcion.estado === 'pagado' ? 'default' :
                        inscripcion.estado === 'reservado' ? 'secondary' :
                        inscripcion.estado === 'cancelado' ? 'destructive' :
                        'outline'
                      }
                    >
                      {inscripcion.estado.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription>{inscripcion.cursos?.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Nivel:</span>
                    <Badge variant="outline" className="capitalize">
                      {inscripcion.cursos?.nivel}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Modalidad:</span>
                    <span className="font-medium capitalize">{inscripcion.cursos?.modalidad}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duración:</span>
                    <span className="font-medium">{inscripcion.cursos?.duracion_semanas} semanas</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Inscrito el:</span>
                    <span className="font-medium">
                      {new Date(inscripcion.fecha_inscripcion).toLocaleDateString()}
                    </span>
                  </div>

                  {inscripcion.pagos && inscripcion.pagos.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Último pago:</span>
                        <Badge 
                          variant={
                            inscripcion.pagos[0].estado === 'aprobado' ? 'default' :
                            inscripcion.pagos[0].estado === 'pendiente' ? 'secondary' :
                            'destructive'
                          }
                        >
                          {inscripcion.pagos[0].estado.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    {inscripcion.estado === 'pagado' && (
                      <Link href={`/estudiante/cursos/${inscripcion.curso_id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Ver Curso
                        </Button>
                      </Link>
                    )}
                    
                    {inscripcion.estado === 'reservado' && (
                      <Link href={`/pagos/${inscripcion.pagos?.[0]?.referencia_pago}`} className="block">
                        <Button variant="outline" className="w-full">
                          Completar Pago
                        </Button>
                      </Link>
                    )}

                    <Link href={`/estudiante/cursos/${inscripcion.curso_id}/certificado`} className="block">
                      <Button variant="outline" className="w-full">
                        Ver Certificado
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes cursos inscritos</h3>
              <p className="text-gray-600 mb-6">
                Explora nuestros cursos disponibles y comienza tu viaje musical hoy.
              </p>
              <Link href="/cursos">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Explorar Cursos
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}