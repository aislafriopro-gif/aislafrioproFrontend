export const MESSAGES = {
  loading: {
    default: "Cargando...",
    content: "Cargando contenido...",
    options: "Cargando opciones...",
  },
  success: {
    default: "La operación se realizó correctamente.",
    saved: "Los cambios se guardaron correctamente.",
  },
  error: {
    default: "Ha ocurrido un error.",
    network: "No se pudo conectar con el servidor.",
    tryAgain: "Inténtalo nuevamente.",
  },
  validation: {
    required: "Este campo es obligatorio.",
    invalidEmail: "Ingresa un correo electrónico válido.",
    invalidPhone: "Ingresa un número de teléfono válido.",
  },
  empty: {
    noResults: "No se encontraron resultados.",
  },
} as const;