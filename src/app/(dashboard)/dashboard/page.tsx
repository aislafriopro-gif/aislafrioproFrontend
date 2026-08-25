import Image from "next/image";
import { MetricCard } from "@/components/dashboard/MetricCard/MetricCard";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";

const dashboardMetrics = [
  {
    id: "quotes",
    label: "Cotizaciones",
    value: 8,
    description: "Cotizaciones registradas provisionalmente.",
    status: "ready",
    iconSrc: "/icons/dashboard/quotes.svg",
  },
  {
    id: "work-orders",
    label: "Órdenes de trabajo",
    value: 4,
    description: "Órdenes de trabajo registradas provisionalmente.",
    status: "ready",
    iconSrc: "/icons/dashboard/work-orders.svg",
  },
  {
    id: "projects",
    label: "Proyectos",
    value: 12,
    description: "Proyectos registrados provisionalmente.",
    status: "ready",
    iconSrc: "/icons/dashboard/projects.svg",
  },
  {
    id: "products",
    label: "Productos",
    value: 6,
    description: "Productos registrados provisionalmente.",
    status: "ready",
    iconSrc: "/icons/dashboard/products.svg",
  },
] as const;

export default function Page() {
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
            status={metric.status}
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
