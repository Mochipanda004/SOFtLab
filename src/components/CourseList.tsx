'use client'

import React from 'react'
import type { Course } from '@/mocks/home-data'

interface Props {
  courses: Course[]
}

export default function CourseList({ courses }: Props) {
  return (
    <section className="px-6 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <article
            key={c.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <img
              src={c.thumbnailUrl}
              alt={c.title}
              className="h-40 w-full rounded-lg object-cover"
            />
            <h3 className="mt-3 text-lg font-semibold text-gray-900">{c.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{c.description}</p>
            <div className="mt-3 text-xs text-gray-500">
              {c.level} • {c.lessonsCount} lecciones • {Math.round(c.durationMinutes / 60)}h • ⭐ {c.rating}
            </div>
            <div className="mt-2 text-xs text-gray-500">Por {c.author.name}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

