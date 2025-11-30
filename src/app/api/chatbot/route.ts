import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { mensaje, contexto = 'general' } = await request.json()

    if (!mensaje || typeof mensaje !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Buscar preguntas frecuentes relacionadas con el mensaje
    const { data: faqs, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('categoria', contexto)
      .textSearch('pregunta', mensaje)
      .limit(3)

    if (error) {
      console.error('Error al buscar FAQs:', error)
      return NextResponse.json(
        { error: 'Error al procesar tu pregunta' },
        { status: 500 }
      )
    }

    // Si encontramos FAQs relevantes, responder con la más relevante
    if (faqs && faqs.length > 0) {
      const faqMasRelevante = faqs[0]
      return NextResponse.json({
        respuesta: faqMasRelevante.respuesta,
        pregunta_relacionada: faqMasRelevante.pregunta,
        categoria: faqMasRelevante.categoria,
        sugerencias: faqs.slice(1).map(faq => ({
          pregunta: faq.pregunta,
          id: faq.id
        }))
      })
    }

    // Si no encontramos FAQs, buscar por palabras clave
    const palabrasClave = mensaje.toLowerCase().split(' ')
    
    // Consultas específicas por palabras clave
    if (palabrasClave.some(palabra => ['precio', 'costo', 'valor', 'cuánto'].includes(palabra))) {
      return NextResponse.json({
        respuesta: 'Los precios de nuestros cursos varían según el nivel y duración. Puedes ver todos los precios en la sección de cursos de nuestra página web. ¿Te gustaría que te ayude a encontrar un curso específico?',
        sugerencias: [
          { pregunta: '¿Qué cursos ofrecen?' },
          { pregunta: '¿Cuáles son los métodos de pago?' },
          { pregunta: '¿Hay descuentos disponibles?' }
        ]
      })
    }

    if (palabrasClave.some(palabra => ['clase', 'horario', 'cuándo', 'fecha'].includes(palabra))) {
      return NextResponse.json({
        respuesta: 'Los horarios de las clases varían según el curso y nivel. Una vez que te inscribas en un curso, podrás ver el calendario completo de clases en tu dashboard de estudiante.',
        sugerencias: [
          { pregunta: '¿Cómo me inscribo en un curso?' },
          { pregunta: '¿Puedo ver los horarios antes de inscribirme?' },
          { pregunta: '¿Las clases son grabadas?' }
        ]
      })
    }

    if (palabrasClave.some(palabra => ['inscripción', 'inscribir', 'registro', 'apuntar'].includes(palabra))) {
      return NextResponse.json({
        respuesta: 'Para inscribirte en un curso, primero debes crear una cuenta en nuestra plataforma. Luego, navega a la sección de cursos, selecciona el curso de tu interés y haz clic en "Inscribirme". El proceso incluye el pago del curso.',
        sugerencias: [
          { pregunta: '¿Cómo creo una cuenta?' },
          { pregunta: '¿Qué métodos de pago aceptan?' },
          { pregunta: '¿Puedo cancelar mi inscripción?' }
        ]
      })
    }

    if (palabrasClave.some(palabra => ['pago', 'pse', 'tarjeta', 'transferencia'].includes(palabra))) {
      return NextResponse.json({
        respuesta: 'Aceptamos pagos mediante PSE (transferencia bancaria) y tarjetas de crédito/débito. El proceso de pago es seguro y rápido. Una vez completado el pago, recibirás una confirmación por email.',
        sugerencias: [
          { pregunta: '¿Es seguro pagar en línea?' },
          { pregunta: '¿Puedo pagar en cuotas?' },
          { pregunta: '¿Qué pasa si mi pago falla?' }
        ]
      })
    }

    if (palabrasClave.some(palabra => ['certificado', 'diploma', 'reconocimiento'].includes(palabra))) {
      return NextResponse.json({
        respuesta: 'Sí, al completar satisfactoriamente un curso recibirás un certificado digital emitido por Melody Labs. El certificado incluye tu nombre, el nombre del curso, la duración y la fecha de finalización.',
        sugerencias: [
          { pregunta: '¿El certificado tiene validez?' },
          { pregunta: '¿Cómo obtengo mi certificado?' },
          { pregunta: '¿Puedo compartir mi certificado en LinkedIn?' }
        ]
      })
    }

    if (palabrasClave.some(palabra => ['online', 'virtual', 'remoto', 'casa'].includes(palabra))) {
      return NextResponse.json({
        respuesta: 'Sí, ofrecemos cursos tanto presenciales como virtuales. Los cursos online se realizan a través de plataformas de videoconferencia con acceso a materiales digitales y grabaciones de las clases.',
        sugerencias: [
          { pregunta: '¿Cómo accedo a las clases virtuales?' },
          { pregunta: '¿Necesito algún software especial?' },
          { pregunta: '¿Las clases virtuales son en vivo?' }
        ]
      })
    }

    // Respuesta genérica si no se identifica el tema
    return NextResponse.json({
      respuesta: 'Gracias por tu pregunta. Como asistente virtual, puedo ayudarte con información sobre nuestros cursos, inscripciones, pagos, horarios y más. ¿En qué tema específico estás interesado?',
      sugerencias: [
        { pregunta: '¿Qué cursos ofrecen?' },
        { pregunta: '¿Cuáles son los precios?' },
        { pregunta: '¿Cómo me inscribo?' },
        { pregunta: '¿Aceptan pagos en línea?' }
      ]
    })

  } catch (error) {
    console.error('Error en el chatbot:', error)
    return NextResponse.json(
      { error: 'Error al procesar tu pregunta. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}