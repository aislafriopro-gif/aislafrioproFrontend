import { api } from "@/lib/api";

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

    async getTechnicians(): Promise<IUser[]> {
        try {
            const response = await api.get("/users");
            const resData = response.data;
            
            console.log("Respuesta completa de /users:", resData);
            
            const users: IUser[] = Array.isArray(resData) 
                ? resData 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : (resData as any)?.data || (resData as any)?.users || [];
            
            console.log("Usuarios totales detectados:", users);

            const technicians = users.filter((user) => {
                let roleValue = "";
                if (typeof user.role === "string") {
                    roleValue = user.role;
                } else if (user.role && typeof user.role === "object" && "name" in user.role) {
                    roleValue = String((user.role as Record<string, unknown>).name);
                }
                
                return roleValue.toUpperCase() === "TECHNICIAN";
            });

            console.log("Técnicos filtrados:", technicians);
            return technicians;
        } catch (error) {
            console.error("Error al obtener técnicos en el servicio:", error);
            return [];
        }
    },
};