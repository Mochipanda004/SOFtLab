import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export type Role = 'estudiante' | 'profesor' | 'admin'

export interface User {
  id: string
  email: string
  nombre: string
  apellido: string
  rol: Role
  telefono?: string
  fecha_nacimiento?: string
  created_at: string
  updated_at: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createClient()
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authUser) {
      return null
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('perfiles')
      .select('*')
      .eq('usuario_id', authUser.id)
      .single()
      
    if (profileError || !profile) {
      return null
    }
    
    return profile as User
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function requireRole(allowedRoles: Role[]) {
  return async (request: NextRequest) => {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!allowedRoles.includes(user.rol)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return null
  }
}

export function withAuth(allowedRoles: Role[] = ['alumno', 'profesor', 'admin']) {
  return async (request: NextRequest) => {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!allowedRoles.includes(user.rol)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // Add user to request headers for use in components
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user', JSON.stringify(user))
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
}

export function getDashboardPath(role: Role): string {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'profesor':
      return '/profesor'
    case 'estudiante':
      return '/estudiante'
    default:
      return '/'
  }
}