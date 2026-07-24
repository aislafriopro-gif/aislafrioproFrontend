import { create } from 'zustand';

interface FilterState {
    searchTerm: string;
    setSearchTerm: (term: string) => void;

    filters: Record<string, any>;
    setFilter: (key: string, value: any) => void;
    removeFilter: (key: string) => void;
    resetFilters: () => void;

    sortBy: string | null;
    sortOrder: 'asc' | 'desc';
    setSorting: (sortBy: string, sortOrder?: 'asc' | 'desc') => void;

    resetAll: () => void;
    }

    export const useFilterStore = create<FilterState>((set) => ({
    searchTerm: '',
    setSearchTerm: (searchTerm) => set({ searchTerm }),

    filters: {},
    setFilter: (key, value) =>
        set((state) => ({
        filters: { ...state.filters, [key]: value },
        })),
    removeFilter: (key) =>
        set((state) => {
        const newFilters = { ...state.filters };
        delete newFilters[key];
        return { filters: newFilters };
        }),
    resetFilters: () => set({ filters: {} }),

    sortBy: null,
    sortOrder: 'asc',
    setSorting: (sortBy, sortOrder = 'asc') => set({ sortBy, sortOrder }),

    resetAll: () =>
        set({
        searchTerm: '',
        filters: {},
        sortBy: null,
        sortOrder: 'asc',
        }),
    }));