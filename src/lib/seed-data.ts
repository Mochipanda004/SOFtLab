// Seed data for Academia Melody Labs
export const USUARIOS_SEED = [
  {
    email: 'admin@melodylabs.com',
    password: 'Admin123!',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    telefono: '3001234567',
    direccion: 'Calle 123 #45-67, Pereira',
    fecha_nacimiento: '1980-01-15',
    rol: 'admin'
  },
  {
    email: 'profesor.guitarra@melodylabs.com',
    password: 'Profesor123!',
    nombre: 'María José',
    apellido: 'González',
    telefono: '3002345678',
    direccion: 'Carrera 56 #12-34, Pereira',
    fecha_nacimiento: '1985-03-22',
    rol: 'profesor'
  },
  {
    email: 'estudiante1@ejemplo.com',
    password: 'Estudiante123!',
    nombre: 'Ana Sofía',
    apellido: 'López',
    telefono: '3004567890',
    direccion: 'Calle 90 #45-67, Pereira',
    fecha_nacimiento: '2005-11-12',
    rol: 'alumno'
  }
]

export const CURSOS_SEED = [
  {
    titulo: 'Guitarra para Principiantes',
    descripcion: 'Aprende guitarra desde cero con técnicas básicas, acordes fundamentales y canciones populares.',
    instrumento: 'Guitarra',
    nivel: 'Principiante',
    duracion_semanas: 12,
    precio: 180000,
    cupo_maximo: 15,
    fecha_inicio: '2024-01-15',
    horario: 'Lunes y Miércoles 4:00 PM - 5:30 PM',
    profesor_email: 'profesor.guitarra@melodylabs.com',
    imagen_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=acoustic%20guitar%20on%20music%20stand%20with%20sheet%20music%2C%20warm%20lighting%2C%20educational%20setting&image_size=landscape_4_3',
    activo: true
  },
  {
    titulo: 'Piano Clásico Intermedio',
    descripcion: 'Perfecciona tu técnica pianística con obras clásicas y desarrollo de lectura a primera vista.',
    instrumento: 'Piano',
    nivel: 'Intermedio',
    duracion_semanas: 16,
    precio: 250000,
    cupo_maximo: 10,
    fecha_inicio: '2024-01-20',
    horario: 'Martes y Jueves 6:00 PM - 7:30 PM',
    profesor_email: 'profesor.piano@melodylabs.com',
    imagen_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=grand%20piano%20with%20sheet%20music%2C%20classical%20music%20setting%2C%20elegant%20lighting&image_size=landscape_4_3',
    activo: true
  }
]

export const PREGUNTAS_FRECUENTES_SEED = [
  {
    pregunta: '¿Necesito tener mi propio instrumento para tomar clases?',
    respuesta: 'No es obligatorio. Para las primeras clases puedes usar los instrumentos de la academia.',
    categoria: 'Instrumentos',
    activa: true
  },
  {
    pregunta: '¿Cuál es la edad mínima para inscribirse?',
    respuesta: 'Aceptamos estudiantes desde los 6 años de edad.',
    categoria: 'Inscripción',
    activa: true
  },
  {
    pregunta: '¿Puedo tomar una clase de prueba antes de inscribirme?',
    respuesta: '¡Claro! Ofrecemos una clase de prueba gratuita.',
    categoria: 'Inscripción',
    activa: true
  },
  {
    pregunta: '¿Qué métodos de pago aceptan?',
    respuesta: 'Aceptamos pagos con tarjeta de crédito, débito y transferencia bancaria PSE.',
    categoria: 'Pagos',
    activa: true
  }
]