import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    
    login: (user: User, token: string) => void;
    logout: () => void;
    updateSession: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: (user, token) => {
            document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
            set({
                user,
                token,
                isAuthenticated: true,
            });
        },

        logout: () => {
            document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });
        },

        updateSession: (updatedUser) => {
            set((state) => ({
            user: state.user ? { ...state.user, ...updatedUser } : null,
            }));
        },
        }),
        {
        name: 'auth-storage',
        }
    )
);