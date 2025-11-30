import React from "react";
import { FileText, Download, Filter, Calendar } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
            <p className="text-gray-600 mt-1">
              Genera reportes financieros y académicos
            </p>
          </div>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Reporte
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleccionar tipo</option>
              <option value="financial">Reporte Financiero</option>
              <option value="academic">Reporte Académico</option>
              <option value="enrollment">Reporte de Inscripciones</option>
              <option value="attendance">Reporte de Asistencia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Inicio
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Fin
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Aplicar Filtros</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Generar Reporte</span>
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Vista Previa del Reporte
          </h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Descargar PDF</span>
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Selecciona un tipo de reporte
          </h4>
          <p className="text-gray-500">
            El reporte se generará aquí una vez que selecciones los filtros y
            hagas clic en "Generar Reporte"
          </p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Reportes Recientes
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Reporte Financiero - Noviembre 2024
                </p>
                <p className="text-xs text-gray-500">Generado el 15 nov 2024</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              Descargar
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Reporte Académico - Trimestre 3
                </p>
                <p className="text-xs text-gray-500">Generado el 10 nov 2024</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
