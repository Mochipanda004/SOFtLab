import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Obtener el cuerpo de la notificación del webhook
    const body = await request.json()
    
    // Verificar la firma del webhook (en producción)
    const signature = request.headers.get('x-webhook-signature')
    // if (!verificarFirmaWebhook(body, signature)) {
    //   return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
    // }

    const { referencia_pago, estado, transaction_id, mensaje } = body

    if (!referencia_pago || !estado) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Buscar el pago por referencia
    const { data: pago, error: pagoError } = await supabase
      .from('pagos')
      .select(`
        *,
        inscripciones!inner(*)
      `)
      .eq('referencia_pago', referencia_pago)
      .single()

    if (pagoError || !pago) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar el estado del pago
    const { error: updateError } = await supabase
      .from('pagos')
      .update({
        estado: estado,
        transaction_id: transaction_id,
        mensaje_respuesta: mensaje,
        fecha_actualizacion: new Date().toISOString(),
        fecha_pago: estado === 'aprobado' ? new Date().toISOString() : null,
      })
      .eq('id', pago.id)

    if (updateError) {
      console.error('Error al actualizar el pago:', updateError)
      return NextResponse.json(
        { error: 'Error al actualizar el pago' },
        { status: 500 }
      )
    }

    // Si el pago fue aprobado, actualizar la inscripción
    if (estado === 'aprobado') {
      const { error: inscripcionError } = await supabase
        .from('inscripciones')
        .update({
          estado: 'pagado',
          fecha_actualizacion: new Date().toISOString(),
        })
        .eq('id', pago.inscripcion_id)

      if (inscripcionError) {
        console.error('Error al actualizar la inscripción:', inscripcionError)
      }

      // Enviar notificación por email (en producción)
      // await enviarEmailConfirmacion(pago.inscripciones.alumno_id, pago)
    }

    // Si el pago fue rechazado, podríamos notificar al usuario
    if (estado === 'rechazado') {
      // Enviar notificación de pago rechazado
      // await enviarEmailPagoRechazado(pago.inscripciones.alumno_id, pago)
    }

    return NextResponse.json({ 
      mensaje: 'Webhook procesado exitosamente',
      referencia_pago: referencia_pago,
      estado: estado 
    })

  } catch (error) {
    console.error('Error en el webhook:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}