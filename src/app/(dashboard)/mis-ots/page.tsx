    "use client";

    import React from "react";
    import { useMyWorkOrders } from "@/hooks/useMyWorkOrders";
    import { WorkOrderCard } from "@/components/work-orders/WorkOrderCard";

    export default function MisOtsPage() {
    const { data: workOrders, isLoading } = useMyWorkOrders();

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
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workOrders.map((order) => (
                <WorkOrderCard key={order.id} {...order} />
            ))}
            </div>
        )}
        </div>
    );
}