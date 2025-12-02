// Script para insertar datos de prueba en la base de datos
// Ejecutar con: npm run seed

import { createClient } from '@supabase/supabase-js'
import { USUARIOS_SEED, CURSOS_SEED, PREGUNTAS_FRECUENTES_SEED } from '../src/lib/seed-data'
import { Database } from '../src/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

async function seedUsers() {
  console.log('🌱 Insertando usuarios de prueba...')
  
  for (const usuario of USUARIOS_SEED) {
    try {
      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: usuario.email,
        password: usuario.password
      })

      if (authError) {
        console.error(`Error creando usuario ${usuario.email}:`, authError)
        continue
      }

      if (authData.user) {
        // Insertar datos adicionales en la tabla usuarios
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert({
            id: authData.user.id,
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            fecha_nacimiento: usuario.fecha_nacimiento,
            rol: usuario.rol as any,
            activo: true
          })

        if (profileError) {
          console.error(`Error insertando perfil de ${usuario.email}:`, profileError)
        } else {
          console.log(`✅ Usuario creado: ${usuario.email} (${usuario.rol})`)
        }
      }
    } catch (error) {
      console.error(`Error procesando usuario ${usuario.email}:`, error)
    }
  }
}

async function seedCourses() {
  console.log('🌱 Insertando cursos de prueba...')
  
  for (const curso of CURSOS_SEED) {
    try {
      // Obtener el ID del profesor
      const { data: profesorData } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', curso.profesor_email)
        .single()

      if (!profesorData) {
        console.error(`Profesor no encontrado: ${curso.profesor_email}`)
        continue
      }

      const { error } = await supabase
        .from('cursos')
        .insert({
          titulo: curso.titulo,
          descripcion: curso.descripcion,
          instrumento: curso.instrumento,
          nivel: curso.nivel as any,
          duracion_semanas: curso.duracion_semanas,
          precio: curso.precio,
          cupo_maximo: curso.cupo_maximo,
          fecha_inicio: curso.fecha_inicio,
          horario: curso.horario,
          profesor_id: profesorData.id,
          imagen_url: curso.imagen_url,
          activo: curso.activo
        })

      if (error) {
        console.error(`Error insertando curso ${curso.titulo}:`, error)
      } else {
        console.log(`✅ Curso creado: ${curso.titulo}`)
      }
    } catch (error) {
      console.error(`Error procesando curso ${curso.titulo}:`, error)
    }
  }
}

async function seedFAQs() {
  console.log('🌱 Insertando preguntas frecuentes...')
  
  for (const faq of PREGUNTAS_FRECUENTES_SEED) {
    try {
      const { error } = await supabase
        .from('preguntas_frecuentes')
        .insert({
          pregunta: faq.pregunta,
          respuesta: faq.respuesta,
          categoria: faq.categoria,
          activa: faq.activa
        })

      if (error) {
        console.error(`Error insertando FAQ: ${faq.pregunta}:`, error)
      } else {
        console.log(`✅ FAQ creada: ${faq.pregunta}`)
      }
    } catch (error) {
      console.error(`Error procesando FAQ: ${faq.pregunta}:`, error)
    }
  }
}

async function fixAdmin() {
  console.log('🛠️ Verificando/ajustando admin')
  const adminEmail = 'elkinrojasortiz07@gmail.com'
  const desiredPassword = 'AdminMelody2024!'
  try {
    const { data: usersData } = await supabase.auth.admin.listUsers()
    const existing = (usersData?.users ?? []).find(u => u.email === adminEmail)

    if (!existing) {
      console.log('Admin no existe, creando...')
      const { data: created, error } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: desiredPassword,
        email_confirm: true,
        user_metadata: { nombre: 'Administrador', apellido: 'Melody Labs', rol: 'admin' }
      })
      if (error) {
        console.error('Error creando admin:', error)
      } else {
        console.log('Admin creado:', created.user?.id)
      }
    } else {
      console.log('Admin existe, actualizando contraseña y confirmación...')
      const { error: updErr } = await supabase.auth.admin.updateUserById(existing.id, {
        password: desiredPassword,
        email_confirm: true,
        user_metadata: { rol: 'admin' }
      } as any)
      if (updErr) {
        console.error('Error actualizando admin:', updErr)
      } else {
        console.log('Admin actualizado')
      }
    }

    // Asegurar perfil con rol admin
    const targetUserId = existing?.id
    const { data: perfiles } = await supabase
      .from('perfiles')
      .select('id, usuario_id, rol')
      .eq('email', adminEmail)
    if (!perfiles || perfiles.length === 0) {
      console.log('Creando perfil admin manualmente...')
      const uid = targetUserId ?? (await supabase.auth.admin.listUsers()).data?.users?.find(u => u.email === adminEmail)?.id
      if (uid) {
        const { error: insErr } = await supabase
          .from('perfiles')
          .insert({ usuario_id: uid, email: adminEmail, nombre: 'Administrador', apellido: 'Melody Labs', rol: 'admin' } as any)
        if (insErr) console.error('Error creando perfil:', insErr)
      }
    } else if (perfiles[0].rol !== 'admin') {
      const { error: upErr } = await supabase
        .from('perfiles')
        .update({ rol: 'admin' })
        .eq('id', perfiles[0].id)
      if (upErr) console.error('Error actualizando rol del perfil:', upErr)
    }
  } catch (e) {
    console.error('Excepción en fixAdmin:', e)
  }
}

async function diagnose() {
  console.log('🔎 Diagnóstico de autenticación y perfiles')
  try {
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers()
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
    const { data: perfiles, error: perfilesError } = await supabase
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
    const { data: adminPerfiles, error: adminError } = await supabase
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Error al iniciar sesión:', error)
    } else {
      console.log('Login exitoso:', data?.user?.id)
    }
  } catch (e) {
    console.error('Excepción en login:', e)
  }
}

async function main() {
  console.log('🚀 Iniciando proceso de seed...')
  
  try {
    await seedUsers()
    await seedCourses()
    await seedFAQs()
    await fixAdmin()
    await diagnose()
    
    console.log('✅ Seed completado exitosamente!')
    console.log('📋 Datos de prueba:')
    console.log('   Admin: admin@melodylabs.com / Admin123!')
    console.log('   Profesor: profesor.guitarra@melodylabs.com / Profesor123!')
    console.log('   Estudiante: estudiante1@ejemplo.com / Estudiante123!')
  } catch (error) {
    console.error('❌ Error en el proceso de seed:', error)
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  main().then(() => {
    process.exit(0)
  }).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}