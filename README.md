# Academia Melody Labs 🎵

Plataforma educativa musical completa con autenticación, gestión de cursos, pagos PSE y chatbot inteligente.

## 🚀 Características

* **Autenticación completa** con roles (Admin, Profesor, Estudiante)
* **Dashboard específico** para cada tipo de usuario
* **Sistema de cursos** con inscripción y gestión
* **Pagos PSE** integrados para Colombia (Simulación)
* **Chatbot inteligente** con FAQ dinámica
* **Accesibilidad WCAG 2.1 A**
* **Responsive design** para todos los dispositivos
* **TypeScript** para type safety completo

---

## 🛠️ Stack Tecnológico

* **Frontend**: Next.js 15, React 19, TypeScript
* **Estilos**: Tailwind CSS
* **Backend**: Next.js API Routes
* **Base de Datos**: Supabase (PostgreSQL)
* **Autenticación**: Supabase Auth
* **Pagos**: Simulación de PSE

---

## 📋 Requisitos Previos

* Node.js 18+
* Supabase account
* Git

## 🔧 Instalación

1.  **Clonar el repositorio**
    ```bash
    git clone [https://github.com/Mochipanda004/SOFtLab](https://github.com/Mochipanda004/SOFtLab)
    cd melody-labs
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**
    Crea el archivo `.env.local` y complétalo con tus claves de Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
    SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
    ```

4.  **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```

---

## 👥 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@melodylabs.com | Admin123! |
| Profesor | profesor.guitarra@melodylabs.com | Profesor123! |
| Estudiante | estudiante1@ejemplo.com | Estudiante123! |

---

## 🧪 Flujo Clave de Testing (MVP)

### Flujo Completo de Estudiante

1.  **Registro y Login:** Registra un nuevo estudiante y accede.
2.  **Exploración:** Ve a "Catálogo de Cursos", usa el buscador y revisa los detalles.
3.  **Inscripción y Pago (Simulado):** Inscríbete a un curso y selecciona el método de pago **PSE**.
4.  **Gestión de Cursos:** Verifica que el curso aparezca en el dashboard de estudiante como "Activo".

### Dashboard de Admin

1.  **Login:** Usa las credenciales de Admin.
2.  **Gestión (CRUD):** Ve a "Gestión de Usuarios" y prueba crear, editar y cambiar el rol de un usuario.
3.  **Reportes:** Ve a "Reportes" y verifica las estadísticas de ejemplo.

---

## 🔒 Seguridad

* **Autenticación**: JWT tokens con Supabase
* **Autorización**: RBAC con roles específicos
* **Validación**: Zod para validación de formularios
* **Sanitización**: Inputs sanitizados antes de guardar

---

**¡Gracias por usar Academia Melody Labs! 🎵**