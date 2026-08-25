import { api } from "@/lib/api";

export interface IWorkOrder {
    id: string;
    title: string;
    description?: string;
    status: string;
    clientId?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
}

export const workOrdersService = {
    async getAll(): Promise<IWorkOrder[]> {
    return api.get("/api/v1/work-orders");
    },

    async getById(id: string): Promise<IWorkOrder> {
    return api.get(`/api/v1/work-orders/${id}`);
    },

    async getMyWorkOrders(): Promise<IWorkOrder[]> {
    return api.get("/api/v1/work-orders/my-orders");
    },

    async create(data: Partial<IWorkOrder>): Promise<IWorkOrder> {
    return api.post("/api/v1/work-orders", data);
    },

    async update(id: string, data: Partial<IWorkOrder>): Promise<IWorkOrder> {
    return api.patch(`/api/v1/work-orders/${id}`, data);
    },

    async updateStatus(id: string, status: string): Promise<IWorkOrder> {
    return api.patch(`/api/v1/work-orders/${id}/status`, { status });
    },
};