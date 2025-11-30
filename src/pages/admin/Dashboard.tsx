import React from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  mockDashboardStats,
  mockCourses,
  mockAlerts,
} from "../../mocks/admin-data";

export default function Dashboard() {
  const stats = mockDashboardStats;
  const recentCourses = mockCourses.slice(0, 3);
  const alerts = mockAlerts.slice(0, 3);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp
                className={`h-4 w-4 ${
                  trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              />
              <span
                className={`text-sm ml-1 ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trendValue}%
              </span>
            </div>
          )}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-600 mt-1">
          Bienvenido al panel de administración de Melody Labs
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Estudiantes"
          value={stats.totalStudents}
          icon={Users}
          trend="up"
          trendValue={stats.studentGrowth}
        />
        <StatCard
          title="Cursos Activos"
          value={stats.activeCourses}
          icon={BookOpen}
          trend="stable"
          trendValue={stats.courseGrowth}
        />
        <StatCard
          title="Ingresos del Mes"
          value={`$${stats.monthlyRevenue}M`}
          icon={DollarSign}
          trend="up"
          trendValue={stats.revenueGrowth}
        />
        <StatCard
          title="Tasa de Ocupación"
          value={`${stats.occupancyRate}%`}
          icon={TrendingUp}
          trend="up"
          trendValue={2.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Placeholder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Distribución de Cursos
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                </div>
                <p className="text-gray-500">Gráfico de distribución</p>
                <p className="text-sm text-gray-400 mt-1">
                  Se implementará con biblioteca de gráficos
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ingresos Mensuales
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <DollarSign className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-gray-500">Gráfico de ingresos</p>
                <p className="text-sm text-gray-400 mt-1">
                  Se implementará con biblioteca de gráficos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actividad Reciente
            </h3>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-start space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {course.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {course.teacher} • {course.enrolledStudents}/
                      {course.maxCapacity} estudiantes
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        course.status === "Lleno"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alertas del Sistema
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    alert.type === "warning" ? "bg-yellow-50" : "bg-blue-50"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {alert.type === "warning" ? (
                      <AlertTriangle className={`h-5 w-5 text-yellow-600`} />
                    ) : (
                      <Info className={`h-5 w-5 text-blue-600`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        alert.type === "warning"
                          ? "text-yellow-800"
                          : "text-blue-800"
                      }`}
                    >
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.timestamp).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
