"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { workOrdersService, IWorkOrder } from "@/services/work-orders.service";
import { clientsService } from "@/services/clients.service";
import { usersService } from "@/services/users.service";

interface IClient {
    id: string;
    name: string;
}

interface IUser {
    id: string;
    name: string;
}

export default function WorkOrdersPage() {
    const [orders, setOrders] = useState<IWorkOrder[]>([]);
    const [clientsMap, setClientsMap] = useState<Record<string, string>>({});
    const [usersMap, setUsersMap] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const [ordersRes, clientsRes, usersRes] = await Promise.all([
                workOrdersService.getAll(),
                clientsService.getAll().catch(() => []),
                usersService.getAll().catch(() => []),
            ]);

            const ordersList = Array.isArray(ordersRes) ? ordersRes : ((ordersRes as { data?: IWorkOrder[] })?.data || []);
            setOrders(ordersList);

            const cMap: Record<string, string> = {};
            const clientList = Array.isArray(clientsRes) ? clientsRes : ((clientsRes as { data?: IClient[] })?.data || []);
            clientList.forEach((c: IClient) => {
                cMap[c.id] = c.name;
            });
            setClientsMap(cMap);

            const uMap: Record<string, string> = {};
            const userList = Array.isArray(usersRes) ? usersRes : ((usersRes as { data?: IUser[] })?.data || []);
            userList.forEach((u: IUser) => {
                uMap[u.id] = u.name;
            });
            setUsersMap(uMap);

        } catch (error: unknown) {
            console.error("Error al cargar datos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        queueMicrotask(() => {
            fetchData();
        });
    }, []);

    const handleCompleteOrder = async (id: string) => {
        try {
            setActionLoadingId(id);
            await workOrdersService.updateStatus(id, "COMPLETED");
            await fetchData();
        } catch (error: unknown) {
            console.error("Error al completar la orden:", error);
        } finally {
            setActionLoadingId(null);
        }
    };

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
                            <th className="px-6 py-3">Técnico Asignado</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                                    Cargando órdenes de trabajo...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                                    No se encontraron órdenes de trabajo registradas.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-900">
                                        {order.id.slice(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {clientsMap[order.clientId ?? ""] || "Cliente desconocido"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {order.technicianId ? (usersMap[order.technicianId] || "Técnico asignado") : "Sin asignar"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                (order.status as string) === "COMPLETED" || (order.status as string) === "Completada"
                                                    ? "bg-green-50 text-green-700"
                                                    : (order.status as string) === "IN_PROGRESS" || (order.status as string) === "En Proceso"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                            }`}
                                        >
                                            {order.status || "PENDING"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            href={`/work-orders/${order.id}/technician`}
                                            className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium rounded-md transition-colors"
                                        >
                                            Ver / Diligenciar
                                        </Link>
                                        {order.status !== "COMPLETED" && (
                                            <button
                                                type="button"
                                                onClick={() => handleCompleteOrder(order.id)}
                                                disabled={actionLoadingId === order.id}
                                                className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md disabled:opacity-50 transition-colors"
                                            >
                                                {actionLoadingId === order.id ? "Guardando..." : "Completar"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}