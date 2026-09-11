// src/app/(dashboard)/cotizaciones/layout.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/config/permissions";

export default function CotizacionesLayout({
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