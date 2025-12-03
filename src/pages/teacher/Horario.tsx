export default function TeacherHorario() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Dashboard del Profesor</p>
        <p className="text-sm text-gray-600">Gestiona tus clases, estudiantes y evaluaciones.</p>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="px-6 pt-6">
          <p className="text-sm font-medium text-gray-900">Agenda Semanal</p>
        </div>
        <div className="px-6 pb-6 mt-6">
          <div className="grid grid-cols-7 gap-2">
            <div />
            {days.map((d) => (
              <div key={d} className="text-center text-sm text-gray-900 border-b border-gray-200 pb-2">{d}</div>
            ))}
            {hours.map((h) => (
              <>
                <div key={`t-${h}`} className="text-sm text-gray-600 py-4 w-20">{h}</div>
                {days.map((d, idx) => {
                  const isPianoIntermedio = h === "16:00" && idx === 4;
                  const isPianoBasico = h === "18:00" && (idx === 0 || idx === 2);
                  if (isPianoIntermedio || isPianoBasico) {
                    return (
                      <div key={`${h}-${d}`} className="border rounded-xl bg-blue-50/50 border-blue-300 p-3 h-24 overflow-hidden">
                        <p className="text-xs text-gray-900 break-words leading-4">{isPianoIntermedio ? "Piano Intermedio" : "Piano Básico"}</p>
                        <span className="inline-flex items-center mt-2 text-xs border rounded-md px-2 py-1 max-w-full truncate">{isPianoIntermedio ? "Sala 102" : "Sala 101"}</span>
                        <p className="text-xs text-gray-600 mt-1 break-words leading-4">{isPianoIntermedio ? "8 estudiantes" : "12 estudiantes"}</p>
                      </div>
                    );
                  }
                  return <div key={`${h}-${d}`} className="border rounded-xl bg-white h-14 overflow-hidden" />;
                })}
              </>
            ))}
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-blue-100 border border-blue-300" />Clase programada</div>
            <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-green-100 border border-green-300" />Disponible</div>
            <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-gray-100 border border-gray-300" />Bloqueado</div>
          </div>
        </div>
      </div>
    </div>
  );
}

