export interface Course {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  lessonsCount: number
  durationMinutes: number
  rating: number
  thumbnailUrl: string
  author: {
    name: string
    avatarUrl?: string
  }
  tags: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface HeroContent {
  title: string
  subtitle: string
  ctaText: string
}

export interface HomeData {
  hero: HeroContent
  categories: Category[]
  courses: Course[]
}

export const HOME_DATA: HomeData = {
  hero: {
    title: 'Te damos la bienvenida a Melody Labs',
    subtitle:
      'Aprende producción musical, teoría y mezcla con cursos guiados por expertos. Avanza a tu ritmo y crea tu mejor sonido.',
    ctaText: 'Explorar cursos',
  },
  categories: [
    { id: 'cat-1', name: 'Producción', slug: 'produccion' },
    { id: 'cat-2', name: 'Mezcla', slug: 'mezcla' },
    { id: 'cat-3', name: 'Teoría musical', slug: 'teoria' },
  ],
  courses: [
    {
      id: 'c-101',
      title: 'Producción en Ableton Live',
      description:
        'Domina el flujo de trabajo en Ableton: composición, edición y arreglos profesionales.',
      level: 'Beginner',
      lessonsCount: 24,
      durationMinutes: 320,
      rating: 4.8,
      thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
      author: { name: 'Equipo Melody Labs' },
      tags: ['Ableton', 'Producción', 'Workflow'],
    },
    {
      id: 'c-102',
      title: 'Mezcla moderna para Pop y Trap',
      description:
        'EQ, compresión, reverb y técnicas actuales para lograr mezclas competitivas.',
      level: 'Intermediate',
      lessonsCount: 18,
      durationMinutes: 270,
      rating: 4.7,
      thumbnailUrl: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=1200&auto=format&fit=crop',
      author: { name: 'Equipo Melody Labs' },
      tags: ['Mixing', 'Pop', 'Trap'],
    },
    {
      id: 'c-103',
      title: 'Teoría musical aplicada al DAW',
      description:
        'Armonía, escalas y progreso de acordes con ejemplos prácticos en tu DAW.',
      level: 'Beginner',
      lessonsCount: 20,
      durationMinutes: 300,
      rating: 4.6,
      thumbnailUrl: 'https://images.unsplash.com/photo-1520135017665-269e837b0c77?q=80&w=1200&auto=format&fit=crop',
      author: { name: 'Equipo Melody Labs' },
      tags: ['Teoría', 'Armonía', 'DAW'],
    },
  ],
}

