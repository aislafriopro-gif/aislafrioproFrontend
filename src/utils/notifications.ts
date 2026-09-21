// src/utils/notifications.ts

import Swal from 'sweetalert2';

export const notifications = {
  // Alerta de éxito (Toast o Modal corto)
  showSuccess: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  },

  // Alerta de error
  showError: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2563eb', // Color azul corporativo por ejemplo
    });
  },

  // Modal de confirmación (para borrados o acciones críticas)
  showConfirm: async (title: string, text: string, confirmButtonText = 'Sí, eliminar') => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626', // Rojo para peligro/eliminación
      cancelButtonColor: '#6b7280',  // Gris para cancelar
      confirmButtonText,
      cancelButtonText: 'Cancelar',
    });
    return result.isConfirmed;
  },
};