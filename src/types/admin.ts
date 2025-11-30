export interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  monthlyRevenue: number;
  occupancyRate: number;
  studentGrowth: number;
  courseGrowth: number;
  revenueGrowth: number;
}

export interface Course {
  id: string;
  name: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  teacher: string;
  enrolledStudents: number;
  maxCapacity: number;
  status: "Lleno" | "Activo" | "Inactivo";
}

export interface Teacher {
  id: string;
  name: string;
  instrument: string;
  coursesCount: number;
  totalStudents: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  progress: number;
  paymentStatus: "Al día" | "Pendiente" | "Vencido";
  enrollmentDate: string;
}

export interface Resource {
  id: string;
  type: "Sala" | "Instrumento";
  name: string;
  status: "Ocupado" | "Disponible";
  occupiedBy: string | null;
}

export interface Alert {
  id: string;
  type: "warning" | "info";
  message: string;
  timestamp: string;
}
