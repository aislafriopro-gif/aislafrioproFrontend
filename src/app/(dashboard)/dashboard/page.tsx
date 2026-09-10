"use client";

import Image from "next/image";
import {
  MetricCard,
  type MetricCardStatus,
} from "@/components/dashboard/MetricCard/MetricCard";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function Page() {
  const { data, isLoading, isError } = useDashboardStats();

  const status: MetricCardStatus = isLoading
    ? "loading"
    : isError
      ? "error"
      : data
        ? "ready"
        : "empty";

  const dashboardMetrics = [
    {
      id: "quotes",
      label: "Cotizaciones",
      value: data?.totalQuotes,
      description: data
        ? `Nuevas: ${data.quotesByStatus.NEW} · En proceso: ${data.quotesByStatus.IN_PROGRESS} · Resueltas: ${data.quotesByStatus.RESOLVED} · Rechazadas: ${data.quotesByStatus.REJECTED}`
        : undefined,
      iconSrc: "/icons/dashboard/quotes.svg",
    },
    {
      id: "work-orders",
      label: "Órdenes de trabajo",
      value: data?.totalWorkOrders,
      description: data
        ? `Pendientes: ${data.workOrdersByStatus.PENDING} · En proceso: ${data.workOrdersByStatus.IN_PROGRESS} · Completadas: ${data.workOrdersByStatus.COMPLETED}`
        : undefined,
      iconSrc: "/icons/dashboard/work-orders.svg",
    },
    {
      id: "projects",
      label: "Proyectos",
      value: data?.totalProjects,
      description: "Total de proyectos registrados.",
      iconSrc: "/icons/dashboard/projects.svg",
    },
    {
      id: "products",
      label: "Productos",
      value: data?.totalProducts,
      description: "Total de productos registrados.",
      iconSrc: "/icons/dashboard/products.svg",
    },
  ];

  return (
    <section aria-labelledby="dashboard-content-title">
      <PageHeader
        id="dashboard-content-title"
        title="Resumen"
        description="Vista general de las métricas principales del panel."
      />

      <div className="mt-lg grid grid-cols-1 gap-md tablet:grid-cols-2 desktop:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            description={metric.description}
            status={status}
            icon={
              <Image
                src={metric.iconSrc}
                alt=""
                width={24}
                height={24}
              />
            }
          />
        ))}
      </div>
    </section>
  );
}