import { MetricCard } from "@/components/dashboard/MetricCard/MetricCard";

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
      <h2
        id="dashboard-content-title"
        className="text-h4 font-semibold text-gray-900 tablet:text-h3"
      >
        Resumen
      </h2>

      <p className="mt-sm max-w-2xl text-body leading-relaxed text-gray-700">
        Vista general de las métricas principales del panel.
      </p>

      <div className="mt-lg grid gap-md tablet:grid-cols-2 desktop:grid-cols-3">
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