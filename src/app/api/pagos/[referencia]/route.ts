import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
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

    const supabase = createClient()

    // Obtener información del pago con detalles del curso
    const { data: pago, error } = await supabase
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

    if (error || !pago) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el usuario sea el propietario del pago
    if (pago.inscripciones.alumno_id !== user.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para ver este pago' },
        { status: 403 }
      )
    }

    return NextResponse.json({ pago })

  } catch (error) {
    console.error('Error al obtener información del pago:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}