import { useState } from "react";
import { AttendanceItem, AttendanceRecord, TeacherStore, uid } from "@/lib/teacherStore";

export default function TeacherAsistencia() {
  const [classTitle, setClassTitle] = useState("Piano Básico");
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const initial: AttendanceItem[] = [
    { name: "Juan Estudiante", present: true },
    { name: "María López", present: true },
    { name: "Carlos Ramírez", present: false, comment: "Justificación pendiente" },
    { name: "Ana Martínez", present: true },
  ];
  const [items, setItems] = useState<AttendanceItem[]>(initial);
  const [history, setHistory] = useState<AttendanceRecord[]>(() => TeacherStore.getAttendance());

  const saveHistory = (list: AttendanceRecord[]) => { setHistory(list); TeacherStore.saveAttendance(list); };
  const percentage = (i: AttendanceItem) => (i.present ? 100 : 0);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white">
        <div className="px-6 pt-6">
          <p className="text-sm font-medium text-gray-900">Tomar Asistencia - {classTitle}</p>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <input aria-label="Clase" className="rounded-md border px-3 py-2" value={classTitle} onChange={(e) => setClassTitle(e.target.value)} />
            <input aria-label="Fecha" type="date" className="rounded-md border px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div className="px-6 pb-6 mt-6">
          <div className="border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 text-sm text-gray-900 border-b">
              <div className="col-span-6 py-2 px-2">Estudiante</div>
              <div className="col-span-5 py-2 px-2">Asistencia</div>
              <div className="col-span-1 py-2 text-center">Presente</div>
            </div>
            {items.map((r, i) => (
              <div key={i} className="grid grid-cols-12 items-center border-b">
                <div className="col-span-6 px-2 py-3">
                  <div className="text-sm text-gray-900">{r.name}</div>
                  <div className="mt-2 text-xs text-gray-600">
                    <label className="mr-2">Justificación:</label>
                    <input aria-label={`Justificación ${r.name}`} className="rounded-md border px-2 py-1 w-64" value={r.comment || ""} onChange={(e) => setItems(items.map((it, idx) => idx === i ? { ...it, comment: e.target.value } : it))} />
                  </div>
                </div>
                <div className="col-span-5 px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${percentage(r)}%` }} />
                    </div>
                    <div className="text-sm text-gray-600 w-10">{percentage(r)}%</div>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <input type="checkbox" aria-label={`Presente ${r.name}`} checked={r.present} onChange={(e) => setItems(items.map((it, idx) => idx === i ? { ...it, present: e.target.checked } : it))} className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={() => { const rec: AttendanceRecord = { id: uid("att"), activityId: classTitle, date, items }; saveHistory([rec, ...history]); }} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600">Guardar asistencia</button>
            <button onClick={() => setItems(initial)} className="rounded-md px-4 py-2 text-sm text-gray-900 border">Cancelar</button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Histórico</p>
        <div className="mt-4 space-y-2">
          {history.map((h) => (
            <div key={h.id} className="rounded-xl border px-4 py-3 text-sm">
              <div className="flex items-center justify-between"><span className="font-medium">{h.activityId}</span><span className="text-gray-600">{h.date}</span></div>
              <div className="mt-2 text-xs text-gray-600">{h.items.filter((i) => !i.present && i.comment).map((i) => `${i.name}: ${i.comment}`).join(" • ") || "Sin observaciones"}</div>
            </div>
          ))}
          {!history.length && <p className="text-sm text-gray-600">Aún no hay registros</p>}
        </div>
      </div>
    </div>
  );
}
