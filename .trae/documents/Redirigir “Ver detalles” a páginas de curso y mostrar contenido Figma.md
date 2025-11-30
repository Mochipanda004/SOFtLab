## Objetivo
Hacer que el botón “Ver detalles” de cada tarjeta navegue a `/cursos/[id]` y que la página de detalle muestre contenido según los diseños de Figma (Guitarra Intermedia, Violín Avanzado, Batería Principiantes, Teoría Musical), incluso si no hay datos en Supabase.

## Cambios
1. Tarjetas de cursos (`src/components/course-card.tsx`):
   - Reemplazar el colapsable actual por navegación con `Link` a `/cursos/{id}`.
   - Mantener estilos y estados (agotado → deshabilitado).

2. Detalle del curso (`src/app/cursos/[id]/page.tsx`):
   - Añadir mapeo de "fallbacks" por `id` para los 4 cursos de Figma (precio, duración, horario, modalidad, cupos, descripción, aprendizajes, programa, profesor).
   - Si Supabase no devuelve datos, usar el fallback para renderizar toda la interfaz.
   - Conservar el diseño ya implementado (hero, badges, panel lateral, secciones) pero alimentar con datos del fallback cuando aplique.

## Verificación
- Navegar desde catálogo: clic en “Ver detalles” → `/cursos/2|3|4|5`.
- Ver que cada curso muestra contenido acorde al Figma (texto, precio, duración, horario, modalidad y cupos).
- Asegurar accesibilidad (aria-labels y semántica) y responsive.

¿Procedo con estos cambios para que el flujo de “Ver detalles” te lleve a las páginas con la información de Figma? 