import { useMemo, useState } from "react";
import { Activity, ActivityType, TeacherStore, uid } from "@/lib/teacherStore";

export default function TeacherHorario() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const [activities, setActivities] = useState<Activity[]>(() => TeacherStore.getActivities());
  const adminActivities = TeacherStore.getAdminSchedule();
  const [filter, setFilter] = useState<ActivityType | "todas">("todas");
  const [form, setForm] = useState<{ type: ActivityType; title: string; dayOfWeek?: number; date?: string; startTime: string; durationMinutes: number; location?: string; description?: string; participants?: string }>({ type: "clase", title: "", dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, location: "", description: "", date: "", participants: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const saveActivities = (list: Activity[]) => { setActivities(list); TeacherStore.saveActivities(list); };
  const validate = () => { const e: Record<string, string> = {}; if (!form.title.trim()) e.title = "Título requerido"; if (!form.startTime) e.startTime = "Hora requerida"; if (!form.durationMinutes || form.durationMinutes <= 0) e.durationMinutes = "Duración inválida"; if (form.type !== "clase" && !form.date) e.date = "Fecha requerida"; return e; };
  const toMin = (t: string) => { const [hh, mm] = t.split(":").map(Number); return hh * 60 + mm; };
  const overlaps = (a: Activity, b: Activity) => { const aStart = toMin(a.startTime), aEnd = aStart + a.durationMinutes; const bStart = toMin(b.startTime), bEnd = bStart + b.durationMinutes; return Math.max(aStart, bStart) < Math.min(aEnd, bEnd); };
  const dayIndexFromDate = (d?: string) => (d ? new Date(d).getDay() : undefined); // 0=Sun
  const sameDay = (a: Activity, b: Activity) => {
    if (a.type === "clase" && b.type === "clase") return a.dayOfWeek === b.dayOfWeek;
    const aDow = a.type === "clase" ? a.dayOfWeek : dayIndexFromDate(a.date);
    const bDow = b.type === "clase" ? b.dayOfWeek : dayIndexFromDate(b.date);
    return aDow === bDow;
  };
  const hasConflictWithAdmin = (a: Activity) => adminActivities.some((b) => sameDay(a, b) && overlaps(a, b));
  const hasConflictWithTeacher = (a: Activity) => activities.some((b) => b.type === "clase" && a.type === "clase" && sameDay(a, b) && overlaps(a, b));
  const handleCreate = () => { const e = validate(); setErrors(e); if (Object.keys(e).length) return; const a: Activity = { id: uid("act"), type: form.type, title: form.title.trim(), dayOfWeek: form.type === "clase" ? form.dayOfWeek : undefined, date: form.type !== "clase" ? form.date : undefined, startTime: form.startTime, durationMinutes: form.durationMinutes, location: form.location, description: form.description, participants: form.participants ? form.participants.split(",").map((s) => s.trim()).filter(Boolean) : undefined }; if (hasConflictWithAdmin(a) || hasConflictWithTeacher(a)) { setErrors({ startTime: "Conflicto con horario predefinido" }); return; } saveActivities([a, ...activities]); setForm({ type: form.type, title: "", dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, location: "", description: "", date: "", participants: "" }); };
  const handleDelete = (id: string) => { saveActivities(activities.filter((a) => a.id !== id)); };
  const weeklySlots = useMemo(() => { const byDay: Record<number, Activity[]> = {}; [...adminActivities, ...activities].forEach((a) => { if (a.type === "clase" && typeof a.dayOfWeek === "number") { byDay[a.dayOfWeek] = byDay[a.dayOfWeek] || []; byDay[a.dayOfWeek].push(a); } }); return byDay; }, [activities, adminActivities]);
  const allActivities = [...adminActivities, ...activities];
  const filteredActivities = allActivities.filter((a) => (filter === "todas" ? true : a.type === filter));

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="px-6 pt-6"><p className="text-sm font-medium text-gray-900">Programar actividad</p></div>
        <div className="px-6 pb-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Tipo</label>
            <select aria-label="Tipo de actividad" className="rounded-md border px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ActivityType })}>
              <option value="clase">Clase semanal</option>
              <option value="taller">Taller puntual</option>
              <option value="concierto">Concierto</option>
            </select>
            <label className="text-sm text-gray-700">Título</label>
            <input aria-label="Título" className="rounded-md border px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
            {form.type === "clase" && (<><label className="text-sm text-gray-700">Día</label><select aria-label="Día" className="rounded-md border px-3 py-2 text-sm" value={form.dayOfWeek} onChange={(e) => setForm({ ...form, dayOfWeek: Number(e.target.value) })}>{days.map((d, i) => (<option key={d} value={i}>{d}</option>))}</select></>)}
            {form.type !== "clase" && (<><label className="text-sm text-gray-700">Fecha</label><input aria-label="Fecha" type="date" className="rounded-md border px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />{errors.date && <span className="text-xs text-red-600">{errors.date}</span>}</>)}
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Hora inicio</label>
            <input aria-label="Hora inicio" className="rounded-md border px-3 py-2 text-sm" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            {errors.startTime && <span className="text-xs text-red-600">{errors.startTime}</span>}
            <label className="text-sm text-gray-700">Duración (min)</label>
            <input aria-label="Duración" type="number" min={15} className="rounded-md border px-3 py-2 text-sm" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} />
            {errors.durationMinutes && <span className="text-xs text-red-600">{errors.durationMinutes}</span>}
            <label className="text-sm text-gray-700">Lugar</label>
            <input aria-label="Lugar" className="rounded-md border px-3 py-2 text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Descripción</label>
            <textarea aria-label="Descripción" className="rounded-md border px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            {form.type === "concierto" && (<><label className="text-sm text-gray-700">Participantes (coma)</label><input aria-label="Participantes" className="rounded-md border px-3 py-2 text-sm" value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} /></>)}
            <div className="flex gap-3"><button onClick={handleCreate} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600">Guardar</button><button onClick={() => setForm({ type: "clase", title: "", dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, location: "", description: "", date: "", participants: "" })} className="rounded-md px-4 py-2 text-sm text-gray-900 border">Limpiar</button></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="px-6 pt-6 flex items-center justify-between"><p className="text-sm font-medium text-gray-900">Agenda Semanal</p><div className="flex items-center gap-2"><label className="text-sm text-gray-700">Filtrar</label><select aria-label="Filtro" className="rounded-md border px-3 py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value as any)}><option value="todas">Todas</option><option value="clase">Clases</option><option value="taller">Talleres</option><option value="concierto">Conciertos</option></select></div></div>
        <div className="px-6 pb-6 mt-6">
          <div className="grid grid-cols-7 gap-2">
            <div />
            {days.map((d) => (<div key={d} className="text-center text-sm text-gray-900 border-b border-gray-200 pb-2">{d}</div>))}
            {hours.map((h) => (<><div key={`t-${h}`} className="text-sm text-gray-600 py-4 w-20">{h}</div>{days.map((_, idx) => { const slotActs = (weeklySlots[idx] || []).filter((a) => filter === "todas" || a.type === filter).filter((a) => a.startTime === h); if (slotActs.length) { const hasFixed = slotActs.some((s) => s.fixed); return (<div key={`${h}-${idx}`} className="border rounded-xl p-3 h-24 overflow-hidden" style={{ backgroundColor: hasFixed ? "#eef2ff" : "#eff6ff", borderColor: hasFixed ? "#c7d2fe" : "#bfdbfe" }}>{slotActs.map((a) => (<div key={a.id} className="text-xs text-gray-900 leading-4"><div className="flex items-center justify-between"><p className="font-medium truncate">{a.title}</p>{a.fixed ? <span className="text-[11px] text-indigo-600">Fijo</span> : <button onClick={() => handleDelete(a.id)} className="text-[11px] text-red-600">Eliminar</button>}</div><span className="inline-flex items-center mt-1 text-[11px] border rounded-md px-2 py-1 max-w-full truncate">{a.location || "Sala"}</span>{a.description && <p className="text-[11px] text-gray-600 mt-1 truncate">{a.description}</p>}</div>))}</div>); } return <div key={`${h}-${idx}`} className="border rounded-xl bg-white h-14 overflow-hidden" />; })}</>))}
          </div>
        </div>
        <div className="px-6 pb-6"><div className="flex items-center gap-8 text-sm"><div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-blue-100 border border-blue-300" />Clase programada</div><div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-green-100 border border-green-300" />Disponible</div><div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-gray-100 border border-gray-300" />Bloqueado</div></div></div>
      </div>

      <div className="rounded-2xl border bg-white p-6"><p className="text-sm font-medium text-gray-900">Actividades</p><div className="mt-4 space-y-2">{filteredActivities.map((a) => (<div key={a.id} className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"><div className="space-x-2"><span className="font-medium">{a.title}</span><span className="text-gray-600">{a.type}</span>{a.type === "clase" ? <span className="text-gray-600">{days[a.dayOfWeek || 0]} {a.startTime}</span> : <span className="text-gray-600">{a.date} {a.startTime}</span>} {a.fixed && <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] text-indigo-600">Fijo</span>}</div>{a.fixed ? <span className="text-[11px] text-indigo-600">Admin</span> : <button onClick={() => handleDelete(a.id)} className="text-sm text-red-600">Eliminar</button>}</div>))}{!filteredActivities.length && <p className="text-sm text-gray-600">No hay actividades</p>}</div></div>
    </div>
  );
}
