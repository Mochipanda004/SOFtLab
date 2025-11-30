import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">♪</span>
            <span className="text-gray-900 font-medium">Melody Labs</span>
          </Link>
          <div className="ml-6 flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="#" className="text-gray-700 text-sm">¿Quiénes somos?</Link>
          <Link to="/login" className="text-gray-700 text-sm">Iniciar sesión</Link>
          <Link to="/register" className="inline-flex items-center rounded-full bg-purple-600 px-4 py-1.5 text-sm font-medium text-white">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}
