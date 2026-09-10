import api from "@/lib/api";

export interface QuoteRequestItem {
  id: string;
  serviceName: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface IClient {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    [key: string]: unknown;
}

export interface ClientMeResponse {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  quoteRequests: QuoteRequestItem[];
  workOrders?: unknown[];
}

export const clientsService = {
  getMe: async (): Promise<ClientMeResponse> => {
    const { data } = await api.get<ClientMeResponse>("/clients/me");
    return data;
  },

  async getAll(): Promise<IClient[]> {
    const { data } = await api.get("/clients");
    return Array.isArray(data) ? data : data.data || data.clients || [];
  },

  async updateClient(id: string, payload: Record<string, unknown>) {
    return api.patch(`/clients/${id}`, payload);
  },
};