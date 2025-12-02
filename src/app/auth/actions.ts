'use server'

import { createClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getDashboardPath } from '@/lib/auth'

export async function login(formData: FormData) {
  try {
    const supabase = createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      // Mapear errores de Supabase a español
      let errorMessage = 'Error al iniciar sesión'
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Correo electrónico o contraseña incorrectos'
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'El correo electrónico no ha sido confirmado. Por favor, revisa tu bandeja de entrada.'
      } else if (error.message.includes('invalid')) {
        errorMessage = 'Correo electrónico inválido'
      }
      
      return { error: errorMessage }
    }
    
    const { data: profile } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('usuario_id', data.user.id)
      .single()
      
    if (profile?.rol) {
      const dashboardPath = getDashboardPath(profile.rol)
      revalidatePath('/', 'layout')
      return { redirectTo: dashboardPath }
    }
    
    revalidatePath('/', 'layout')
    return { redirectTo: '/' }
  } catch (error) {
    console.error('Error en login:', error)
    return { error: 'Error al iniciar sesión' }
 }
}

export async function signup(formData: FormData) {
  try {
    const supabase = createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string || 'estudiante'
    const habeasData = formData.get('habeasData') === 'on'

    if (!habeasData) {
      return { error: 'Debes aceptar el tratamiento de datos personales' }
    }

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        }
      }
    })
    
    if (error) {
      // Mapear errores de Supabase a español
      let errorMessage = 'Error al crear cuenta'
      
      if (error.message.includes('User already registered')) {
        errorMessage = 'Este correo electrónico ya está registrado'
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres'
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Correo electrónico inválido'
      } else if (error.message.includes('weak')) {
        errorMessage = 'La contraseña es muy débil. Usa una contraseña más segura.'
      }
      
      return { error: errorMessage }
    }
    
    // El trigger handle_new_user ya creó el perfil automáticamente
    // No necesitamos insertar manualmente en perfiles
    revalidatePath('/', 'layout')
    return { redirectTo: '/login?message=Cuenta creada exitosamente. Por favor inicia sesión.' }
  } catch (error) {
    console.error('Error en signup:', error)
    return { error: 'Error al crear cuenta' }
  }
}

export async function logout() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/', 'layout')
    redirect('/')
  } catch (error) {
    console.error('Error en logout:', error)
    redirect('/')
  }
}