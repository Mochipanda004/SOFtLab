import React, { useState } from "react";
import { Music, Home, Plus, Search } from "lucide-react";
import { AdminStore, Instrument, Room, ScheduleSlot, uid, overlap } from "@/lib/adminStore";

export default function Resources() {
  const [instruments, setInstruments] = useState<Instrument[]>(() => AdminStore.getInstruments());
  const [rooms, setRooms] = useState<Room[]>(() => AdminStore.getRooms());
  const [slots, setSlots] = useState<ScheduleSlot[]>(() => AdminStore.getSchedules());
  const [formInst, setFormInst] = useState<{ name: string; type: string; disponible: boolean }>({ name: "", type: "Piano", disponible: true });
  const [formRoom, setFormRoom] = useState<{ name: string; capacidad: number; equipamiento: string }>({ name: "", capacidad: 10, equipamiento: "" });
  const [formSlot, setFormSlot] = useState<{ dayOfWeek: number; startTime: string; durationMinutes: number; type: "clase" | "ensayo" }>({ dayOfWeek: 0, startTime: "16:00", durationMinutes: 60, type: "clase" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "Ocupado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Sala" ? Home : Music;
  };

  const saveInstruments = (list: Instrument[]) => { setInstruments(list); AdminStore.saveInstruments(list); };
  const saveRooms = (list: Room[]) => { setRooms(list); AdminStore.saveRooms(list); };
  const saveSlots = (list: ScheduleSlot[]) => { setSlots(list); AdminStore.saveSchedules(list); };

  const createInstrument = () => {
    const e: Record<string, string> = {};
    if (!formInst.name.trim()) e.inst = "Nombre requerido";
    setErrors(e);
    if (Object.keys(e).length) return;
    const item: Instrument = { id: uid("inst"), name: formInst.name.trim(), type: formInst.type, status: formInst.disponible ? "Disponible" : "Ocupado", disponible: formInst.disponible };
    saveInstruments([item, ...instruments]);
    setFormInst({ name: "", type: formInst.type, disponible: true });
  };

  const createRoom = () => {
    const e: Record<string, string> = {};
    if (!formRoom.name.trim()) e.room = "Nombre requerido";
    setErrors(e);
    if (Object.keys(e).length) return;
    const equip = formRoom.equipamiento ? formRoom.equipamiento.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const room: Room = { id: uid("room"), name: formRoom.name.trim(), capacidad: formRoom.capacidad, equipamiento: equip, horarios: [] };
    saveRooms([room, ...rooms]);
    setFormRoom({ name: "", capacidad: 10, equipamiento: "" });
  };

  const createSlot = () => {
    const e: Record<string, string> = {};
    if (!formSlot.startTime) e.slot = "Hora requerida";
    setErrors(e);
    if (Object.keys(e).length) return;
    const item: ScheduleSlot = { id: uid("slot"), dayOfWeek: formSlot.dayOfWeek, startTime: formSlot.startTime, durationMinutes: formSlot.durationMinutes, type: formSlot.type };
    if (slots.some((s) => overlap(s, item))) { setErrors({ slot: "Conflicto con otro horario" }); return; }
    saveSlots([item, ...slots]);
    setFormSlot({ dayOfWeek: formSlot.dayOfWeek, startTime: "16:00", durationMinutes: 60, type: formSlot.type });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Recursos
            </h1>
            <p className="text-gray-600 mt-1">
              Administra salas e instrumentos de la academia
            </p>
          </div>
          <div />
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-900">Registrar instrumento</p>
          <div className="mt-4 space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Nombre" value={formInst.name} onChange={(e) => setFormInst({ ...formInst, name: e.target.value })} />
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Tipo" value={formInst.type} onChange={(e) => setFormInst({ ...formInst, type: e.target.value })} />
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={formInst.disponible} onChange={(e) => setFormInst({ ...formInst, disponible: e.target.checked })} />Disponible</label>
            {errors.inst && <span className="text-xs text-red-600">{errors.inst}</span>}
            <button onClick={createInstrument} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Guardar instrumento</button>
          </div>
          <div className="mt-6 space-y-2">
            {instruments.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl border px-4 py-2 text-sm"><div className="space-x-2"><span className="font-medium">{r.name}</span><span className="text-gray-600">{r.type}</span><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getStatusColor(r.status)}`}>{r.status}</span></div><button onClick={() => { if (!window.confirm("¿Cambiar estado?")) return; const next = instruments.map((i) => i.id === r.id ? { ...i, status: i.status === "Disponible" ? "Ocupado" : "Disponible" } : i); saveInstruments(next); }} className="text-sm text-indigo-600">Alternar</button></div>
            ))}
            {!instruments.length && <p className="text-sm text-gray-600">No hay instrumentos</p>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-900">Registrar sala</p>
          <div className="mt-4 space-y-3">
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Nombre" value={formRoom.name} onChange={(e) => setFormRoom({ ...formRoom, name: e.target.value })} />
            <input type="number" min={1} className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Capacidad" value={formRoom.capacidad} onChange={(e) => setFormRoom({ ...formRoom, capacidad: Number(e.target.value) })} />
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Equipamiento (coma)" value={formRoom.equipamiento} onChange={(e) => setFormRoom({ ...formRoom, equipamiento: e.target.value })} />
            {errors.room && <span className="text-xs text-red-600">{errors.room}</span>}
            <button onClick={createRoom} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Guardar sala</button>
          </div>
          <div className="mt-6 space-y-2">
            {rooms.map((r) => (
              <div key={r.id} className="rounded-xl border px-4 py-2 text-sm">
                <div className="flex items-center justify-between"><span className="font-medium">{r.name}</span><span className="text-gray-600">Capacidad {r.capacidad}</span></div>
                <div className="text-xs text-gray-600">{r.equipamiento.join(" • ") || "Sin equipamiento"}</div>
              </div>
            ))}
            {!rooms.length && <p className="text-sm text-gray-600">No hay salas</p>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-900">Horarios disponibles</p>
          <div className="mt-4 space-y-3">
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={formSlot.dayOfWeek} onChange={(e) => setFormSlot({ ...formSlot, dayOfWeek: Number(e.target.value) })}>
              {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].map((d,i) => (<option key={d} value={i}>{d}</option>))}
            </select>
            <input className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Hora inicio" value={formSlot.startTime} onChange={(e) => setFormSlot({ ...formSlot, startTime: e.target.value })} />
            <input type="number" min={15} className="rounded-lg border px-3 py-2 text-sm w-full" placeholder="Duración (min)" value={formSlot.durationMinutes} onChange={(e) => setFormSlot({ ...formSlot, durationMinutes: Number(e.target.value) })} />
            <select className="rounded-lg border px-3 py-2 text-sm w-full" value={formSlot.type} onChange={(e) => setFormSlot({ ...formSlot, type: e.target.value as any })}>
              <option value="clase">Clase</option>
              <option value="ensayo">Ensayo</option>
            </select>
            {errors.slot && <span className="text-xs text-red-600">{errors.slot}</span>}
            <button onClick={createSlot} className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 w-full">Guardar horario</button>
          </div>
          <div className="mt-6 space-y-2">
            {slots.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl border px-4 py-2 text-sm"><span>{["Lun","Mar","Mié","Jue","Vie","Sáb"][s.dayOfWeek]} {s.startTime} • {s.durationMinutes} min • {s.type}</span><button onClick={() => { if (!window.confirm("¿Eliminar horario?")) return; const next = slots.filter((x) => x.id !== s.id); saveSlots(next); }} className="text-sm text-red-600">Eliminar</button></div>
            ))}
            {!slots.length && <p className="text-sm text-gray-600">No hay horarios</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
