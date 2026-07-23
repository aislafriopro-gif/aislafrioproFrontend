import { create } from 'zustand';

export interface Notification {
    id: string;
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;

    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    modalContent: React.ReactNode | null;
    isModalOpen: boolean;
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;

    notifications: Notification[];
    addNotification: (message: string, type?: Notification['type']) => void;
    removeNotification: (id: string) => void;
    }

    export const useUIStore = create<UIState>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),

    modalContent: null,
    isModalOpen: false,
    openModal: (content) => set({ modalContent: content, isModalOpen: true }),
    closeModal: () => set({ modalContent: null, isModalOpen: false }),

    notifications: [],
    addNotification: (message, type = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
        notifications: [...state.notifications, { id, message, type }],
        }));

        setTimeout(() => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
        }, 4000);
    },
    removeNotification: (id) =>
        set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }));