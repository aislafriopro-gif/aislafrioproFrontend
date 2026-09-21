// src/services/users.service.ts

import { api } from "@/lib/api";
import { UserCreatePayload } from "@/components/users/UserCreateModal";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: unknown;
    [key: string]: unknown;
}

export const usersService = {
    async getAll(): Promise<IUser[]> {
        const response = await api.get("/users");
        return response.data;
    },

    async create(payload: UserCreatePayload): Promise<IUser> {
        const response = await api.post("/users", payload);
        return response.data;
    },

    async getTechnicians(): Promise<IUser[]> {
        try {
            const response = await api.get("/users");
            const resData = response.data;
            
            const users: IUser[] = Array.isArray(resData) 
                ? resData 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : (resData as any)?.data || (resData as any)?.users || [];

            const technicians = users.filter((user) => {
                let roleValue = "";
                if (typeof user.role === "string") {
                    roleValue = user.role;
                } else if (user.role && typeof user.role === "object" && "name" in user.role) {
                    roleValue = String((user.role as Record<string, unknown>).name);
                }
                return roleValue.toUpperCase() === "TECHNICIAN";
            });

            return technicians;
        } catch (error) {
            //.error("Error al obtener técnicos en el servicio:", error);
            return [];
        }
    },
};