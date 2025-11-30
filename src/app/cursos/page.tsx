"use client"

import React from 'react'
import { COURSE_DATA } from '@/mocks/courses'
import { CourseCard } from '@/components/course-card'
import { Search, ChevronDown } from 'lucide-react'

export default function CursosPage() {
  const courses = COURSE_DATA

  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado del catálogo */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Catálogo de Cursos</h1>
          <p className="mt-1 text-sm text-gray-600">Explora nuestra amplia selección de cursos y encuentra el perfecto para ti</p>

          {/* Búsqueda y filtros estilo figma (placeholders estáticos) */}
          <div className="mt-6 space-y-4" role="search">
            {/* Barra de búsqueda delgada y alargada */}
            <div className="relative">
              <label htmlFor="search" className="sr-only">Buscar cursos</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden />
              <input
                id="search"
                type="search"
                placeholder="Buscar cursos..."
                className="w-full h-10 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Buscar cursos"
              />
            </div>

            {/* Filtros en forma de pills */}
            <div className="flex items-center gap-3" aria-label="Filtros" role="group">
              <span className="text-sm text-black">Filtros:</span>
              <button type="button" className="inline-flex items-center justify-between rounded-lg bg-gray-50 border border-gray-200 px-3 h-9 text-sm text-gray-700">
                Todos
                <ChevronDown className="ml-2 w-4 h-4 text-gray-400" aria-hidden />
              </button>
              <button type="button" className="inline-flex items-center justify-between rounded-lg bg-gray-50 border border-gray-200 px-3 h-9 text-sm text-gray-700">
                Todos los niveles
                <ChevronDown className="ml-2 w-4 h-4 text-gray-400" aria-hidden />
              </button>
              <button type="button" className="inline-flex items-center justify-between rounded-lg bg-gray-50 border border-gray-200 px-3 h-9 text-sm text-gray-700">
                Todas
                <ChevronDown className="ml-2 w-4 h-4 text-gray-400" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-600">Mostrando {courses.length} de {courses.length} cursos</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(c => (
            <CourseCard key={c.id} curso={c} />
          ))}
        </div>
      </section>
    </main>
  )
}
