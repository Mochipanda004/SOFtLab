export type EventItem = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
}

export const upcomingEvents: EventItem[] = [
  {
    id: 'recital-piano',
    title: 'Recital de Piano Estudiantil',
    date: '2025-12-05',
    time: '18:00',
    location: 'Auditorio Melody Labs',
    description: 'Presentaciones de alumnos del curso Piano Básico e Intermedio.'
  },
  {
    id: 'masterclass-guitarra',
    title: 'Masterclass de Guitarra con Carlos Ramírez',
    date: '2025-12-12',
    time: '17:00',
    location: 'Sala A + transmisión online',
    description: 'Técnicas modernas y ejercicios prácticos para mejorar tu ejecución.'
  },
  {
    id: 'clinica-saxofon',
    title: 'Clínica de Saxofón',
    date: '2025-12-20',
    time: '10:00',
    location: 'Estudio 2',
    description: 'Sesión intensiva de respiración, articulación y fraseo.'
  }
]

