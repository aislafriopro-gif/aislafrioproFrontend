// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store"; // O el hook que uses para el estado global

export type UserRole = "GUEST" | "CLIENT" | "TECHNICIAN" | "ADMIN";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    allowedRoles,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    const userRole: UserRole = user ? (user.role as UserRole) : "GUEST";
    const isAuthorized = allowedRoles.includes(userRole);

    useEffect(() => {
        if (!isAuthorized) {
            router.push(redirectTo);
        }
    }, [isAuthorized, router, redirectTo]);

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}