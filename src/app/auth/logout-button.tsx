'use client'

import { logout } from '@/app/auth/actions'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="w-full text-left">
        Cerrar Sesión
      </button>
    </form>
  )
}