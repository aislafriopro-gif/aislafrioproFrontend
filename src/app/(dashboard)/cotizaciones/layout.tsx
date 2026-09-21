// src/app/(dashboard)/cotizaciones/layout.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CotizacionesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            {children}
        </ProtectedRoute>
    );
}