import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { referencia: string } }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión' },
        { status: 401 }
      )
    }

    const datosPago = await request.json()

    // Validar datos requeridos
    const camposRequeridos = [
      'tipo_persona', 'tipo_documento', 'numero_documento', 
      'nombre', 'apellido', 'email', 'telefono', 'banco'
    ]
    
    for (const campo of camposRequeridos) {
      if (!datosPago[campo]) {
        return NextResponse.json(
          { error: `El campo ${campo} es requerido` },
          { status: 400 }
        )
      }
    }

    const supabase = createClient()

    // Obtener información del pago
    const { data: pago, error: pagoError } = await supabase
      .from('pagos')
      .select(`
        *,
        inscripciones!inner(
          *,
          cursos!inner(*)
        )
      `)
      .eq('referencia_pago', params.referencia)
      .single()

    if (pagoError || !pago) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el usuario sea el propietario
    if (pago.inscripciones.alumno_id !== user.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para procesar este pago' },
        { status: 403 }
      )
    }

    // Verificar que el pago esté pendiente
    if (pago.estado !== 'pendiente') {
      return NextResponse.json(
        { error: 'Este pago ya fue procesado' },
        { status: 400 }
      )
    }

    // Verificar que no haya expirado
    if (new Date(pago.fecha_vencimiento) < new Date()) {
      return NextResponse.json(
        { error: 'Este pago ha expirado' },
        { status: 400 }
      )
    }

    // Simular proceso de pago con PSE (en producción, aquí se integraría con la pasarela real)
    const pagoExitoso = Math.random() > 0.1 // 90% de éxito para simulación

    if (pagoExitoso) {
      // Actualizar el estado del pago
      const { error: updateError } = await supabase
        .from('pagos')
        .update({
          estado: 'aprobado',
          fecha_pago: new Date().toISOString(),
          datos_pago: datosPago,
          fecha_actualizacion: new Date().toISOString(),
        })
        .eq('id', pago.id)

      if (updateError) {
        return NextResponse.json(
          { error: 'Error al actualizar el pago' },
          { status: 500 }
        )
      }

      // Actualizar el estado de la inscripción
      const { error: inscripcionError } = await supabase
        .from('inscripciones')
        .update({
          estado: 'pagado',
          fecha_actualizacion: new Date().toISOString(),
        })
        .eq('id', pago.inscripcion_id)

      if (inscripcionError) {
        return NextResponse.json(
          { error: 'Error al actualizar la inscripción' },
          { status: 500 }
        )
      }

      // Enviar notificación por email (en producción)
      // await enviarEmailConfirmacion(user.email, pago)

      return NextResponse.json({
        mensaje: 'Pago procesado exitosamente',
        estado: 'aprobado',
        referencia_pago: params.referencia,
      })

    } else {
      // Pago rechazado
      const { error: updateError } = await supabase
        .from('pagos')
        .update({
          estado: 'rechazado',
          fecha_actualizacion: new Date().toISOString(),
        })
        .eq('id', pago.id)

      if (updateError) {
        return NextResponse.json(
          { error: 'Error al actualizar el pago' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        mensaje: 'Pago rechazado por el banco',
        estado: 'rechazado',
        referencia_pago: params.referencia,
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error al procesar el pago:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}