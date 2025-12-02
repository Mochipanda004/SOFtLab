import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && anon ? createSupabaseClient(url, anon) : null
})()

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  return createSupabaseClient(url, anon)
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'alumno' | 'profesor' | 'admin'
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'alumno' | 'profesor' | 'admin'
          avatar_url?: string | null
          phone?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          role?: 'alumno' | 'profesor' | 'admin'
          avatar_url?: string | null
          phone?: string | null
          updated_at?: string
        }
      }
      cursos: {
        Row: {
          id: string
          titulo: string
          descripcion: string
          categoria: string
          nivel: 'basico' | 'intermedio' | 'avanzado'
          modalidad: 'presencial' | 'virtual' | 'hibrido'
          precio: number
          duracion_meses: number
          cupo_maximo: number
          imagen_url: string | null
          estado: 'activo' | 'inactivo'
          created_at: string
          updated_at: string
        }
        Insert: {
          titulo: string
          descripcion: string
          categoria: string
          nivel: 'basico' | 'intermedio' | 'avanzado'
          modalidad: 'presencial' | 'virtual' | 'hibrido'
          precio: number
          duracion_meses: number
          cupo_maximo: number
          imagen_url?: string | null
          estado?: 'activo' | 'inactivo'
        }
        Update: {
          titulo?: string
          descripcion?: string
          categoria?: string
          nivel?: 'basico' | 'intermedio' | 'avanzado'
          modalidad?: 'presencial' | 'virtual' | 'hibrido'
          precio?: number
          duracion_meses?: number
          cupo_maximo?: number
          imagen_url?: string | null
          estado?: 'activo' | 'inactivo'
          updated_at?: string
        }
      }
      inscripciones: {
        Row: {
          id: string
          alumno_id: string
          curso_id: string
          estado: 'reservado' | 'pagado' | 'cancelado'
          fecha_reserva: string
          fecha_pago: string | null
          fecha_expiracion: string | null
          created_at: string
        }
        Insert: {
          alumno_id: string
          curso_id: string
          estado?: 'reservado' | 'pagado' | 'cancelado'
          fecha_reserva?: string
          fecha_pago?: string | null
          fecha_expiracion?: string | null
        }
        Update: {
          estado?: 'reservado' | 'pagado' | 'cancelado'
          fecha_pago?: string | null
          fecha_expiracion?: string | null
        }
      }
      pagos: {
        Row: {
          id: string
          inscripcion_id: string
          referencia_pago: string
          monto: number
          estado: 'pendiente' | 'aprobado' | 'rechazado'
          metodo_pago: 'pse'
          respuesta_pse: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          inscripcion_id: string
          referencia_pago: string
          monto: number
          estado?: 'pendiente' | 'aprobado' | 'rechazado'
          metodo_pago?: 'pse'
          respuesta_pse?: any | null
        }
        Update: {
          estado?: 'pendiente' | 'aprobado' | 'rechazado'
          respuesta_pse?: any | null
          updated_at?: string
        }
      }
    }
  }
}