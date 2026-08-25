    import { useState, useEffect } from "react";

    export interface WorkOrder {
    id: string;
    title: string;
    client: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    createdAt: string;
    }

    const MOCK_MY_WORK_ORDERS: WorkOrder[] = [
    {
        id: "OT-101",
        title: "Aislamiento de Cára Frigorífica #2",
        client: "Supermercados Global",
        description: "Revisión de fuga térmica y recambio de sello perimetral.",
        status: "IN_PROGRESS",
        createdAt: "2026-08-24",
    },
    {
        id: "OT-102",
        title: "Mantenimiento Preventivo Aislante",
        client: "Frigorífico del Norte",
        description: "Inspección de paneles térmicos en nave principal.",
        status: "PENDING",
        createdAt: "2026-08-25",
    },
    {
        id: "OT-103",
        title: "Sellado Espuma Poliuretano",
        client: "Depósito Central",
        description: "Inyección de aislante en cubierta superior.",
        status: "COMPLETED",
        createdAt: "2026-08-18",
    },
    ];

    export function useMyWorkOrders() {
    const [data, setData] = useState<WorkOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setData(MOCK_MY_WORK_ORDERS);
        setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { data, isLoading };
}