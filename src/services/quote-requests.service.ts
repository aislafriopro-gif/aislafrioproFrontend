import api from "@/lib/api";

    export interface QuoteRequestNote {
    id?: string;
    note?: string;
    content?: string;
    createdAt?: string;
    author?: string;
    [key: string]: unknown;
    }

export interface QuoteRequest {
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    name?: string;
    email?: string;
    phone?: string;
    materials?: string;
    message?: string;
    notes?: (string | QuoteRequestNote)[];
}

    export const quoteRequestsService = {
    getAll: async (): Promise<QuoteRequest[]> => {
        const { data } = await api.get<QuoteRequest[]>("/quote-requests");
        return data;
    },

    getById: async (id: string): Promise<QuoteRequest> => {
        const { data } = await api.get<QuoteRequest>(`/quote-requests/${id}`);
        return data;
    },

    updateStatus: async ({ id, status }: { id: string; status: string }): Promise<QuoteRequest> => {
    const { data } = await api.patch<QuoteRequest>(`/quote-requests/${id}/status`, { status });
    return data;
},

    addNote: async ({ id, note }: { id: string; note: string }): Promise<QuoteRequest> => {
    const { data } = await api.post<QuoteRequest>(`/quote-requests/${id}/notes`, { content: note });
    return data;
},
    };