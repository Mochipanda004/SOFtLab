'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Music } from 'lucide-react'

export function Hero() {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('cursos')
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const words = ['Perfecciona', 'Crea', 'Estudia', 'Produce', 'Transforma']
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length)
        setFading(false)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100" />
      
      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-4xl text-blue-200 opacity-30 animate-pulse">♪</div>
        <div className="absolute top-40 right-32 text-3xl text-purple-200 opacity-40 animate-bounce">♫</div>
        <div className="absolute bottom-40 left-40 text-5xl text-pink-200 opacity-25 animate-pulse">♬</div>
        <div className="absolute top-60 left-1/3 text-2xl text-blue-300 opacity-35 animate-bounce">♩</div>
        <div className="absolute bottom-60 right-1/4 text-4xl text-purple-300 opacity-30 animate-pulse">♪</div>
        <div className="absolute top-1/3 right-20 text-3xl text-pink-300 opacity-40 animate-bounce">♫</div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main heading with gradient text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Te damos la bienvenida a
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Melody Labs
          </span>
        </h1>
        
        <p className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12" aria-live="polite">
          <span className={`transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            {words[index]}
          </span>
          {" "}
          <span>tu música</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg"
          >
            Explorar Cursos
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg"
          >
            ¿Quiénes somos?
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-2 text-sm">Desliza hacia abajo</p>
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 text-white">
          <path 
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
