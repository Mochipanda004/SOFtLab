# Módulos del Profesor

## Mi Horario
- Formularios para crear clases semanales (día, hora, duración, lugar), talleres y conciertos.
- Calendario semanal interactivo con filtro por tipo.
- Persistencia en `localStorage` bajo `teacher_activities`.

## Asistencia
- Registro de presente/ausente con campo de justificación.
- Guarda cada pase en `teacher_attendance` y muestra histórico.

## Calificaciones
- Control de progreso por estudiante (0–100) y comentarios evaluativos.
- Persistencia en `teacher_grades`.

## Tareas
- Crear/editar tareas con descripción, fecha límite, requisitos y asignación a grupo.
- Recordatorios automáticos para tareas que vencen en <3 días.
- Persistencia en `teacher_tasks`.

## Uso
- Navega a `/profesor/*` y usa las pestañas.
- Todos los formularios validan campos obligatorios y conservan el diseño existente.
