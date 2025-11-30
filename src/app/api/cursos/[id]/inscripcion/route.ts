import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión para inscribirte en un curso' },
        { status: 401 }
      )
    }

    if (user.role !== 'alumno' && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Solo los estudiantes pueden inscribirse en cursos' },
        { status: 403 }
      )
    }

    const { metodo_pago } = await request.json()
    
    if (!metodo_pago || !['pse', 'tarjeta'].includes(metodo_pago)) {
      return NextResponse.json(
        { error: 'Método de pago inválido' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Verificar que el curso existe y está activo
    const { data: curso, error: cursoError } = await supabase
      .from('cursos')
      .select('*')
      .eq('id', params.id)
      .eq('estado', 'activo')
      .single()

    if (cursoError || !curso) {
      return NextResponse.json(
        { error: 'Curso no encontrado o no disponible' },
        { status: 404 }
      )
    }

    // Verificar que el estudiante no esté ya inscrito
    const { data: inscripcionExistente } = await supabase
      .from('inscripciones')
      .select('*')
      .eq('alumno_id', user.id)
      .eq('curso_id', params.id)
      .single()

    if (inscripcionExistente) {
      return NextResponse.json(
        { error: 'Ya estás inscrito en este curso' },
        { status: 400 }
      )
    }

    // Verificar cupo disponible
    const { count: inscripcionesActivas } = await supabase
      .from('inscripciones')
      .select('*', { count: 'exact', head: true })
      .eq('curso_id', params.id)
      .eq('estado', 'pagado')

    if (inscripcionesActivas && inscripcionesActivas >= curso.cupo_maximo) {
      return NextResponse.json(
        { error: 'El curso está lleno' },
        { status: 400 }
      )
    }

    // Crear inscripción con estado "reservado"
    const { data: inscripcion, error: inscripcionError } = await supabase
      .from('inscripciones')
      .insert({
        alumno_id: user.id,
        curso_id: params.id,
        estado: 'reservado',
        fecha_inscripcion: new Date().toISOString(),
      })
      .select()
      .single()

    if (inscripcionError) {
      return NextResponse.json(
        { error: 'Error al crear la inscripción' },
        { status: 500 }
      )
    }

    // Generar referencia de pago única
    const referenciaPago = `ML${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase()

    // Crear registro de pago
    const { data: pago, error: pagoError } = await supabase
      .from('pagos')
      .insert({
        inscripcion_id: inscripcion.id,
        referencia_pago: referenciaPago,
        monto: curso.precio,
        metodo_pago: metodo_pago,
        estado: 'pendiente',
        fecha_creacion: new Date().toISOString(),
        fecha_vencimiento: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      })
      .select()
      .single()

    if (pagoError) {
      // Si hay error con el pago, eliminar la inscripción
      await supabase.from('inscripciones').delete().eq('id', inscripcion.id)
      return NextResponse.json(
        { error: 'Error al crear el pago' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      mensaje: 'Inscripción creada exitosamente',
      referencia_pago: referenciaPago,
      inscripcion_id: inscripcion.id,
      pago_id: pago.id,
    })

  } catch (error) {
    console.error('Error en la inscripción:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}