'use client'

import { useState, useEffect } from 'react'
import { CourseCard } from '@/components/course-card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface Curso {
  id: string
  titulo: string
  descripcion: string
  categoria: string
  nivel: 'basico' | 'intermedio' | 'avanzado'
  modalidad: 'presencial' | 'virtual' | 'hibrido'
  precio: number
  duracion_meses: number
  cupo_maximo: number
  imagen_url: string | null
  profesor?: {
    nombre: string
    horario: string
  }
  cupos_disponibles: number
  badges?: string[]
}

// Mock data for demonstration
const mockCursos: Curso[] = [
  {
    id: '1',
    titulo: 'Piano Básico',
    descripcion: 'Aprende los fundamentos del piano desde cero',
    categoria: 'Piano',
    nivel: 'basico',
    modalidad: 'presencial',
    precio: 450000,
    duracion_meses: 3,
    cupo_maximo: 10,
    imagen_url: null,
    profesor: {
      nombre: 'Prof. María González',
      horario: 'Lunes y Miércoles 18:00-19:30'
    },
    cupos_disponibles: 5,
    badges: ['Nuevo', 'Popular']
  },
  {
    id: '2',
    titulo: 'Batería para Principiantes',
    descripcion: 'Descubre el ritmo y la percusión',
    categoria: 'Batería',
    nivel: 'basico',
    modalidad: 'presencial',
    precio: 500000,
    duracion_meses: 3,
    cupo_maximo: 8,
    imagen_url: null,
    profesor: {
      nombre: 'Prof. Luis Hernández',
      horario: 'Sábados 10:00-12:00'
    },
    cupos_disponibles: 8,
    badges: ['Principiante']
  },
  {
    id: '3',
    titulo: 'Guitarra Intermedia',
    descripcion: 'Perfecciona tu técnica en guitarra',
    categoria: 'Guitarra',
    nivel: 'intermedio',
    modalidad: 'hibrido',
    precio: 520000,
    duracion_meses: 4,
    cupo_maximo: 12,
    imagen_url: null,
    profesor: {
      nombre: 'Prof. Carlos Ramírez',
      horario: 'Martes y Jueves 17:00-18:30'
    },
    cupos_disponibles: 3,
    badges: ['Intermedio']
  },
  {
    id: '4',
    titulo: 'Teoría Musical',
    descripcion: 'Fundamentos de la teoría musical',
    categoria: 'Teoría',
    nivel: 'basico',
    modalidad: 'virtual',
    precio: 380000,
    duracion_meses: 2,
    cupo_maximo: 20,
    imagen_url: null,
    profesor: {
      nombre: 'Prof. Patricia López',
      horario: 'Lunes 19:00-20:30'
    },
    cupos_disponibles: 15,
    badges: ['Nuevo', 'Online']
  },
  {
    id: '5',
    titulo: 'Violín Avanzado',
    descripcion: 'Técnica avanzada y repertorio clásico',
    categoria: 'Violín',
    nivel: 'avanzado',
    modalidad: 'presencial',
    precio: 680000,
    duracion_meses: 6,
    cupo_maximo: 6,
    imagen_url: null,
    profesor: {
      nombre: 'Prof. Ana Martínez',
      horario: 'Viernes 16:00-18:00'
    },
    cupos_disponibles: 0,
    badges: ['Avanzado']
  },
  {
    id: '6',
    titulo: 'Saxofón Intermedio',
    descripcion: 'Desarrollo de técnica y estilo',
    categoria: 'Saxofón',
    nivel: 'intermedio',
    modalidad: 'hibrido',
    precio: 600000,
    duracion_meses: 4,
    cupo_maximo: 8,
    imagen_url: null,
    profesor: {
      nombre: 'Prof. Roberto Silva',
      horario: 'Miércoles 18:00-19:30'
    },
    cupos_disponibles: 4,
    badges: ['Intermedio', 'Nuevo']
  }
]

export function CourseCatalog() {
  const [cursos, setCursos] = useState<Curso[]>(mockCursos)
  const [loading, setLoading] = useState(false)

  // TODO: Fetch real data from Supabase
  // useEffect(() => {
  //   fetchCursos()
  // }, [])

  // const fetchCursos = async () => {
  //   setLoading(true)
  //   try {
  //     const { data, error } = await supabase
  //       .from('cursos')
  //       .select(`
  //         *,
  //         curso_profesores!inner(
  //           profiles!inner(
  //             full_name
  //           )
  //         )
  //       `)
  //       .eq('estado', 'activo')
  //     
  //     if (error) throw error
  //     
  //     // Transform data to match our interface
  //     const transformedData = data.map(curso => ({
  //       ...curso,
  //       profesor: curso.curso_profesores?.[0]?.profiles ? {
  //         nombre: curso.curso_profesores[0].profiles.full_name,
  //         horario: 'Horario por definir' // TODO: Add horario to database
  //       } : undefined,
  //       cupos_disponibles: curso.cupo_maximo - (curso.inscripciones_count || 0)
  //     }))
  //     
  //     setCursos(transformedData)
  //   } catch (error) {
  //     console.error('Error fetching cursos:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <section id="cursos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Catálogo de Cursos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra amplia selección de cursos y encuentra el perfecto para ti
          </p>
        </div>

        {/* Course Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Mostrando {cursos.length} de {cursos.length} cursos
          </p>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}