import { MetricCard } from "@/components/dashboard/MetricCard/MetricCard";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";

const dashboardMetrics = [
  {
    id: "projects",
    label: "Proyectos",
    value: 12,
    description: "Proyectos registrados provisionalmente.",
    status: "ready",
  },
  {
    id: "requests",
    label: "Solicitudes",
    value: 8,
    description: "Solicitudes pendientes de revisión.",
    status: "ready",
  },
  {
    id: "clients",
    label: "Clientes",
    value: 20,
    description: "Clientes registrados provisionalmente.",
    status: "ready",
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
            />
        ))}
        </div>
    </section>
  );
}