import React from 'react'
import Link from 'next/link'
import { Music } from 'lucide-react'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Melody Labs</span>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link 
                href="/cursos" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Cursos
              </Link>
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                Iniciar sesión
              </Link>
            </nav>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Abrir menú principal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Melody Labs</span>
              </Link>
              <p className="text-gray-600 text-sm max-w-md">
                La mejor academia de música para aprender y crecer como músico. Ofrecemos cursos de alta calidad con profesores expertos.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/cursos" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link href="/profesores" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    Profesores
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    Nosotros
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terminos" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    Términos de servicio
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Melody Labs. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}