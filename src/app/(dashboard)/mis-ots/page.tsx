//src/app/(dashboard)/mis-ots/page.tsx
"use client";

import { useMyWorkOrders } from "@/hooks/useMyWorkOrders";
import { WorkOrderCard } from "@/components/work-orders/WorkOrderCard";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";

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
        <section aria-labelledby="my-work-orders-title">
            <PageHeader
                id="my-work-orders-title"
                title="Mis órdenes de trabajo"
                description="Consulta las tareas técnicas que tienes asignadas."
            />

            <div className="mt-lg">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-md tablet:grid-cols-2 desktop:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-44 animate-pulse rounded-lg bg-gray-200" />
                    ))}
                </div>
            ) : workOrders.length === 0 ? (
                <EmptyState
                    title="No hay órdenes de trabajo asignadas"
                    description="Las nuevas tareas aparecerán aquí."
                />
            ) : (
                <div className="grid grid-cols-1 gap-md tablet:grid-cols-2 desktop:grid-cols-3">
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
        </section>
    );
}
