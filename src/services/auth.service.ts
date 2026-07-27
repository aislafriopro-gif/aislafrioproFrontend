    /* eslint-disable @typescript-eslint/no-unused-vars */
    import { api } from '@/services/api';

    export interface LoginCredentials {
    email: string;
    password: string;
    }

    export interface AuthResponse {
    token: string;
    refreshToken?: string;
    user: {
        id: string;
        name: string;
        email: string;
        role?: string;
    };
    }

    export async function login(_credentials: LoginCredentials): Promise<AuthResponse> {
    throw new Error('Not implemented');
    }

    export async function logout(): Promise<void> {
    throw new Error('Not implemented');
    }

    export async function refreshToken(): Promise<AuthResponse> {
    throw new Error('Not implemented');
    }