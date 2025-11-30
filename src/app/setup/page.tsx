import { createDefaultAdmin, checkAdminExists } from '@/lib/admin-setup'
import { redirect } from 'next/navigation'

async function createAdmin() {
  'use server'
  
  const result = await createDefaultAdmin()
  
  if (result.success) {
    // Guardar el email usado en una cookie temporal para mostrarlo en el login
    const email = result.email || 'elkinrojasortiz07@gmail.com'
    redirect(`/login?admin_created=true&email=${encodeURIComponent(email)}`)
  } else {
    // En caso de error, redirigimos de vuelta con un mensaje
    redirect('/setup?error=' + encodeURIComponent(result.error || 'Error al crear administrador'))
  }
}

export default async function SetupPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>
}) {
  // Unwrap the searchParams promise
  const params = await searchParams
  
  // Verificar si ya existe un administrador
  const adminExists = await checkAdminExists()
  
  if (adminExists) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuración Inicial</h1>
          <p className="text-gray-600">Bienvenido a Melody Labs. Vamos a crear el primer administrador del sistema.</p>
        </div>

        <form action={createAdmin} className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Datos del Administrador</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Email:</strong> elkinrojasortiz07@gmail.com</p>
              <p><strong>Contraseña temporal:</strong> AdminMelody2024!</p>
            </div>
            <p className="text-xs text-blue-600 mt-3">
              ⚠️ Por seguridad, deberás cambiar la contraseña después del primer inicio de sesión.
            </p>
          </div>

          {params.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{decodeURIComponent(params.error)}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Crear Administrador
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Este paso solo se realiza una vez. Después podrás crear más usuarios desde el panel de administración.
          </p>
        </div>
      </div>
    </div>
  )
}