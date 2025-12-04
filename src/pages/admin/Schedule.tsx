import { useState } from "react";
import { Activity, TeacherStore, uid } from "@/lib/teacherStore";

export default function AdminSchedule() {
  const [items, setItems] = useState<Activity[]>(() => TeacherStore.getAdminSchedule());
  const [form, setForm] = useState<{ title: string; dayOfWeek: number; startTime: string; durationMinutes: number; location: string; description: string }>({ title: "", dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, location: "Sala 101", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]; 

  const save = (list: Activity[]) => { setItems(list); TeacherStore.saveAdminSchedule(list); };

  const validate = () => { const e: Record<string, string> = {}; if (!form.title.trim()) e.title = "Título requerido"; if (!form.startTime) e.startTime = "Hora requerida"; if (!form.durationMinutes || form.durationMinutes <= 0) e.durationMinutes = "Duración inválida"; if (form.dayOfWeek < 0 || form.dayOfWeek > 6) e.dayOfWeek = "Día inválido"; return e; };

  const timeToMin = (t: string) => { const [hh, mm] = t.split(":").map(Number); return hh * 60 + mm; };
  const hasConflict = (a: Activity) => {
    return items.some((b) => b.dayOfWeek === a.dayOfWeek && Math.max(timeToMin(a.startTime), timeToMin(b.startTime)) < Math.min(timeToMin(a.startTime) + a.durationMinutes, timeToMin(b.startTime) + b.durationMinutes));
  };

  const create = () => { const e = validate(); setErrors(e); if (Object.keys(e).length) return; const a: Activity = { id: uid("adm"), type: "clase", title: form.title.trim(), dayOfWeek: form.dayOfWeek, startTime: form.startTime, durationMinutes: form.durationMinutes, location: form.location.trim(), description: form.description.trim(), fixed: true }; if (hasConflict(a)) { setErrors({ startTime: "Conflicto con otra clase" }); return; } save([a, ...items]); setForm({ title: "", dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, location: "Sala 101", description: "" }); };
  const remove = (id: string) => save(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Horario base (Admin)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Título</label>
            <input className="rounded-md border px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
            <label className="text-sm text-gray-700">Día</label>
            <select className="rounded-md border px-3 py-2 text-sm" value={form.dayOfWeek} onChange={(e) => setForm({ ...form, dayOfWeek: Number(e.target.value) })}>
              {days.map((d, i) => (<option key={d} value={i}>{d}</option>))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Hora inicio</label>
            <input className="rounded-md border px-3 py-2 text-sm" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            {errors.startTime && <span className="text-xs text-red-600">{errors.startTime}</span>}
            <label className="text-sm text-gray-700">Duración (min)</label>
            <input type="number" min={15} className="rounded-md border px-3 py-2 text-sm" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} />
            {errors.durationMinutes && <span className="text-xs text-red-600">{errors.durationMinutes}</span>}
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Lugar</label>
            <input className="rounded-md border px-3 py-2 text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <label className="text-sm text-gray-700">Descripción</label>
            <textarea className="rounded-md border px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="flex gap-3">
              <button onClick={create} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600">Guardar</button>
              <button onClick={() => setForm({ title: "", dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, location: "Sala 101", description: "" })} className="rounded-md px-4 py-2 text-sm text-gray-900 border">Limpiar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <p className="text-sm font-medium text-gray-900">Clases fijas</p>
        <div className="mt-4 space-y-2">
          {items.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm">
              <div className="space-x-2"><span className="font-medium">{i.title}</span><span className="text-gray-600">{days[i.dayOfWeek || 0]} {i.startTime}</span><span className="text-gray-600">{i.location}</span></div>
              <button onClick={() => remove(i.id)} className="text-sm text-red-600">Eliminar</button>
            </div>
          ))}
          {!items.length && <p className="text-sm text-gray-600">No hay clases fijas</p>}
        </div>
      </div>
    </div>
  );
}
