import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { AdminStore, Student, Course, uid } from "@/lib/adminStore";

export default function Students() {
  const [students, setStudents] = useState<Student[]>(() => AdminStore.getStudents());
  const courses = AdminStore.getCourses();
  const teachers = AdminStore.getTeachers();
  const [form, setForm] = useState<{ name: string; email: string }>({ name: "", email: "" });
  const [assign, setAssign] = useState<{ studentId?: string; courseId?: string }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const saveStudents = (list: Student[]) => { setStudents(list); AdminStore.saveStudents(list); };
  const saveCourses = (list: Course[]) => AdminStore.saveCourses(list);
  const createStudent = () => { const e: Record<string, string> = {}; if (!form.name.trim()) e.name = "Nombre requerido"; if (!form.email.trim()) e.email = "Email requerido"; setErrors(e); if (Object.keys(e).length) return; const s: Student = { id: uid("std"), name: form.name.trim(), email: form.email.trim() }; saveStudents([s, ...students]); setForm({ name: "", email: "" }); };
  const assignCourse = () => { if (!assign.studentId || !assign.courseId) { setErrors({ assign: "Selecciona estudiante y curso" }); return; } const course = courses.find((c) => c.id === assign.courseId)!; if (course.enrolledStudentIds.includes(assign.studentId)) return; const nextC = courses.map((c) => c.id === course.id ? { ...c, enrolledStudentIds: [assign.studentId!, ...c.enrolledStudentIds] } : c); saveCourses(nextC); };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Al día":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Vencido":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // KPI Cards
  const totalStudents = students.length;
  const studentsUpToDate = 0;
  const studentsPending = 0;
  const averageProgress = 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Estudiantes
            </h1>
            <p className="text-gray-600 mt-1">
              Administra los estudiantes y su progreso académico
            </p>
          </div>
          <div />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Estudiantes
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalStudents}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pagos al Día</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {studentsUpToDate}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pagos Pendientes
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {studentsPending}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Progreso Promedio
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {averageProgress}%
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Registrar y asignar */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <button onClick={createStudent} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Guardar estudiante</button>
            {(errors.name || errors.email) && <span className="text-xs text-red-600">Completa nombre y email</span>}
          </div>
          <div className="space-y-3">
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={assign.studentId || ""} onChange={(e) => setAssign({ ...assign, studentId: e.target.value || undefined })}>
              <option value="">Seleccionar estudiante</option>
              {students.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
            </select>
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={assign.courseId || ""} onChange={(e) => setAssign({ ...assign, courseId: e.target.value || undefined })}>
              <option value="">Seleccionar curso</option>
              {courses.map((c) => (<option key={c.id} value={c.id}>{c.name} • {c.level}</option>))}
            </select>
            <button onClick={assignCourse} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Asignar a curso</button>
            {errors.assign && <span className="text-xs text-red-600">{errors.assign}</span>}
          </div>
          <div className="space-y-3">
            <select className="rounded-lg border px-3 py-2 text-sm w-full">
              {teachers.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
            </select>
            <div className="text-xs text-gray-600">La asignación de profesor se gestiona desde Cursos seleccionando “Profesor”.</div>
          </div>
        </div>
      </div>

      {/* Estudiantes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cursos Inscritos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado de Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Inscripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {courses.filter((c) => c.enrolledStudentIds.includes(student.id)).map((c) => c.name).join(", ") || "Sin cursos"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-900">0%</span></div><ProgressBar progress={0} /></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">N/A</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    —
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-900" onClick={() => { if (!window.confirm("¿Eliminar estudiante?")) return; saveStudents(students.filter((s) => s.id !== student.id)); }}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
