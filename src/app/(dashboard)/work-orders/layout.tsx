// src/app/(dashboard)/work-orders/layout.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/config/permissions";

export default function WorkOrdersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={PERMISSIONS.projectManagement}>
            {children}
        </ProtectedRoute>
    );
}