import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ChatbotWidget from "@/components/ChatbotWidget";
import PublicCourseCard from "@/components/PublicCourseCard";
import { useEffect, useMemo, useState } from "react";
import { fetchCourses } from "@/lib/courses";
import { Link } from "react-router-dom";

export default function CursosCatalog() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [instrument, setInstrument] = useState("Todos");
  const [level, setLevel] = useState("Todos los niveles");
  const [modality, setModality] = useState("Todas");
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const instruments = useMemo(() => {
    const set = new Set<string>();
    (courses || []).forEach((c: any) => { if (c.instrument) set.add(c.instrument); });
    return ["Todos", ...Array.from(set).sort()];
  }, [courses]);
  const levels = ["Todos los niveles", "Básico", "Intermedio", "Avanzado"];
  const modalities = ["Todas", "Presencial", "Virtual", "Híbrido"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (courses || []).filter((c: any) => {
      const byQuery = q
        ? [c.title, c.instrument, c.instructor, c.scheduleText]
            .filter(Boolean)
            .some((v: string) => v.toLowerCase().includes(q))
        : true;
      const byInstrument = instrument === "Todos" ? true : c.instrument === instrument;
      const byLevel = level === "Todos los niveles" ? true : c.level === level;
      const byModality = modality === "Todas" ? true : c.modality === modality;
      return byQuery && byInstrument && byLevel && byModality;
    });
  }, [courses, query, instrument, level, modality]);
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">♪</span>
            <span className="text-gray-900 font-medium">Melody Labs</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-700 text-sm">Iniciar sesión</Link>
            <Link to="/register" className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white">Registrarse</Link>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Catálogo de Cursos</h1>
        <p className="mt-1 text-sm text-gray-600">
          Explora nuestra amplia selección de cursos y encuentra el perfecto
          para ti
        </p>

        {/* Search + Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cursos..."
            className="w-full md:w-80 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400"
          />
          <span className="flex items-center gap-2 text-sm text-gray-700">
            <span>⚙️</span> Filtros
          </span>
          <select
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
          >
            {instruments.map((ins) => (
              <option key={ins} value={ins}>{ins}</option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
          >
            {levels.map((lv) => (
              <option key={lv} value={lv}>{lv}</option>
            ))}
          </select>
          <select
            value={modality}
            onChange={(e) => setModality(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
          >
            {modalities.map((md) => (
              <option key={md} value={md}>{md}</option>
            ))}
          </select>
        </div>

        <p className="mt-3 text-sm text-gray-500">{loading ? "Cargando cursos..." : `Mostrando ${filtered.length} curso(s)`}</p>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? [] : filtered).map((c) => (
            <PublicCourseCard key={c.id} c={c} />
          ))}
        </div>
      </div>

      <ChatbotWidget />

      <PublicFooter />
    </div>
  );
}
