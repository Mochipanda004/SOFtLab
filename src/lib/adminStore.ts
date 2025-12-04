export type Instrument = { id: string; name: string; type: string; status: "Disponible" | "Ocupado"; disponible: boolean };
export type Room = { id: string; name: string; capacidad: number; equipamiento: string[]; horarios: ScheduleSlot[] };
export type ScheduleSlot = { id: string; dayOfWeek: number; startTime: string; durationMinutes: number; type: "clase" | "ensayo" };

export type Teacher = { id: string; name: string; email: string; phone: string; especializacion: string; instrumentos: string[]; disponibilidad: ScheduleSlot[] };
export type CourseLevel = "Básico" | "Intermedio" | "Avanzado";
export type Course = { id: string; name: string; level: CourseLevel; requisitos: string[]; objetivos: string[]; duracionMeses: number; instrumento: string; recursosNecesarios: string[]; teacherId?: string; maxCapacity: number; enrolledStudentIds: string[] };
export type Student = { id: string; name: string; email: string };

const K = {
  instruments: "admin_instruments",
  rooms: "admin_rooms",
  schedules: "admin_schedules",
  teachers: "admin_teachers",
  courses: "admin_courses",
  students: "admin_students",
};

function read<T>(k: string, f: T): T { try { const raw = localStorage.getItem(k); return raw ? (JSON.parse(raw) as T) : f; } catch { return f; } }
function write<T>(k: string, v: T) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
export function uid(prefix = "id"): string { return `${prefix}_${Math.random().toString(36).slice(2, 10)}`; }

export const AdminStore = {
  getInstruments(): Instrument[] { return read(K.instruments, []); },
  saveInstruments(items: Instrument[]) { write(K.instruments, items); },
  getRooms(): Room[] { return read(K.rooms, []); },
  saveRooms(items: Room[]) { write(K.rooms, items); },
  getSchedules(): ScheduleSlot[] { return read(K.schedules, []); },
  saveSchedules(items: ScheduleSlot[]) { write(K.schedules, items); },
  getTeachers(): Teacher[] { return read(K.teachers, []); },
  saveTeachers(items: Teacher[]) { write(K.teachers, items); },
  getCourses(): Course[] { return read(K.courses, []); },
  saveCourses(items: Course[]) { write(K.courses, items); },
  getStudents(): Student[] { return read(K.students, []); },
  saveStudents(items: Student[]) { write(K.students, items); },
};

export function timeToMin(t: string) { const [hh, mm] = t.split(":").map(Number); return hh * 60 + mm; }
export function overlap(a: ScheduleSlot, b: ScheduleSlot) {
  const aStart = timeToMin(a.startTime), aEnd = aStart + a.durationMinutes;
  const bStart = timeToMin(b.startTime), bEnd = bStart + b.durationMinutes;
  return a.dayOfWeek === b.dayOfWeek && Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
}
