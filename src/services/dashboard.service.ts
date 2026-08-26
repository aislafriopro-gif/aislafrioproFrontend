import api from "@/lib/api";

export const dashboardService = {
  async getStats(): Promise<unknown> {
    const response = await api.get("/dashboard/stats");

    return response.data;
  },
};