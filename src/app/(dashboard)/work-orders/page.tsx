    "use client";

    import React, { useState } from "react";
    import Link from "next/link";

    interface WorkOrderMock {
    id: string;
    client: string;
    title: string;
    status: "Pendiente" | "En Proceso" | "Completada";
    createdAt: string;
    }

    const INITIAL_MOCK_ORDERS: WorkOrderMock[] = [
    {
        id: "OT-001",
        client: "Empresa Alfa S.A.",
        title: "Mantenimiento Preventivo de Aislación",
        status: "En Proceso",
        createdAt: "2026-08-20",
    },
    {
        id: "OT-002",
        client: "Frigorífico del Sur",
        title: "Instalación de Paneles Térmicos",
        status: "Pendiente",
        createdAt: "2026-08-22",
    },
    {
        id: "OT-003",
        client: "Logística Central",
        title: "Reparación de Cierre Hermético",
        status: "Completada",
        createdAt: "2026-08-15",
    },
    ];

    export default function WorkOrdersPage() {
    const [orders] = useState<WorkOrderMock[]>(INITIAL_MOCK_ORDERS);

    return (
        <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Órdenes de Trabajo (OTs)</h1>
            <p className="text-sm text-gray-500">Gestión e historial de órdenes operativas.</p>
            </div>
            <Link
            href="/work-orders/nueva"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
            + Nueva Orden
            </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                <th className="px-6 py-3">Código</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Título / Servicio</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Fecha</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4">{order.client}</td>
                    <td className="px-6 py-4">{order.title}</td>
                    <td className="px-6 py-4">
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Completada"
                            ? "bg-green-50 text-green-700"
                            : order.status === "En Proceso"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                    >
                        {order.status}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.createdAt}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}