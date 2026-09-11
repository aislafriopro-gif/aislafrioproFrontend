// src/config/permissions.ts
import { UserRole } from "@/components/auth/ProtectedRoute";

export const PERMISSIONS = {
    public: ["GUEST", "CLIENT", "TECHNICIAN", "ADMIN"] as UserRole[],
    guestOnly: ["GUEST"] as UserRole[],
    dashboard: ["CLIENT", "TECHNICIAN", "ADMIN"] as UserRole[],
    adminOnly: ["ADMIN"] as UserRole[],
    projectManagement: ["ADMIN", "TECHNICIAN"] as UserRole[],
    technicianOnly: ["TECHNICIAN"] as UserRole[],
};