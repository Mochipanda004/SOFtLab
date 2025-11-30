# Academia Melody Labs 🎵

Plataforma educativa musical completa con autenticación, gestión de cursos, pagos PSE y chatbot inteligente.

## 🚀 Características

- **Autenticación completa** con roles (Admin, Profesor, Estudiante)
- **Dashboard específico** para cada tipo de usuario
- **Sistema de cursos** con inscripción y gestión
- **Pagos PSE** integrados para Colombia
- **Chatbot inteligente** con FAQ dinámica
- **Accesibilidad WCAG 2.1 A**
- **Responsive design** para todos los dispositivos
- **TypeScript** para type safety completo

## 📋 Requisitos Previos

- Node.js 18+
- Supabase account
- Git

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd melody-labs
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Luego completa las variables en `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
   ```

4. **Configurar base de datos**
   - Sube el archivo SQL de migración en `supabase/migrations/`
   - O ejecuta las migraciones desde Supabase Dashboard

5. **Insertar datos de prueba**
   ```bash
   npm run seed
   ```

6. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 👥 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@melodylabs.com | Admin123! |
| Profesor | profesor.guitarra@melodylabs.com | Profesor123! |
| Estudiante | estudiante1@ejemplo.com | Estudiante123! |

## 🧪 Testing del Sistema

### Flujo Completo de Estudiante

1. **Registro**
   - Ve a la página de inicio
   - Haz clic en "Registrarse"
   - Completa el formulario con datos válidos
   - Acepta términos y condiciones (Habeas Data)
   - Verifica que se redirige al dashboard de estudiante

2. **Exploración de Cursos**
   - Desde el dashboard, haz clic en "Ver todos los cursos"
   - Explora los cursos disponibles
   - Usa el buscador para filtrar por instrumento
   - Haz clic en "Ver detalles" de un curso

3. **Inscripción a Curso**
   - En la página del curso, haz clic en "Inscribirse"
   - Revisa el resumen de la inscripción
   - Selecciona método de pago (PSE)
   - Completa el formulario de pago
   - Verifica que el pago se procesa exitosamente

4. **Gestión de Cursos**
   - Ve a "Mis Cursos" desde el dashboard
   - Verifica que el curso aparece con estado "Activo"
   - Haz clic en el curso para ver detalles
   - Verifica el progreso y próximas clases

### Flujo de Pago PSE

1. **Iniciar Pago**
   - Durante la inscripción, selecciona PSE como método de pago
   - Completa el formulario con:
     - Tipo de persona: Natural
     - Tipo de documento: CC
     - Número de documento: 123456789
     - Nombre: Juan Pérez
     - Email: juan@ejemplo.com
     - Banco: BANCOLOMBIA

2. **Simulación de Pago**
   - El sistema simula un pago exitoso (90% probabilidad)
   - Si falla, puedes reintentar
   - Verifica que se actualiza el estado del pago

### Chatbot FAQ

1. **Activar Chatbot**
   - Haz clic en el ícono de chat flotante
   - El chatbot te saludará automáticamente

2. **Hacer Preguntas**
   - Prueba preguntas como:
     - "¿Cuáles son los precios?"
     - "¿Necesito traer mi propio instrumento?"
     - "¿Qué métodos de pago aceptan?"
     - "¿Puedo tomar una clase de prueba?"

3. **Contexto Inteligente**
   - El chatbot recuerda el contexto de la conversación
   - Puedes hacer preguntas de seguimiento
   - El chatbot busca en la base de datos de FAQs

### Dashboard de Profesor

1. **Login como Profesor**
   - Usa: profesor.guitarra@melodylabs.com / Profesor123!
   - Verifica que ves el dashboard de profesor

2. **Gestión de Estudiantes**
   - Ve "Mis Estudiantes"
   - Verifica que ves los estudiantes de tus cursos
   - Actualiza el progreso de algún estudiante

3. **Calendario de Clases**
   - Revisa el calendario con tus clases programadas
   - Verifica las próximas clases

### Dashboard de Admin

1. **Login como Admin**
   - Usa: admin@melodylabs.com / Admin123!
   - Verifica que ves el dashboard de administrador

2. **Gestión de Usuarios**
   - Ve a "Gestión de Usuarios"
   - Crea un nuevo usuario
   - Edita un usuario existente
   - Cambia roles de usuarios

3. **Gestión de Cursos**
   - Ve a "Gestión de Cursos"
   - Crea un nuevo curso
   - Edita un curso existente
   - Asigna/desasigna profesores

4. **Reportes**
   - Revisa estadísticas generales
   - Ver reportes financieros
   - Exporta datos en Excel

## 🔍 Accesibilidad

El sitio cumple con WCAG 2.1 Nivel A:

- **Navegación por teclado**: Todos los elementos interactivos son accesibles por teclado
- **Contraste de colores**: Ratio mínimo 4.5:1 para texto normal
- **Textos alternativos**: Imágenes tienen descripciones apropiadas
- **Etiquetas ARIA**: Elementos tienen roles y etiquetas apropiadas
- **Saltar navegación**: Enlace para saltar al contenido principal
- **Idioma**: Correctamente definido como español

## 📱 Responsive Design

- **Mobile**: Diseño optimizado para pantallas pequeñas
- **Tablet**: Layout adaptado para tablets
- **Desktop**: Experiencia completa en escritorio
- **Breakpoints**: Tailwind CSS con breakpoints estándar

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: Simulación de PSE
- **Chatbot**: API propia con FAQ dinámica

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio**
   ```bash
   vercel
   ```

2. **Configurar variables de entorno** en Vercel Dashboard

3. **Deploy automático** con cada push a main

### Otros servicios

- **Netlify**: Compatible con Next.js
- **Railway**: Soporte completo para Next.js
- **Digital Ocean**: App Platform

## 🔒 Seguridad

- **Autenticación**: JWT tokens con Supabase
- **Autorización**: RBAC con roles específicos
- **Validación**: Zod para validación de formularios
- **Sanitización**: Inputs sanitizados antes de guardar
- **HTTPS**: Recomendado para producción

## 📞 Soporte

Para soporte técnico:
- Email: soporte@melodylabs.com
- Chat: Usa el chatbot en la plataforma
- Documentación: Este archivo README

## 📄 Licencia

Este proyecto es propiedad de Academia Melody Labs. Todos los derechos reservados.

---

**¡Gracias por usar Academia Melody Labs! 🎵**