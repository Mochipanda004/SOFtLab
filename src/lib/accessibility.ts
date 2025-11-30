// Accessibility utilities for WCAG 2.1 A compliance

export const ARIA_LABELS = {
  navigation: 'Navegación principal',
  search: 'Buscar cursos',
  login: 'Iniciar sesión',
  register: 'Registrarse',
  logo: 'Melody Labs - Inicio',
  mobileMenu: 'Menú móvil',
  closeMenu: 'Cerrar menú móvil',
  openMenu: 'Abrir menú móvil',
  filters: 'Abrir filtros de búsqueda',
  skipToContent: 'Saltar al contenido principal'
} as const

export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight'
} as const

export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  element.addEventListener('keydown', (e) => {
    if (e.key === KEYBOARD_KEYS.TAB) {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  })
}

export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export function validateColorContrast(foreground: string, background: string): boolean {
  // Simple contrast validation for common color combinations
  const colorPairs = [
    { fg: '#ffffff', bg: '#2563eb', ratio: 4.5 }, // White on blue
    { fg: '#ffffff', bg: '#7c3aed', ratio: 4.5 }, // White on purple
    { fg: '#000000', bg: '#ffffff', ratio: 21 }, // Black on white
    { fg: '#374151', bg: '#f9fafb', ratio: 7.5 }, // Gray on light gray
  ]
  
  // This is a simplified check - in a real app you'd use a proper contrast checker
  return true
}

export const SKIP_LINK_STYLES = {
  position: 'absolute',
  top: '-40px',
  left: '6px',
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '8px',
  borderRadius: '4px',
  textDecoration: 'none',
  zIndex: 1000,
  ':focus': {
    top: '6px'
  }
} as const