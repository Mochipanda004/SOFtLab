import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from '@/lib/auth'

// Rutas protegidas por rol
const protectedRoutes = {
  '/admin': ['admin'],
  '/profesor': ['profesor', 'admin'],
  '/estudiante': ['estudiante', 'admin'],
  '/dashboard': ['estudiante', 'profesor', 'admin']
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta requiere autenticación
  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      const authMiddleware = withAuth(allowedRoles as any[])
      const result = await authMiddleware(request)
      
      if (result) {
        return result
      }
      break
    }
  }

  // Proteger rutas de API
  if (pathname.startsWith('/api')) {
    const authMiddleware = withAuth()
    const result = await authMiddleware(request)
    
    if (result) {
      return result
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/profesor/:path*',
    '/estudiante/:path*',
    '/dashboard/:path*',
    '/api/:path*'
  ]
}