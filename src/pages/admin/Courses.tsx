import React, { useMemo, useState } from "react";
import { BookOpen, Plus, Search, Filter } from "lucide-react";
import { AdminStore, Course, CourseLevel, uid } from "@/lib/adminStore";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>(() => AdminStore.getCourses());
  const teachers = AdminStore.getTeachers();
  const instruments = AdminStore.getInstruments();
  const resources = AdminStore.getRooms().map((r) => r.name).concat(AdminStore.getInstruments().map((i) => i.name));
  const [form, setForm] = useState<{ name: string; level: CourseLevel; requisitos: string; objetivos: string; duracionMeses: number; instrumento: string; recursosNecesarios: string; teacherId?: string; maxCapacity: number }>({ name: "", level: "Básico", requisitos: "", objetivos: "", duracionMeses: 3, instrumento: instruments[0]?.name || "", recursosNecesarios: "", teacherId: teachers[0]?.id, maxCapacity: 12 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const saveCourses = (list: Course[]) => { setCourses(list); AdminStore.saveCourses(list); };

  const createCourse = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.instrumento.trim()) e.inst = "Instrumento requerido";
    setErrors(e);
    if (Object.keys(e).length) return;
    const requisitos = form.requisitos ? form.requisitos.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const objetivos = form.objetivos ? form.objetivos.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const recursosNecesarios = form.recursosNecesarios ? form.recursosNecesarios.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const c: Course = { id: uid("crs"), name: form.name.trim(), level: form.level, requisitos, objetivos, duracionMeses: form.duracionMeses, instrumento: form.instrumento.trim(), recursosNecesarios, teacherId: form.teacherId, maxCapacity: form.maxCapacity, enrolledStudentIds: [] };
    saveCourses([c, ...courses]);
    setForm({ name: "", level: form.level, requisitos: "", objetivos: "", duracionMeses: 3, instrumento: instruments[0]?.name || "", recursosNecesarios: "", teacherId: teachers[0]?.id, maxCapacity: 12 });
  };
  const deleteCourse = (id: string) => { if (!window.confirm("¿Eliminar curso?")) return; saveCourses(courses.filter((c) => c.id !== id)); };
  const enrolledCount = (c: Course) => c.enrolledStudentIds.length;
  const teacherName = (id?: string) => teachers.find((t) => t.id === id)?.name || "Sin asignar";
  const levelColor = (level: string) => level === "Básico" ? "bg-blue-100 text-blue-800" : level === "Intermedio" ? "bg-yellow-100 text-yellow-800" : "bg-purple-100 text-purple-800";

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Básico":
        return "bg-blue-100 text-blue-800";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "Avanzado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Cursos
            </h1>
            <p className="text-gray-600 mt-1">
              Administra los cursos de la academia
            </p>
          </div>
          <div />
        </div>
      </div>

      {/* Crear curso */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
            <label className="text-sm text-gray-700">Nivel</label>
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as CourseLevel })}>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Duración (meses)" type="number" min={1} value={form.duracionMeses} onChange={(e) => setForm({ ...form, duracionMeses: Number(e.target.value) })} />
          </div>
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Instrumento" list="inst-list" value={form.instrumento} onChange={(e) => setForm({ ...form, instrumento: e.target.value })} />
            {errors.inst && <span className="text-xs text-red-600">{errors.inst}</span>}
            <datalist id="inst-list">{instruments.map((i) => (<option key={i.id} value={i.name} />))}</datalist>
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Recursos necesarios (coma)" value={form.recursosNecesarios} onChange={(e) => setForm({ ...form, recursosNecesarios: e.target.value })} />
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}>
              {teachers.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
            </select>
          </div>
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Requisitos (coma)" value={form.requisitos} onChange={(e) => setForm({ ...form, requisitos: e.target.value })} />
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Objetivos (coma)" value={form.objetivos} onChange={(e) => setForm({ ...form, objetivos: e.target.value })} />
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Cupos máximos" type="number" min={1} value={form.maxCapacity} onChange={(e) => setForm({ ...form, maxCapacity: Number(e.target.value) })} />
            <button onClick={createCourse} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Guardar curso</button>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiantes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {course.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColor(course.level)}`}>{course.level}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacherName(course.teacherId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {enrolledCount(course)}/{course.maxCapacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Activo</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-900" onClick={() => deleteCourse(course.id)}>
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
