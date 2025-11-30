import React, { useState } from "react";
import { Music, Home, Plus, Search, Edit } from "lucide-react";
import { mockResources } from "../../mocks/admin-data";

export default function Resources() {
  const [resources, setResources] = useState(mockResources);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "Ocupado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Sala" ? Home : Music;
  };

  const toggleResourceStatus = (id: string) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              status:
                resource.status === "Disponible" ? "Ocupado" : "Disponible",
              occupiedBy:
                resource.status === "Disponible" ? "Administrador" : null,
            }
          : resource
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Recursos
            </h1>
            <p className="text-gray-600 mt-1">
              Administra salas e instrumentos de la academia
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nuevo Recurso</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = getTypeIcon(resource.type);
          return (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-lg mr-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-gray-500">{resource.type}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      resource.status
                    )}`}
                  >
                    {resource.status}
                  </span>
                </div>

                {resource.occupiedBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ocupado por:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {resource.occupiedBy}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => toggleResourceStatus(resource.id)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      resource.status === "Disponible"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {resource.status === "Disponible"
                      ? "Marcar como Ocupado"
                      : "Marcar como Disponible"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
