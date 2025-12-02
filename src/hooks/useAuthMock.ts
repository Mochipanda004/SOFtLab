import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await delay(1000)
  if (payload.email !== 'test@example.com') {
    throw new Error('Credenciales inválidas')
  }
  return {
    token: 'mock-jwt-token-login',
    user: {
      id: 'user-001',
      full_name: 'Usuario de Prueba',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop',
    },
  }
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await delay(2000)
  return {
    token: 'mock-jwt-token-register',
    user: {
      id: 'user-' + Math.random().toString(36).slice(2, 8),
      full_name: payload.full_name,
      role: payload.role,
      avatar_url: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop',
    },
  }
}
