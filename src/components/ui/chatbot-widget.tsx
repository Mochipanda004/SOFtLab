'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatbotWidgetProps {
  className?: string
}

const faqQuestions = [
  '¿Cómo me inscribo en un curso?',
  '¿Cuáles son los métodos de pago?',
  '¿Puedo cancelar mi inscripción?',
  '¿Cómo contacto a un profesor?'
]

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: '¡Hola! Soy tu asistente de Melody Labs. ¿En qué puedo ayudarte?', isUser: false }
  ])
  
  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question)
    setMessages(prev => [...prev, { text: question, isUser: true }])
    
    // Simulate bot response
    setTimeout(() => {
      let response = ''
      switch (question) {
        case '¿Cómo me inscribo en un curso?':
          response = 'Para inscribirte en un curso, navega a la sección de cursos, selecciona el que te interesa y haz clic en "Inscribirse". ¡Es muy fácil!'
          break
        case '¿Cuáles son los métodos de pago?':
          response = 'Aceptamos tarjetas de crédito, débito y transferencias bancarias. También puedes pagar en efectivo en nuestra sede.'
          break
        case '¿Puedo cancelar mi inscripción?':
          response = 'Sí, puedes cancelar tu inscripción hasta 7 días antes del inicio del curso con reembolso completo.'
          break
        case '¿Cómo contacto a un profesor?':
          response = 'Puedes contactar a los profesores a través del chat interno una vez que estés inscrito en su curso.'
          break
        default:
          response = 'Gracias por tu pregunta. Un representante te contactará pronto.'
      }
      setMessages(prev => [...prev, { text: response, isUser: false }])
    }, 1000)
  }
  
  const handleClose = () => {
    setIsOpen(false)
  }
  
  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110',
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          className
        )}
        aria-label="Abrir chat de ayuda"
      >
        <MessageCircle className={cn('h-6 w-6', isOpen && 'hidden')} />
        <X className={cn('h-6 w-6', !isOpen && 'hidden')} />
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-lg bg-white shadow-xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-2">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Asistente Melody Labs</h3>
                <p className="text-xs text-gray-500">¿En qué puedo ayudarte?</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Cerrar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.isUser ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[70%] rounded-lg px-3 py-2 text-sm',
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* FAQ buttons */}
          {!selectedQuestion && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Preguntas frecuentes:</p>
              <div className="space-y-2">
                {faqQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              ¿Necesitas más ayuda? Contacta con soporte
            </p>
          </div>
        </div>
      )}
    </>
  )
}