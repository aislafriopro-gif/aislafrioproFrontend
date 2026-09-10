//src/app/(dashboard)/mis-ots/page.tsx
"use client";

import React from "react";
import { useMyWorkOrders } from "@/hooks/useMyWorkOrders";
import { WorkOrderCard } from "@/components/work-orders/WorkOrderCard";

interface IWorkOrder {
    id: string;
    title?: string;
    description?: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    client?: string;
    createdAt?: string;
}

export default function MisOtsPage() {
    const { data: rawData, isLoading } = useMyWorkOrders();

    const rawList = Array.isArray(rawData)
        ? rawData
        : rawData && typeof rawData === "object" && Array.isArray((rawData as Record<string, unknown>).data)
        ? ((rawData as Record<string, unknown>).data as Record<string, unknown>[])
        : [];

    const workOrders: IWorkOrder[] = rawList.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>;
        const rawStatus = String(typedItem.status || "PENDING");
        const status = (["PENDING", "IN_PROGRESS", "COMPLETED"].includes(rawStatus)
            ? rawStatus
            : "PENDING") as "PENDING" | "IN_PROGRESS" | "COMPLETED";

        return {
            id: String(typedItem.id || ""),
            title: typeof typedItem.title === "string" ? typedItem.title : undefined,
            description: typeof typedItem.description === "string" ? typedItem.description : undefined,
            status,
            client: typeof typedItem.client === "string" ? typedItem.client : undefined,
            createdAt: typeof typedItem.createdAt === "string" ? typedItem.createdAt : undefined,
        };
    });

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Órdenes de Trabajo</h1>
                <p className="text-sm text-gray-500">Panel operativo asignado a tus tareas técnicas.</p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-44 rounded-xl bg-gray-100 animate-pulse" />
                    ))}
                </div>
            ) : workOrders.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-sm">
                    No se encontraron órdenes de trabajo asignadas.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workOrders.map((order) => (
                        <WorkOrderCard
                            key={order.id}
                            id={order.id}
                            title={order.title || "Orden sin título"}
                            description={order.description ?? ""}
                            status={order.status}
                            client={order.client ?? "Cliente no asignado"}
                            createdAt={order.createdAt ?? ""}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}