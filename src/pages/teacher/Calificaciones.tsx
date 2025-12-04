import { useState } from "react";
import { GradeRecord, TeacherStore, uid } from "@/lib/teacherStore";

export default function TeacherCalificaciones() {
  const baseStudents = ["Juan Estudiante", "María López", "Carlos Ramírez", "Ana Martínez"];
  const [grades, setGrades] = useState<GradeRecord[]>(() => TeacherStore.getGrades());
  const [commentBy, setCommentBy] = useState<Record<string, string>>({});
  const saveGrades = (list: GradeRecord[]) => { setGrades(list); TeacherStore.saveGrades(list); };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Estudiantes - Piano Básico</p>
        <div className="mt-6 space-y-3">
          {baseStudents.map((name) => {
            const current = grades.find((g) => g.student === name);
            const progress = current?.progress ?? 70;
            return (
              <div key={name} className="rounded-xl border px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{name}</span>
                  <span className="inline-flex items-center rounded-md px-2 py-1 text-xs text-white bg-purple-600">{progress}% progreso</span>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-700">Progreso</label>
                    <input aria-label={`Progreso ${name}`} type="range" min={0} max={100} defaultValue={progress} onChange={(e) => {
                      const value = Number(e.target.value);
                      const next = grades.filter((g) => g.student !== name);
                      next.push({ id: uid("gr"), student: name, progress: value, comment: current?.comment, updatedAt: new Date().toISOString() });
                      saveGrades(next);
                    }} className="w-full" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-700">Comentarios evaluativos</label>
                    <textarea aria-label={`Comentarios ${name}`} className="rounded-md border px-3 py-2 text-sm w-full" value={commentBy[name] ?? current?.comment ?? ""} onChange={(e) => setCommentBy({ ...commentBy, [name]: e.target.value })} />
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  <button className="rounded-md px-4 py-2 text-xs text-white bg-blue-600" onClick={() => {
                    const value = commentBy[name] ?? current?.comment ?? "";
                    const next = grades.filter((g) => g.student !== name);
                    next.push({ id: uid("gr"), student: name, progress, comment: value.trim(), updatedAt: new Date().toISOString() });
                    saveGrades(next);
                  }}>Guardar</button>
                  <button className="rounded-md px-4 py-2 text-xs text-gray-900 border" onClick={() => setCommentBy({ ...commentBy, [name]: current?.comment ?? "" })}>Cancelar</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
