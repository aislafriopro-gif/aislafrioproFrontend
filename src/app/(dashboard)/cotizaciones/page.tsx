
import QuoteRequestsView from '@/components/quote-requests/QuoteRequestsView';

export default function CotizacionesPage() {
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Gestión de Cotizaciones</h1>
        <QuoteRequestsView />
    </div>
    );
}