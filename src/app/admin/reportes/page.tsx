import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, BookOpen, DollarSign, TrendingUp, Download } from 'lucide-react'
import Link from 'next/link'

export default async function AdminReportes() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Get statistics for reports
  const [
    { count: totalUsuarios },
    { count: totalCursos },
    { count: totalInscripciones },
    { count: totalPagos }
  ] = await Promise.all([
    supabase.from('perfiles').select('*', { count: 'exact', head: true }),
    supabase.from('cursos').select('*', { count: 'exact', head: true }),
    supabase.from('inscripciones').select('*', { count: 'exact', head: true }),
    supabase.from('pagos').select('*', { count: 'exact', head: true })
  ])

  // Get monthly income data
  const fechaInicioAño = new Date(new Date().getFullYear(), 0, 1).toISOString()
  const { data: ingresosAnuales } = await supabase
    .from('pagos')
    .select('monto, fecha_pago')
    .eq('estado', 'aprobado')
    .gte('fecha_pago', fechaInicioAño)

  const ingresosPorMes = Array(12).fill(0)
  ingresosAnuales?.forEach(pago => {
    const mes = new Date(pago.fecha_pago).getMonth()
    ingresosPorMes[mes] += pago.monto
  })

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
          <div className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-900 shadow-sm">
            Reportes
          </div>
          <Link href="/admin/configuracion" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Configuración
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reportes y Estadísticas
            </h1>
            <p className="text-gray-600">
              Análisis detallado del rendimiento de la academia
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsuarios || 0}</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCursos || 0}</div>
              <p className="text-xs text-muted-foreground">+5 nuevos este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inscripciones</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInscripciones || 0}</div>
              <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${ingresosPorMes.reduce((sum, ingreso) => sum + ingreso, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Año actual</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Income Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Distribución de ingresos por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ingresosPorMes.map((ingreso, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 text-sm text-gray-600">
                    {new Date(2024, index).toLocaleDateString('es-ES', { month: 'short' })}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((ingreso / Math.max(...ingresosPorMes)) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-sm font-medium text-right">
                    ${ingreso.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reporte de Usuarios</CardTitle>
              <CardDescription>Detalles de registro y actividad</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reporte de Cursos</CardTitle>
              <CardDescription>Popularidad y rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <BookOpen className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reporte Financiero</CardTitle>
              <CardDescription>Ingresos y gastos detallados</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}