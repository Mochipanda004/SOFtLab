export type Course = {
  id: string;
  title: string;
  instrument: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  modality: "Presencial" | "Virtual" | "Híbrido";
  instructor: string;
  scheduleText: string;
  price: number;
  capacity: number;
  available: boolean;
  imageUrl: string;
  tags?: string[];
  maxCapacity?: number;
  durationMonths?: number;
  certificationIncluded?: boolean;
  materialsIncluded?: number;
  description?: string;
  learning?: string[];
  program?: string[];
  requirements?: string[];
  teacherBio?: string;
};

export const featuredCourses: Course[] = [
  {
    id: "piano-basico",
    title: "Piano Básico",
    instrument: "Piano",
    level: "Básico",
    modality: "Presencial",
    instructor: "María González",
    scheduleText: "Lunes y Miércoles 18:00–19:30 • 3 meses",
    price: 450000,
    capacity: 5,
    available: true,
    imageUrl:
      "https://images.pexels.com/photos/164935/pexels-photo-164935.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Nuevo", "Popular"],
    maxCapacity: 12,
    durationMonths: 3,
    certificationIncluded: true,
    materialsIncluded: 4,
    description:
      "Aprende los fundamentos del piano desde cero. Este curso está diseñado para principiantes que desean iniciar su camino en la música. Desarrollarás técnica, lectura de partituras y aprenderás piezas clásicas y contemporáneas.",
    learning: [
      "Dominar la postura correcta y técnica básica",
      "Leer partituras en clave de sol y fa",
      "Ejecutar escalas mayores y menores",
      "Interpretar piezas de nivel básico",
      "Comprender teoría musical fundamental",
    ],
    program: [
      "Introducción al instrumento y postura",
      "Técnica de dedos y escalas básicas",
      "Lectura de partituras nivel 1",
      "Piezas clásicas para principiantes",
      "Teoría musical aplicada",
      "Recital final",
    ],
    requirements: [
      "No se requiere experiencia previa",
      "Acceso a un piano o teclado (mínimo 61 teclas)",
      "Dedicación de al menos 30 minutos diarios de práctica",
    ],
    teacherBio:
      "Pianista profesional con más de 15 años de experiencia en enseñanza. Graduada del Conservatorio Nacional de Música.",
  },
  {
    id: "guitarra-intermedia",
    title: "Guitarra Intermedia",
    instrument: "Guitarra",
    level: "Intermedio",
    modality: "Híbrido",
    instructor: "Carlos Ramírez",
    scheduleText: "Martes y Jueves 17:00–18:30 • 4 meses",
    price: 520000,
    capacity: 3,
    available: true,
    imageUrl:
      "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Popular"],
    maxCapacity: 10,
    durationMonths: 4,
    certificationIncluded: true,
    materialsIncluded: 6,
    description:
      "Lleva tu técnica de guitarra al siguiente nivel. Domina acordes avanzados, técnicas de fingerstyle, improvisación y diferentes estilos musicales. Ideal para quienes ya tienen bases sólidas y buscan perfeccionar su arte.",
    learning: [
      "Dominar técnicas avanzadas de fingerstyle y púa",
      "Improvisación en diferentes escalas y modos",
      "Interpretación de piezas clásicas y modernas complejas",
      "Armonía avanzada y construcción de acordes",
      "Desarrollar tu propio estilo musical",
      "Grabación básica y producción de demos",
    ],
    program: [
      "Técnicas avanzadas de digitación — Duración: 3 semanas",
      "Escalas pentatónicas y modos griegos — Duración: 4 semanas",
      "Armonía moderna y sustituciones — Duración: 3 semanas",
      "Fingerstyle avanzado — Duración: 4 semanas",
      "Improvisación en diversos estilos — Duración: 4 semanas",
      "Repertorio clásico y contemporáneo — Duración: 3 semanas",
      "Proyecto final y recital — Duración: 2 semanas",
    ],
    requirements: [
      "1-2 años de experiencia tocando guitarra",
      "Conocimiento de acordes básicos y escalas mayores/menores",
      "Guitarra acústica o eléctrica en buen estado",
      "Afinador, púas y capo",
      "Dedicación de al menos 45 minutos diarios",
    ],
    teacherBio:
      "Guitarrista clásico y de jazz con 18 años de experiencia. Graduado de Berklee College of Music. Ha tocado en festivales internacionales y cuenta con múltiples grabaciones.",
  },
  {
    id: "violin-avanzado",
    title: "Violín Avanzado",
    instrument: "Violín",
    level: "Avanzado",
    modality: "Presencial",
    instructor: "Ana Martínez",
    scheduleText: "Viernes 16:00–18:00 • 6 meses",
    price: 680000,
    capacity: 0,
    available: false,
    imageUrl:
      "https://images.pexels.com/photos/210823/pexels-photo-210823.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Popular"],
    maxCapacity: 12,
    durationMonths: 6,
    certificationIncluded: true,
    materialsIncluded: 6,
    description:
      "Perfecciona tu técnica de violín con repertorio de nivel concertista. Trabaja obras maestras del repertorio clásico, desarrolla virtuosismo técnico y prepárate para audiciones y presentaciones profesionales. Para violinistas con sólida formación previa.",
    learning: [
      "Dominio de técnicas avanzadas: spiccato, ricochet, col legno",
      "Interpretación de conciertos y sonatas de nivel profesional",
      "Vibrato expresivo y control de dinámicas sutiles",
      "Cambios de posición hasta la 10ª posición",
      "Dobles cuerdas y acordes complejos",
      "Preparación para audiciones y concursos",
    ],
    program: [
      "Técnicas de arco avanzadas — Duración: 5 semanas",
      "Vibrato expresivo y dinámicas — Duración: 4 semanas",
      "Posiciones altas y cambios rápidos — Duración: 6 semanas",
      "Dobles cuerdas y acordes — Duración: 5 semanas",
      "Repertorio barroco: Bach, Vivaldi — Duración: 6 semanas",
      "Repertorio romántico: Brahms, Tchaikovsky — Duración: 6 semanas",
      "Preparación de audición y recital final — Duración: 4 semanas",
    ],
    requirements: [
      "Mínimo 3 años de estudio formal de violín",
      "Dominio de posiciones 1ª a 5ª",
      "Conocimiento de al menos una obra de concierto",
      "Violín profesional o semi-profesional",
      "Arco de calidad profesional",
      "Dedicación de 2-3 horas diarias de práctica",
    ],
    teacherBio:
      "Violinista concertista con formación en el Conservatorio Superior de Música de París. Primera violinista de la Orquesta Filarmónica Nacional. Especialista en repertorio barroco y romántico.",
  },
  {
    id: "bateria-principiantes",
    title: "Batería para Principiantes",
    instrument: "Batería",
    level: "Básico",
    modality: "Presencial",
    instructor: "Luis Hernández",
    scheduleText: "Sábados 10:00–12:00 • 3 meses",
    price: 500000,
    capacity: 8,
    available: true,
    imageUrl:
      "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Nuevo"],
    maxCapacity: 10,
    durationMonths: 3,
    certificationIncluded: true,
    materialsIncluded: 6,
    description:
      "Inicia tu camino en el mundo de la percusión. Aprende los fundamentos del ritmo, técnica de baquetas, independencia de extremidades y tus primeros grooves. Sin experiencia previa necesaria. ¡Dale ritmo a tu vida!",
    learning: [
      "Dominar técnicas básicas de grip y rebote",
      "Desarrollar independencia entre manos y pies",
      "Ejecutar ritmos básicos de rock, pop y blues",
      "Leer notación rítmica básica",
      "Tocar fills y transiciones simples",
      "Acompañar canciones populares",
    ],
    program: [
      "Introducción a la batería y setup — Duración: 2 semanas",
      "Técnica de baquetas y rudimentos básicos — Duración: 4 semanas",
      "Ritmos básicos y coordinación — Duración: 4 semanas",
      "Lectura rítmica elemental — Duración: 3 semanas",
      "Fills y transiciones — Duración: 3 semanas",
      "Repertorio: rock, pop y blues — Duración: 4 semanas",
      "Jam session y presentación final — Duración: 2 semanas",
    ],
    requirements: [
      "No se requiere experiencia previa",
      "Baquetas 5A o 5B (proporcionamos para la primera clase)",
      "Opción de practicar en pad o batería electrónica en casa",
      "Audífonos de protección auditiva (incluidos)",
      "Dedicación de 20-30 minutos diarios",
    ],
    teacherBio:
      "Baterista de sesión con amplia experiencia en rock, jazz y música latina. Ha trabajado con artistas reconocidos y cuenta con certificación de Modern Drummer Magazine. Apasionado por enseñar los fundamentos del ritmo.",
  },
  {
    id: "teoria-musical",
    title: "Teoría Musical",
    instrument: "Teoría",
    level: "Básico",
    modality: "Virtual",
    instructor: "Patricia López",
    scheduleText: "Lunes 19:00–20:30 • 2 meses",
    price: 380000,
    capacity: 15,
    available: true,
    imageUrl:
      "https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1200",
    maxCapacity: 20,
    durationMonths: 2,
    certificationIncluded: true,
    materialsIncluded: 6,
    description:
      "Comprende el lenguaje universal de la música. Aprende a leer partituras, entender intervalos, escalas, acordes y armonía básica. Curso fundamental para cualquier músico que desee profundizar su conocimiento musical, sin importar su instrumento.",
    learning: [
      "Leer y escribir notación musical en pentagrama",
      "Comprender intervalos y su clasificación",
      "Construir escalas mayores, menores y modales",
      "Formar y reconocer acordes triadas y cuatriadas",
      "Entender círculo de quintas y armaduras",
      "Analizar progresiones armónicas básicas",
    ],
    program: [
      "Elementos básicos: pentagrama, claves, figuras — Duración: 2 semanas",
      "Intervalos: melódicos y armónicos — Duración: 2 semanas",
      "Escalas mayores y menores — Duración: 2 semanas",
      "Círculo de quintas y armaduras — Duración: 1 semana",
      "Acordes: triadas y cuatriadas — Duración: 2 semanas",
      "Armonía funcional básica — Duración: 2 semanas",
      "Análisis de canciones populares — Duración: 1 semana",
      "Proyecto final: composición simple — Duración: 1 semana",
    ],
    requirements: [
      "No se requiere experiencia previa en música",
      "Interés por comprender cómo funciona la música",
      "Conexión a internet estable para clases virtuales",
      "Computadora o tablet para tomar notas",
      "Opcional: instrumento musical para aplicar conceptos",
    ],
    teacherBio:
      "Licenciada en Música con énfasis en teoría y composición. Profesora universitaria con más de 12 años enseñando teoría musical. Experta en pedagogía musical moderna y métodos de enseñanza innovadores.",
  },
  {
    id: "saxofon-intermedio",
    title: "Saxofón Intermedio",
    instrument: "Saxofón",
    level: "Intermedio",
    modality: "Híbrido",
    instructor: "Roberto Silva",
    scheduleText: "Miércoles 18:00–19:30 • 4 meses",
    price: 600000,
    capacity: 4,
    available: true,
    imageUrl:
      "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1200",
    maxCapacity: 8,
    durationMonths: 4,
    certificationIncluded: true,
    materialsIncluded: 6,
    description:
      "Eleva tu técnica de saxofón y adéntrate en el mundo del jazz y la improvisación. Perfecciona tu sonido, domina escalas avanzadas, aprende a improvisar con swing y explora diferentes estilos musicales. Para saxofonistas con bases sólidas.",
    learning: [
      "Desarrollar un sonido rico y expresivo",
      "Dominar escalas de jazz y modos",
      "Improvisar sobre cambios armónicos complejos",
      "Ejecutar técnicas avanzadas: slap, growl, altissimo",
      "Interpretar standards de jazz",
      "Tocar en ensemble y desarrollar musicalidad grupal",
    ],
    program: [
      "Técnica de embocadura y respiración — Duración: 3 semanas",
      "Escalas de jazz y patrones melódicos — Duración: 4 semanas",
      "Improvisación: blues y ii-V-I — Duración: 5 semanas",
      "Técnicas extendidas y efectos — Duración: 3 semanas",
      "Repertorio de standards de jazz — Duración: 5 semanas",
      "Transcripción y análisis de solos — Duración: 3 semanas",
      "Ensemble y jam sessions — Duración: 4 semanas",
    ],
    requirements: [
      "1-2 años de experiencia con saxofón",
      "Conocimiento de escalas mayores y menores",
      "Saxofón alto o tenor en buen estado",
      "Cañas de calidad (2.5 o 3)",
      "Grabadora para auto-evaluación",
      "Dedicación de 40 minutos diarios",
    ],
    teacherBio:
      "Saxofonista de jazz y música contemporánea. Graduado del Manhattan School of Music. Ha tocado con big bands internacionales y cuenta con 3 álbumes como solista. Experto en improvisación y técnicas extendidas.",
  },
];
