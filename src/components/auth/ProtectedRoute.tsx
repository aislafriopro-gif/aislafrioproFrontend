// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import Cookies from "js-cookie";

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
    const [isMounted, setIsMounted] = useState(false);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const token = typeof window !== "undefined" ? Cookies.get("token") : null;
    const userRole: UserRole = user ? (user.role as UserRole) : "GUEST";
    const isAuthorized = allowedRoles.includes(userRole);

    useEffect(() => {
        if (!isMounted) return;

        if (!token) {
            router.replace(redirectTo);
            return;
        }

        if (user !== null && !isAuthorized) {
            router.replace("/dashboard");
        }
    }, [isMounted, token, user, isAuthorized, router, redirectTo]);

    if (!isMounted || !token || !isAuthorized) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <p className="text-sm text-gray-500">Verificando accesos y permisos...</p>
            </div>
        );
    }

    return <>{children}</>;
}
