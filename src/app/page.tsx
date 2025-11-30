"use client"

import HeroSection from '@/components/HeroSection'
import CourseList from '@/components/CourseList'
import { HOME_DATA, type Course } from '@/mocks/home-data'
import { COURSE_DATA } from '@/mocks/courses'
import Link from 'next/link'

export default function Home() {
  const levelMap: Record<string, Course['level']> = {
    basico: 'Beginner',
    intermedio: 'Intermediate',
    avanzado: 'Advanced',
  }

  const pick = (id: string): Course | undefined => {
    const c = COURSE_DATA.find((x) => x.id === id)
    if (!c) return undefined
    const hours = c.duracion_meses * 4 // semanas aproximadas
    return {
      id: c.id,
      title: c.titulo,
      description: c.descripcion || '',
      level: levelMap[c.nivel],
      lessonsCount: hours, // aproximación
      durationMinutes: hours * 60,
      rating: (c as any).rating ?? 4.7,
      thumbnailUrl: c.imagen_url || '',
      author: { name: c.profesor.nombre },
      tags: [c.categoria, c.nivel, c.modalidad],
    }
  }

  const previewCourses = [
    pick('piano-basico'),
    pick('guitarra-intermedia'),
    pick('violin-avanzado'),
  ].filter(Boolean) as Course[]

  return (
    <main className="min-h-screen w-full">
      <HeroSection data={HOME_DATA.hero} ctaHref="/cursos" />
      <section
        className="relative overflow-hidden px-6 py-16"
        style={{
          background:
            'linear-gradient(135deg, rgb(224, 242, 254) 0%, rgb(219, 234, 254) 25%, rgb(245, 208, 254) 60%, rgb(229, 231, 255) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black">Explora Nuestros Cursos</h2>
          <p className="mt-2 text-sm md:text-base text-black">Un adelanto de lo que puedes aprender</p>
          <div className="mt-8 rounded-2xl bg-white/70 backdrop-blur p-2">
            <CourseList courses={previewCourses} />
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="/cursos" className="inline-flex px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-sm">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
