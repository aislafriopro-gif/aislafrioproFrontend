
import QuoteRequestsView from "@/components/quote-requests/QuoteRequestsView";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";

export default function CotizacionesPage() {
  return (
    <section aria-labelledby="quotes-content-title">
      <PageHeader
        id="quotes-content-title"
        title="Cotizaciones"
        description="Consulta las solicitudes de cotización registradas en el sistema."
      />

      <div className="mt-lg">
        <QuoteRequestsView />
      </div>
    </section>
  );
}
