import { Card } from "@/components/ui/Card/Card";

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
        Vista general provisional del panel. 
      </p>

      <div className="mt-lg grid gap-md tablet:grid-cols-2 desktop:grid-cols-3">
        <Card variant="elevated">
          <h3 className="text-body font-semibold text-gray-900">
            Actividad
          </h3>
          <p className="mt-sm text-small text-gray-500">
            Información pendiente de integración.
          </p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-body font-semibold text-gray-900">
            Solicitudes
          </h3>
          <p className="mt-sm text-small text-gray-500">
            Información pendiente de integración.
          </p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-body font-semibold text-gray-900">
            Estado general
          </h3>
          <p className="mt-sm text-small text-gray-500">
            Información pendiente de integración.
          </p>
        </Card>
      </div>
    </section>
  );
}