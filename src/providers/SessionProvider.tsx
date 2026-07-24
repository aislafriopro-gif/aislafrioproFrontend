'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store';

export function SessionProvider({ children }: { children: ReactNode }) {
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        // Lógica opcional para verificar sesión o refrescar token al cargar la app
        if (token) {
            // Validar token con el backend si es necesario
        }
    }, [token]);

    return <>{children}</>;
}