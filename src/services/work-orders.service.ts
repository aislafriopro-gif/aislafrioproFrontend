import { api } from "@/lib/api";

export interface IWorkOrder {
    id: string;
    title?: string;
    description?: string;
    client?: string;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    clientId?: string;
    technicianId?: string;
    assignedToId?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
}

export interface IDiligenceData {
    workDone: string;
    observations: string;
    materials: { name: string; quantity: string }[];
}

export const workOrdersService = {
    async getAll(): Promise<IWorkOrder[]> {
        const { data } = await api.get("/work-orders");
        return data;
    },

    async getById(id: string): Promise<IWorkOrder> {
        const { data } = await api.get(`/work-orders/${id}`);
        return data;
    },

    async getMyWorkOrders(): Promise<IWorkOrder[]> {
        const { data } = await api.get("/work-orders/my");
        return data;
    },

    async create(workOrderData: Partial<IWorkOrder>): Promise<IWorkOrder> {
        const payload = {
            clientId: workOrderData.clientId,
            technicianId: workOrderData.assignedToId || workOrderData.technicianId || undefined,
        };
        const { data } = await api.post("/work-orders", payload);
        return data;
    },

    async update(id: string, workOrderData: Partial<IWorkOrder>): Promise<IWorkOrder> {
        const payload = {
            clientId: workOrderData.clientId,
            technicianId: workOrderData.assignedToId || workOrderData.technicianId || undefined,
        };
        const { data } = await api.patch(`/work-orders/${id}`, payload);
        return data;
    },

    async updateStatus(id: string, status: string): Promise<IWorkOrder> {
        const { data } = await api.patch(`/work-orders/${id}/status`, { status });
        return data;
    },
    
    async diligenceOrder(id: string, diligenceData: IDiligenceData): Promise<IWorkOrder> {
        const response = await api.patch(`/work-orders/${id}/diligence`, diligenceData);
        return response.data;
    },

    async uploadPhoto(id: string, file: File): Promise<unknown> {
        const formData = new FormData();
        formData.append("photos", file);

        const { data } = await api.post(`/work-orders/${id}/photos`, formData, {
            transformRequest: [(data) => data],
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    }
};