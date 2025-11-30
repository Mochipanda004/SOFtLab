"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music, Search, Filter, Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Búsqueda:", searchQuery);
  };

  return (
    <nav
      className="bg-white shadow-sm border-b sticky top-0 z-50"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Melody Labs - Inicio"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-gray-900">Melody Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative"
              role="search"
            >
              <label htmlFor="search-desktop" className="sr-only">
                Buscar cursos
              </label>
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-desktop"
                type="search"
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                aria-label="Buscar cursos"
              />
            </form>

            {/* Filter Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
              aria-label="Abrir filtros de búsqueda"
            >
              <Filter className="w-4 h-4" aria-hidden="true" />
              <span className="text-black">Filtros</span>
            </Button>

            {/* Navigation Links */}
            <>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1"
              >
                ¿Quiénes somos?
              </Link>
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1"
              >
                Iniciar sesión
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Registrarse
                </Button>
              </Link>
            </>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"}
              className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4" id="mobile-menu">
            <div className="space-y-4">
              {/* Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative"
                role="search"
              >
                <label htmlFor="search-mobile" className="sr-only">
                  Buscar cursos
                </label>
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-mobile"
                  type="search"
                  placeholder="Buscar cursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                  aria-label="Buscar cursos"
                />
              </form>

              <>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-2"
                >
                  ¿Quiénes somos?
                </Link>
                <Link
                  href="/login"
                  className="block text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-2"
                >
                  Iniciar sesión
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    Registrarse
                  </Button>
                </Link>
              </>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
