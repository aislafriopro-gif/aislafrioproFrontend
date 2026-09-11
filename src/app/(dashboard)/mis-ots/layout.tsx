// src/app/(dashboard)/mis-ots/layout.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/config/permissions";

export default function MisOtsLayout({
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