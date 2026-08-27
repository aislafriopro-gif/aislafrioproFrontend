import api from "@/lib/api";

export interface IQuotesByStatus {
  NEW: number;
  IN_PROGRESS: number;
  RESOLVED: number;
  REJECTED: number;
}

export interface IWorkOrdersByStatus {
  PENDING: number;
  IN_PROGRESS: number;
  COMPLETED: number;
}

export interface IDashboardStats {
  totalQuotes: number;
  totalWorkOrders: number;
  totalProjects: number;
  totalProducts: number;
  quotesByStatus: IQuotesByStatus;
  workOrdersByStatus: IWorkOrdersByStatus;
}

export const dashboardService = {
  async getStats(): Promise<IDashboardStats> {
    const response = await api.get<IDashboardStats>("/dashboard/stats");

    return response.data;
  },
};