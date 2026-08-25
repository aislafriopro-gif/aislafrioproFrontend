import api from "@/lib/api";

export interface QuoteRequestItem {
  id: string;
  serviceName: string;
  message: string;
  status: string;
  createdAt: string;
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
};