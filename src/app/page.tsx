import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { HOME_DATA } from "@/mocks/home-data";
import PublicCourseCard from "@/components/PublicCourseCard";
import { featuredCourses } from "@/mock/courses";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-blue-200 to-purple-200">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
            Te damos la
            <br />
            bienvenida a Melody
            <br />
            Labs
          </h1>
          <p className="mt-6 text-2xl text-gray-900">Perfecciona música</p>
          <div className="absolute left-6 bottom-6 text-gray-500 text-sm">
            Desliza hacia abajo
            <div className="text-blue-600">⌄</div>
          </div>
          <div className="absolute right-6 bottom-6 flex items-center gap-3">
            <span className="rounded-full bg-gray-800 text-white text-sm px-4 py-2 opacity-60">¿Tienes dudas?</span>
          </div>
        </div>
      </section>

      {/* Navbar below hero */}
      <PublicNavbar />

      {/* Preview de cursos (3) */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900">Catálogo de Cursos</h2>
        <p className="mt-1 text-sm text-gray-600">Explora nuestra amplia selección de cursos y encuentra el perfecto para ti</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses
            .filter((c) => ["piano-basico", "guitarra-intermedia", "violin-avanzado"].includes(c.id))
            .map((c) => (
              <PublicCourseCard key={c.id} c={c} />
            ))}
        </div>
        <div className="mt-6">
          <Link to="/cursos" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Ver catálogo completo</Link>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
