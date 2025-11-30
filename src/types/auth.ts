export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  full_name: string
  role: 'student' | 'teacher'
  accepts_habeas_data: boolean
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    full_name: string
    role: string
    avatar_url: string
  }
}
