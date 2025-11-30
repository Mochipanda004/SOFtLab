export type CursoNivel = 'basico' | 'intermedio' | 'avanzado'
export type CursoModalidad = 'presencial' | 'virtual' | 'hibrido'

export interface CursoMock {
  id: string
  titulo: string
  categoria: string
  nivel: CursoNivel
  modalidad: CursoModalidad
  precio: number
  duracion_meses: number
  cupo_maximo: number
  imagen_url: string | null
  profesor: {
    nombre: string
    horario: string
    bio?: string
  }
  cupos_disponibles: number
  badges?: string[]
  descripcion?: string
  certificacion?: boolean
  materiales_incluidos?: number
  aprendizajes?: string[]
  programa?: { titulo: string; duracion: string }[]
  requisitos?: string[]
  materiales?: string[]
  rating?: number
  opiniones?: number
}

export const COURSE_DATA: CursoMock[] = [
  {
    id: 'piano-basico',
    titulo: 'Piano Básico',
    categoria: 'Piano',
    nivel: 'basico',
    modalidad: 'presencial',
    precio: 450000,
    duracion_meses: 3,
    cupo_maximo: 12,
    imagen_url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    profesor: { nombre: 'Prof. María González', horario: 'Lunes y Miércoles 18:00-19:30' },
    cupos_disponibles: 5,
    badges: ['Nuevo'],
    descripcion: 'Aprende los fundamentos del piano desde cero. Técnica, lectura de partituras y piezas clásicas/contemporáneas.',
    certificacion: true,
    materiales_incluidos: 4,
  },
  {
    id: 'guitarra-intermedia',
    titulo: 'Guitarra Intermedia',
    categoria: 'Guitarra',
    nivel: 'intermedio',
    modalidad: 'hibrido',
    precio: 520000,
    duracion_meses: 4,
    cupo_maximo: 12,
    imagen_url: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=1200&auto=format&fit=crop',
    profesor: {
      nombre: 'Prof. Carlos Ramírez',
      horario: 'Martes y Jueves 17:00-18:30',
      bio: 'Guitarrista clásico y de jazz con 18 años de experiencia. Graduado de Berklee College of Music. Ha tocado en festivales internacionales y cuenta con múltiples grabaciones.',
    },
    cupos_disponibles: 3,
    badges: ['Popular'],
    descripcion:
      'Libera tu talento de guitarra al siguiente nivel. Domina acordes avanzados, técnicas de fingerpicking, improvisación y diferentes estilos musicales. Ideal para quienes ya tienen bases sólidas y buscan perfeccionar su arte.',
    certificacion: true,
    materiales_incluidos: 3,
    aprendizajes: [
      'Mejorar precisión y velocidad en digitación',
      'Aplicar técnicas de rasgueo y fingerpicking',
      'Construir acordes con voicings modernos',
      'Improvisación básica sobre progresiones comunes',
      'Lectura rítmica y notación intermedia',
      'Montaje de repertorio pop/rock',
    ],
    programa: [
      { titulo: 'Técnica de mano derecha e izquierda', duracion: '2 semanas' },
      { titulo: 'Escalas pentatónicas y mayores', duracion: '2 semanas' },
      { titulo: 'Acordes extendidos y cejilla', duracion: '2 semanas' },
      { titulo: 'Rasgueos, arpegios y patrones', duracion: '2 semanas' },
      { titulo: 'Lectura rítmica aplicada', duracion: '2 semanas' },
      { titulo: 'Repertorio guiado y ensamble', duracion: '2 semanas' },
      { titulo: 'Proyecto final y grabación', duracion: '2 semanas' },
    ],
    requisitos: [
      'Conocer acordes abiertos básicos',
      'Capacidad de cambiar acordes con fluidez',
      'Práctica mínima de 30 minutos diarios',
      'Guitarra propia (acústica o eléctrica)',
      'Acceso a metrónomo o app equivalente',
    ],
    materiales: [
      'PDF de escalas y acordes',
      'Backing tracks en MP3',
      'Plantillas de práctica',
      'Playlist de referencia',
      'Guía de técnica y cuidado del instrumento',
    ],
    rating: 4.8,
    opiniones: 127,
  },
  {
    id: 'violin-avanzado',
    titulo: 'Violín Avanzado',
    categoria: 'Violín',
    nivel: 'avanzado',
    modalidad: 'presencial',
    precio: 680000,
    duracion_meses: 6,
    cupo_maximo: 6,
    imagen_url: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=1200&auto=format&fit=crop',
    profesor: {
      nombre: 'Prof. Ana Martínez',
      horario: 'Viernes 16:00-18:00',
      bio: 'Violinista concertista con formación en el Conservatorio Superior de Música de París. Primera violinista de la Orquesta Filarmónica Nacional. Especialista en repertorio barroco y romántico.',
    },
    cupos_disponibles: 0,
    badges: ['Avanzado'],
    descripcion: 'Perfecciona tu técnica de violín con repertorio de nivel concertista. Trabaja obras maestras del repertorio clásico, desarrolla virtuosismo técnico y prepárate para audiciones y presentaciones profesionales. Para violinistas con sólida formación previa.',
    certificacion: true,
    materiales_incluidos: 5,
    rating: 4.9,
    opiniones: 89,
    aprendizajes: [
      'Dominio de técnicas avanzadas: spiccato, ricochet, col legno',
      'Interpretación de conciertos y sonatas de nivel profesional',
      'Vibrato expresivo y control de dinámicas sutiles',
      'Cambios de posición hasta la 10ª posición',
      'Dobles cuerdas y acordes complejos',
      'Preparación para audiciones y concursos',
    ],
    programa: [
      { titulo: 'Técnicas de arco avanzadas', duracion: '5 semanas' },
      { titulo: 'Vibrato expresivo y dinámicas', duracion: '4 semanas' },
      { titulo: 'Posiciones altas y cambios rápidos', duracion: '6 semanas' },
      { titulo: 'Dobles cuerdas y acordes', duracion: '5 semanas' },
      { titulo: 'Repertorio barroco: Bach, Vivaldi', duracion: '6 semanas' },
      { titulo: 'Repertorio romántico: Brahms, Tchaikovsky', duracion: '6 semanas' },
      { titulo: 'Preparación de audición y recital final', duracion: '4 semanas' },
    ],
    requisitos: [
      'Mínimo 3 años de estudio formal de violín',
      'Dominio de posiciones 1ª a 5ª',
      'Conocimiento de al menos una obra de concierto',
      'Violín profesional o semi-profesional',
      'Arco de calidad profesional',
      'Dedicación de 2-3 horas diarias de práctica',
    ],
    materiales: [
      'Partituras de obras maestras (ediciones Urtext)',
      'Videos de masterclasses exclusivas',
      'Análisis técnico de cada obra',
      'Grabaciones de referencia con notas',
      'Metrónomo profesional digital',
      'Acceso a ensayos con pianista acompañante',
    ],
  },
  {
    id: 'bateria-principiantes',
    titulo: 'Batería para Principiantes',
    categoria: 'Batería',
    nivel: 'basico',
    modalidad: 'presencial',
    precio: 500000,
    duracion_meses: 3,
    cupo_maximo: 10,
    imagen_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    profesor: {
      nombre: 'Prof. Luis Hernández',
      horario: 'Sábados 10:00-12:00',
      bio: 'Baterista de sesión con amplia experiencia en rock, jazz y música latina. Ha trabajado con artistas reconocidos y cuenta con certificación de Modern Drummer Magazine. Apasionado por enseñar los fundamentos del ritmo.',
    },
    cupos_disponibles: 8,
    badges: ['Nuevo'],
    descripcion:
      'Inicia tu camino en el mundo de la percusión. Aprende los fundamentos del ritmo, técnica de baquetas, independencia de extremidades y tus primeros grooves. Sin experiencia previa necesaria. ¡Dale ritmo a tu vida!',
    certificacion: true,
    materiales_incluidos: 6,
    rating: 4.7,
    opiniones: 203,
    aprendizajes: [
      'Dominar técnicas básicas de grip y rebote',
      'Desarrollar independencia entre manos y pies',
      'Ejecutar ritmos básicos de rock, pop y blues',
      'Leer notación rítmica básica',
      'Tocar fills y transiciones simples',
      'Acompañar canciones populares',
    ],
    programa: [
      { titulo: 'Introducción a la batería y setup', duracion: '2 semanas' },
      { titulo: 'Técnica de baquetas y rudimentos básicos', duracion: '4 semanas' },
      { titulo: 'Ritmos básicos y coordinación', duracion: '4 semanas' },
      { titulo: 'Lectura rítmica elemental', duracion: '3 semanas' },
      { titulo: 'Fills y transiciones', duracion: '3 semanas' },
      { titulo: 'Repertorio: rock, pop y blues', duracion: '4 semanas' },
      { titulo: 'Jam session y presentación final', duracion: '2 semanas' },
    ],
    requisitos: [
      'No se requiere experiencia previa',
      'Baquetas 5A o 5B (proporcionamos para la primera clase)',
      'Opción de practicar en pad o batería electrónica en casa',
      'Audífonos de protección auditiva (incluidos)',
      'Dedicación de 20-30 minutos diarios',
    ],
    materiales: [
      'Par de baquetas profesionales (incluido)',
      'Pad de práctica portátil',
      'Libro de rudimentos con videos',
      '100+ backing tracks para practicar',
      'Metrónomo digital',
      'Protección auditiva de calidad',
    ],
  },
  {
    id: 'teoria-musical',
    titulo: 'Teoría Musical',
    categoria: 'Teoría',
    nivel: 'basico',
    modalidad: 'virtual',
    precio: 380000,
    duracion_meses: 2,
    cupo_maximo: 20,
    imagen_url: 'https://images.unsplash.com/photo-1520135017665-269e837b0c77?q=80&w=1200&auto=format&fit=crop',
    profesor: {
      nombre: 'Prof. Patricia López',
      horario: 'Lunes 19:00-20:30',
      bio: 'Licenciada en Música con énfasis en teoría y composición. Profesora universitaria con más de 12 años enseñando teoría musical. Experta en pedagogía musical moderna y métodos de enseñanza innovadores.',
    },
    cupos_disponibles: 15,
    descripcion:
      'Comprende el lenguaje universal de la música. Aprende a leer partituras, entender intervalos, escalas, acordes y armonía básica. Curso fundamental para cualquier músico que desee profundizar su conocimiento musical, sin importar su instrumento.',
    certificacion: true,
    materiales_incluidos: 6,
    rating: 4.9,
    opiniones: 342,
    aprendizajes: [
      'Leer y escribir notación musical en pentagrama',
      'Comprender intervalos y su clasificación',
      'Construir escalas mayores, menores y modales',
      'Formar y reconocer acordes triadas y cuatriadas',
      'Entender círculo de quintas y armaduras',
      'Analizar progresiones armónicas básicas',
    ],
    programa: [
      { titulo: 'Elementos básicos: pentagrama, claves, figuras', duracion: '2 semanas' },
      { titulo: 'Intervalos: melódicos y armónicos', duracion: '2 semanas' },
      { titulo: 'Escalas mayores y menores', duracion: '2 semanas' },
      { titulo: 'Círculo de quintas y armaduras', duracion: '1 semana' },
      { titulo: 'Acordes: triadas y cuatriadas', duracion: '2 semanas' },
      { titulo: 'Armonía funcional básica', duracion: '2 semanas' },
      { titulo: 'Análisis de canciones populares', duracion: '1 semana' },
      { titulo: 'Proyecto final: composición simple', duracion: '1 semana' },
    ],
    requisitos: [
      'No se requiere experiencia previa en música',
      'Interés por comprender cómo funciona la música',
      'Conexión a internet estable para clases virtuales',
      'Computadora o tablet para tomar notas',
      'Opcional: instrumento musical para aplicar conceptos',
    ],
    materiales: [
      'Libro digital de teoría musical ilustrado',
      'Software de entrenamiento auditivo',
      '200+ ejercicios interactivos',
      'Plantillas de pentagramas imprimibles',
      'Videos explicativos HD de cada tema',
      'Exámenes de práctica con corrección automática',
    ],
  },
  {
    id: 'saxofon-intermedio',
    titulo: 'Saxofón Intermedio',
    categoria: 'Saxofón',
    nivel: 'intermedio',
    modalidad: 'hibrido',
    precio: 600000,
    duracion_meses: 4,
    cupo_maximo: 8,
    imagen_url: 'https://images.unsplash.com/photo-1517495306984-6812f4e926d7?q=80&w=1200&auto=format&fit=crop',
    profesor: {
      nombre: 'Prof. Roberto Silva',
      horario: 'Miércoles 18:00-19:30',
      bio: 'Saxofonista de jazz y música contemporánea. Graduado del Manhattan School of Music. Ha tocado con big bands internacionales y cuenta con 3 álbumes como solista. Experto en improvisación y técnicas extendidas.',
    },
    cupos_disponibles: 4,
    descripcion:
      'Eleva tu técnica de saxofón y adéntrate en el mundo del jazz y la improvisación. Perfecciona tu sonido, domina escalas avanzadas, aprende a improvisar con swing y explora diferentes estilos musicales. Para saxofonistas con bases sólidas.',
    certificacion: true,
    materiales_incluidos: 6,
    rating: 4.8,
    opiniones: 156,
    aprendizajes: [
      'Desarrollar un sonido rico y expresivo',
      'Dominar escalas de jazz y modos',
      'Improvisar sobre cambios armónicos complejos',
      'Ejecutar técnicas avanzadas: slap, growl, altissimo',
      'Interpretar standards de jazz',
      'Tocar en ensemble y desarrollar musicalidad grupal',
    ],
    programa: [
      { titulo: 'Técnica de embocadura y respiración', duracion: '3 semanas' },
      { titulo: 'Escalas de jazz y patrones melódicos', duracion: '4 semanas' },
      { titulo: 'Improvisación: blues y ii-V-I', duracion: '5 semanas' },
      { titulo: 'Técnicas extendidas y efectos', duracion: '3 semanas' },
      { titulo: 'Repertorio de standards de jazz', duracion: '5 semanas' },
      { titulo: 'Transcripción y análisis de solos', duracion: '3 semanas' },
      { titulo: 'Ensemble y jam sessions', duracion: '4 semanas' },
    ],
    requisitos: [
      '1-2 años de experiencia con saxofón',
      'Conocimiento de escalas mayores y menores',
      'Saxofón alto o tenor en buen estado',
      'Cañas de calidad (2.5 o 3)',
      'Grabadora para auto-evaluación',
      'Dedicación de 40 minutos diarios',
    ],
    materiales: [
      'Libro de patrones de jazz (PDF)',
      '200+ backing tracks profesionales',
      'Transcripciones de solos famosos',
      'Videos de masterclasses con músicos invitados',
      'Software de slow-down para transcripciones',
      'Acceso a jam sessions mensuales',
    ],
  },
]
