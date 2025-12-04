import React, { useState } from "react";
import { Users, Plus, Search } from "lucide-react";
import { AdminStore, Teacher, ScheduleSlot, uid, overlap } from "@/lib/adminStore";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(() => AdminStore.getTeachers());
  const [form, setForm] = useState<{ name: string; email: string; phone: string; especializacion: string; instrumentos: string }>({ name: "", email: "", phone: "", especializacion: "", instrumentos: "Piano" });
  const [slot, setSlot] = useState<{ teacherId?: string; dayOfWeek: number; startTime: string; durationMinutes: number; type: "clase" | "ensayo" }>({ teacherId: undefined, dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, type: "clase" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const saveTeachers = (list: Teacher[]) => { setTeachers(list); AdminStore.saveTeachers(list); };
  const createTeacher = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.email.trim()) e.email = "Email requerido";
    setErrors(e);
    if (Object.keys(e).length) return;
    const instrumentos = form.instrumentos.split(",").map((s) => s.trim()).filter(Boolean);
    const t: Teacher = { id: uid("tch"), name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), especializacion: form.especializacion.trim(), instrumentos, disponibilidad: [] };
    saveTeachers([t, ...teachers]);
    setForm({ name: "", email: "", phone: "", especializacion: "", instrumentos: "Piano" });
  };
  const addAvailability = () => {
    if (!slot.teacherId) { setErrors({ slot: "Selecciona profesor" }); return; }
    const teacher = teachers.find((t) => t.id === slot.teacherId)!;
    const s: ScheduleSlot = { id: uid("avl"), dayOfWeek: slot.dayOfWeek, startTime: slot.startTime, durationMinutes: slot.durationMinutes, type: slot.type };
    if (teacher.disponibilidad.some((x) => overlap(x, s))) { setErrors({ slot: "Conflicto en disponibilidad" }); return; }
    teacher.disponibilidad = [s, ...teacher.disponibilidad];
    saveTeachers(teachers.map((t) => t.id === teacher.id ? teacher : t));
    setSlot({ teacherId: slot.teacherId, dayOfWeek: slot.dayOfWeek, startTime: "16:00", durationMinutes: 60, type: slot.type });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Profesores
            </h1>
            <p className="text-gray-600 mt-1">
              Administra los profesores de la academia
            </p>
          </div>
          <div />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar profesores..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Registro y disponibilidad */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-900">Registrar profesor</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
          </div>
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Especialización" value={form.especializacion} onChange={(e) => setForm({ ...form, especializacion: e.target.value })} />
          </div>
          <div className="space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Instrumentos (coma)" value={form.instrumentos} onChange={(e) => setForm({ ...form, instrumentos: e.target.value })} />
            <button onClick={createTeacher} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Guardar profesor</button>
          </div>
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-medium text-gray-900">Disponibilidad</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={slot.teacherId || ""} onChange={(e) => setSlot({ ...slot, teacherId: e.target.value || undefined })}>
              <option value="">Seleccionar profesor</option>
              {teachers.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
            </select>
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={slot.dayOfWeek} onChange={(e) => setSlot({ ...slot, dayOfWeek: Number(e.target.value) })}>
              {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].map((d,i) => (<option key={d} value={i}>{d}</option>))}
            </select>
            <div className="space-y-3">
              <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Hora" value={slot.startTime} onChange={(e) => setSlot({ ...slot, startTime: e.target.value })} />
              <input type="number" min={15} className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Duración (min)" value={slot.durationMinutes} onChange={(e) => setSlot({ ...slot, durationMinutes: Number(e.target.value) })} />
              <button onClick={addAvailability} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Agregar disponibilidad</button>
              {errors.slot && <span className="text-xs text-red-600">{errors.slot}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instrumento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cursos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Estudiantes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {teacher.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.instrumentos.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.disponibilidad.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.especializacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-900" onClick={() => { if (!window.confirm("¿Eliminar profesor?")) return; saveTeachers(teachers.filter((t) => t.id !== teacher.id)); }}>
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
