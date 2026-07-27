'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function SessionProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
    }
    }, [token]);

    return <>{children}</>;
}