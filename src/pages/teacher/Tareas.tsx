import { useMemo, useState } from "react";
import { Task, TeacherStore, uid } from "@/lib/teacherStore";

export default function TeacherTareas() {
  const [tasks, setTasks] = useState<Task[]>(() => TeacherStore.getTasks());
  const [form, setForm] = useState<{ title: string; description: string; dueDate: string; requirements: string; assignedTo: string; reminders: boolean }>({ title: "", description: "", dueDate: "", requirements: "", assignedTo: "Piano Básico", reminders: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const saveTasks = (list: Task[]) => { setTasks(list); TeacherStore.saveTasks(list); };

  const validate = () => { const e: Record<string, string> = {}; if (!form.title.trim()) e.title = "Título requerido"; if (!form.dueDate) e.dueDate = "Fecha límite requerida"; if (!form.assignedTo.trim()) e.assignedTo = "Grupo/clase requerido"; return e; };
  const handleCreate = () => { const e = validate(); setErrors(e); if (Object.keys(e).length) return; const t: Task = { id: uid("tsk"), title: form.title.trim(), description: form.description.trim(), dueDate: form.dueDate, requirements: form.requirements ? form.requirements.split(",").map((s) => s.trim()).filter(Boolean) : [], assignedTo: form.assignedTo.trim(), reminders: form.reminders, createdAt: new Date().toISOString() }; saveTasks([t, ...tasks]); setForm({ title: "", description: "", dueDate: "", requirements: "", assignedTo: form.assignedTo, reminders: true }); };
  const handleDelete = (id: string) => saveTasks(tasks.filter((t) => t.id !== id));

  const soonTasks = useMemo(() => {
    const now = Date.now();
    return tasks.filter((t) => t.reminders).filter((t) => {
      const due = new Date(t.dueDate).getTime();
      const diff = due - now;
      return diff > 0 && diff < 1000 * 60 * 60 * 24 * 3; // < 3 días
    });
  }, [tasks]);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="px-6 pt-6"><p className="text-sm font-medium text-gray-900">Crear tarea</p></div>
        <div className="px-6 pb-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Título</label>
            <input aria-label="Título" className="rounded-md border px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
            <label className="text-sm text-gray-700">Fecha límite</label>
            <input aria-label="Fecha límite" type="date" className="rounded-md border px-3 py-2 text-sm" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            {errors.dueDate && <span className="text-xs text-red-600">{errors.dueDate}</span>}
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Descripción</label>
            <textarea aria-label="Descripción" className="rounded-md border px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <label className="text-sm text-gray-700">Requisitos (coma)</label>
            <input aria-label="Requisitos" className="rounded-md border px-3 py-2 text-sm" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Grupo/Clase</label>
            <input aria-label="Grupo" className="rounded-md border px-3 py-2 text-sm" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
            {errors.assignedTo && <span className="text-xs text-red-600">{errors.assignedTo}</span>}
            <label className="inline-flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={form.reminders} onChange={(e) => setForm({ ...form, reminders: e.target.checked })} />Recordatorios automáticos</label>
            <div className="flex gap-3"><button onClick={handleCreate} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600">Guardar</button><button onClick={() => setForm({ title: "", description: "", dueDate: "", requirements: "", assignedTo: "Piano Básico", reminders: true })} className="rounded-md px-4 py-2 text-sm text-gray-900 border">Limpiar</button></div>
          </div>
        </div>
      </div>

      {!!soonTasks.length && (
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-900">Recordatorios</p>
          <div className="mt-3 space-y-2">
            {soonTasks.map((t) => (<div key={t.id} className="rounded-xl border px-4 py-3 text-sm">{t.title} • vence el {t.dueDate} • {t.assignedTo}</div>))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Tareas</p>
        <div className="mt-4 space-y-2">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm">
              <div className="space-x-2"><span className="font-medium">{t.title}</span><span className="text-gray-600">{t.assignedTo}</span><span className="text-gray-600">vence {t.dueDate}</span></div>
              <button onClick={() => handleDelete(t.id)} className="text-sm text-red-600">Eliminar</button>
            </div>
          ))}
          {!tasks.length && <p className="text-sm text-gray-600">No hay tareas creadas</p>}
        </div>
      </div>
    </div>
  );
}
