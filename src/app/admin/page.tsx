import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { CursosRecientes } from '@/components/admin/cursos-recientes'
import { AlertasSistema } from '@/components/admin/alertas-sistema'
import TabNavigation from '@/components/admin/tab-navigation'
import { Button } from '@/components/ui/button'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  if (user.rol !== 'admin') {
    redirect('/unauthorized')
  }

  const supabase = createClient()

  // Get statistics data
  const [
    { count: totalUsuarios },
    { count: totalCursos },
    { count: totalInscripciones },
    { count: totalClases },
    { count: totalPagos },
    { count: totalCertificados }
  ] = await Promise.all([
    supabase.from('perfiles').select('*', { count: 'exact', head: true }),
    supabase.from('cursos').select('*', { count: 'exact', head: true }),
    supabase.from('inscripciones').select('*', { count: 'exact', head: true }),
    supabase.from('clases').select('*', { count: 'exact', head: true }),
    supabase.from('pagos').select('*', { count: 'exact', head: true }),
    supabase.from('certificados').select('*', { count: 'exact', head: true })
  ])

  // Get monthly income
  const fechaInicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const { data: ingresosMes } = await supabase
    .from('pagos')
    .select('monto')
    .eq('estado', 'aprobado')
    .gte('fecha_pago', fechaInicioMes)

  const totalIngresosMes = ingresosMes?.reduce((sum, pago) => sum + pago.monto, 0) || 0

  // Get recent courses
  const { data: cursosRecientes } = await supabase
    .from('cursos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get system alerts (mock data for now)
  const alertas = [
    {
      id: 1,
      tipo: 'info',
      titulo: 'Actualización del sistema',
      mensaje: 'El sistema se actualizará esta noche a las 2:00 AM'
    },
    {
      id: 2,
      tipo: 'warning',
      titulo: 'Pago pendiente',
      mensaje: '3 estudiantes tienen pagos pendientes'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching Figma design */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Melody Labs</h1>
              <span className="text-sm text-gray-500">Panel de Administrador</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">
                  {user.nombre} {user.apellido}
                </span>
              </div>
              <Link href="/admin/configuracion">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <form action="/auth/logout" method="post">
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido, {user.nombre}
          </h1>
          <p className="text-gray-600">
            Gestiona todos los aspectos de tu academia musical
          </p>
        </div>

        {/* Tab Navigation - Client Component */}
        <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1 mb-8">
          <div className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-900 shadow-sm">
            Resumen
          </div>
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
          <Link href="/admin/configuracion" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900">
            Configuración
          </Link>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats 
          totalUsuarios={totalUsuarios || 0}
          totalCursos={totalCursos || 0}
          totalInscripciones={totalInscripciones || 0}
          totalIngresosMes={totalIngresosMes}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <CursosRecientes cursos={cursosRecientes || []} />
          </div>

          {/* System Alerts */}
          <div>
            <AlertasSistema alertas={alertas} />
          </div>
        </div>
      </div>
    </div>
  )
}