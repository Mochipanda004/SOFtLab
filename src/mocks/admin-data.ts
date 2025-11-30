import {
  DashboardStats,
  Course,
  Teacher,
  Student,
  Resource,
  Alert,
} from "../types/admin";

export const mockDashboardStats: DashboardStats = {
  totalStudents: 127,
  activeCourses: 18,
  monthlyRevenue: 45.2,
  occupancyRate: 78,
  studentGrowth: 12,
  courseGrowth: 0,
  revenueGrowth: 6.5,
};

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Piano Básico",
    level: "Básico",
    teacher: "María González",
    enrolledStudents: 12,
    maxCapacity: 12,
    status: "Lleno",
  },
  {
    id: "2",
    name: "Guitarra Intermedia",
    level: "Intermedio",
    teacher: "Carlos Ramírez",
    enrolledStudents: 7,
    maxCapacity: 10,
    status: "Activo",
  },
  {
    id: "3",
    name: "Violín Avanzado",
    level: "Avanzado",
    teacher: "Ana Martínez",
    enrolledStudents: 5,
    maxCapacity: 8,
    status: "Activo",
  },
  {
    id: "4",
    name: "Batería Básica",
    level: "Básico",
    teacher: "Juan Pérez",
    enrolledStudents: 8,
    maxCapacity: 10,
    status: "Activo",
  },
  {
    id: "5",
    name: "Canto Popular",
    level: "Intermedio",
    teacher: "Lucía Fernández",
    enrolledStudents: 10,
    maxCapacity: 12,
    status: "Activo",
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "María González",
    instrument: "Piano",
    coursesCount: 2,
    totalStudents: 20,
  },
  {
    id: "2",
    name: "Carlos Ramírez",
    instrument: "Guitarra",
    coursesCount: 1,
    totalStudents: 7,
  },
  {
    id: "3",
    name: "Ana Martínez",
    instrument: "Violín",
    coursesCount: 1,
    totalStudents: 5,
  },
  {
    id: "4",
    name: "Juan Pérez",
    instrument: "Batería",
    coursesCount: 1,
    totalStudents: 8,
  },
  {
    id: "5",
    name: "Lucía Fernández",
    instrument: "Canto",
    coursesCount: 1,
    totalStudents: 10,
  },
];

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Laura Martínez",
    email: "laura.martinez@email.com",
    enrolledCourses: ["Piano Básico", "Teoría Musical"],
    progress: 75,
    paymentStatus: "Al día",
    enrollmentDate: "14 ene 2024",
  },
  {
    id: "2",
    name: "Diego Rodríguez",
    email: "diego.rodriguez@email.com",
    enrolledCourses: ["Guitarra Intermedia"],
    progress: 60,
    paymentStatus: "Al día",
    enrollmentDate: "20 feb 2024",
  },
  {
    id: "3",
    name: "Sofía López",
    email: "sofia.lopez@email.com",
    enrolledCourses: ["Violín Avanzado"],
    progress: 90,
    paymentStatus: "Pendiente",
    enrollmentDate: "15 mar 2024",
  },
  {
    id: "4",
    name: "Mateo García",
    email: "mateo.garcia@email.com",
    enrolledCourses: ["Batería Básica"],
    progress: 45,
    paymentStatus: "Al día",
    enrollmentDate: "10 ene 2024",
  },
  {
    id: "5",
    name: "Valentina Sánchez",
    email: "valentina.sanchez@email.com",
    enrolledCourses: ["Canto Popular"],
    progress: 80,
    paymentStatus: "Vencido",
    enrollmentDate: "5 abr 2024",
  },
];

export const mockResources: Resource[] = [
  {
    id: "1",
    type: "Sala",
    name: "Sala de Piano 1",
    status: "Ocupado",
    occupiedBy: "María González",
  },
  {
    id: "2",
    type: "Sala",
    name: "Sala de Guitarra",
    status: "Disponible",
    occupiedBy: null,
  },
  {
    id: "3",
    type: "Instrumento",
    name: "Piano de Cola Yamaha",
    status: "Ocupado",
    occupiedBy: "María González",
  },
  {
    id: "4",
    type: "Instrumento",
    name: "Guitarra Clásica",
    status: "Disponible",
    occupiedBy: null,
  },
  {
    id: "5",
    type: "Sala",
    name: "Sala de Ensayo A",
    status: "Disponible",
    occupiedBy: null,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    message: "2 cursos alcanzaron su capacidad máxima",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "info",
    message: "5 nuevas solicitudes de inscripción pendientes",
    timestamp: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    type: "warning",
    message: "Pago vencido de Valentina Sánchez",
    timestamp: "2024-01-15T08:45:00Z",
  },
  {
    id: "4",
    type: "info",
    message: "Nuevo profesor Juan Pérez registrado",
    timestamp: "2024-01-14T16:20:00Z",
  },
];
