## Objetivo
Alinear la página `cursos/[id]/page.tsx` con el diseño de Figma para "Ver más detalles", manteniendo datos dinámicos de Supabase, accesibilidad y estilo con Tailwind.

## Estructura general
1. Encabezado de curso con imagen/hero, overlay oscuro y badges:
   - Badges: `Intermedio` (nivel), `Híbrido` (modalidad), rating `4.8 (127)` si existen datos.
   - Título grande: "Guitarra Intermedia"
   - Subtítulo: "Por Prof. Carlos Ramírez" (de `profiles.full_name`).
2. Diseño en 2 columnas (`lg:grid-cols-3`):
   - Izquierda (`lg:col-span-2`): contenido principal.
   - Derecha: tarjeta resumen con precio y atributos + CTA.

## Contenido principal (columna izquierda)
1. Acerca del curso
   - Texto descriptivo (`curso.descripcion`).
2. ¿Qué aprenderás?
   - Lista de 6 bullets con íconos (check) y textos; si existe `curso.aprendizajes` mostrar, si no, usar textos por defecto del Figma.
3. Programa del curso
   - Timeline enumerado (1–7) con título y "Duración: X semanas"; usar `clases` o estructura fija si no hay datos.
4. Requisitos
   - Mostrar `curso.requisitos` si existe; si no, lista predefinida del Figma.
5. Materiales incluidos
   - Mostrar `curso.materiales_incluidos` si existe; si no, lista predefinida (Libro, partituras, videos, backing tracks, software, comunidad).
6. Tu profesor
   - Avatar, nombre (`profiles.full_name`), bio corta si existe (`profiles.bio`), métricas (años de experiencia, estudiantes) si disponibles.
7. Reseñas de estudiantes
   - Resumen de rating (⭐ 4.8 / 127); si no existe tabla de reseñas, mostrar 2–3 reseñas estáticas de ejemplo.

## Panel lateral (columna derecha)
- Tarjeta con:
  - Precio `$520.000` (`curso.precio`).
  - Duración `4 meses` (derivado: `duracion_semanas / 4` ó texto fijo si meses está en schema).
  - Horario (mostrar `curso.horario` si existe).
  - Modalidad (`curso.modalidad`).
  - Cupos disponibles (`cupo_maximo - inscritos` usando conteo de `inscripciones`).
  - Certificación: flag `Incluida` si `curso.certificacion_incluida` o texto fijo.
  - Materiales: "6 recursos incluidos" (contar lista o valor fijo).
  - CTA "Inscribirse ahora" respetando estados (activo/inscrito/no disponible).

## Datos y consultas
- Extender la consulta actual para traer campos adicionales si existen: `horario`, `modalidad`, `requisitos`, `materiales_incluidos`, `certificacion_incluida`, `rating_promedio`, `rating_count`.
- Calcular `cupos_disponibles` con: `cupo_maximo - (select count(*) from inscripciones where curso_id = ...)`.
- Si hay tabla `reseñas`, traer últimas 3; si no, fallback estático.

## Estilos y componentes
- Mantener Tailwind y `Card`/`Badge` ya presentes; no crear componentes nuevos salvo necesidad.
- Usar íconos de `lucide-react`: `CheckCircle`, `Clock`, `Calendar`, `Users`, `Star`.
- Espaciados y bordes según Figma: cajas con `rounded-lg`, `border`, `bg-white`, `shadow-sm`, `p-6`, `space-y-4`.

## Accesibilidad
- Headings semánticos (`h1`, `h2` por sección).
- Texto alternativo en la imagen del hero.
- Botón de compartir con `aria-label`.
- CTA con `aria-disabled` cuando aplique.

## Implementación
1. Actualizar `src/app/cursos/[id]/page.tsx` añadiendo secciones y estilos descritos.
2. Ampliar `select` de Supabase y cálculos (cupos, rating).
3. Añadir fallbacks si faltan campos.
4. Mantener responsive y accesible.

## Entregable
- Página de detalle ajustada al Figma, lista y verificada en `http://localhost:3000/cursos/<id>`.

¿Procedo con la implementación directa en `page.tsx` siguiendo este plan?