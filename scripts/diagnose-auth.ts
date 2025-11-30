import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function main() {
  if (!url || !anon || !service) {
    console.error('Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabaseAnon = createClient(url, anon)
  const supabaseService = createClient(url, service)

  console.log('--- Diagnóstico de autenticación y perfiles ---')

  try {
    const { data: usersData, error: usersError } = await supabaseService.auth.admin.listUsers()
    if (usersError) {
      console.error('Error listando usuarios (auth.users):', usersError)
    } else {
      console.log(`Total usuarios en auth.users: ${usersData?.users?.length ?? 0}`)
      console.log('Emails:', (usersData?.users ?? []).map(u => u.email))
    }
  } catch (e) {
    console.error('Excepción al listar usuarios:', e)
  }

  try {
    const { data: perfiles, error: perfilesError } = await supabaseService
      .from('perfiles')
      .select('id, usuario_id, email, rol')
    if (perfilesError) {
      console.error('Error consultando perfiles:', perfilesError)
    } else {
      console.log(`Total perfiles: ${perfiles?.length ?? 0}`)
      console.log('Primeros perfiles:', (perfiles ?? []).slice(0, 5))
    }
  } catch (e) {
    console.error('Excepción al consultar perfiles:', e)
  }

  try {
    const { data: adminPerfiles, error: adminError } = await supabaseService
      .from('perfiles')
      .select('id, usuario_id, email, rol')
      .eq('rol', 'admin')
    if (adminError) {
      console.error('Error buscando admin:', adminError)
    } else {
      console.log(`Admins encontrados: ${adminPerfiles?.length ?? 0}`)
      console.log(adminPerfiles)
    }
  } catch (e) {
    console.error('Excepción al buscar admin:', e)
  }

  try {
    const email = 'elkinrojasortiz07@gmail.com'
    const password = 'AdminMelody2024!'
    const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Error al iniciar sesión:', error)
    } else {
      console.log('Login exitoso:', data?.user?.id)
    }
  } catch (e) {
    console.error('Excepción en login:', e)
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })