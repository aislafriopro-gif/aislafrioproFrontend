import {
  DataTable,
  type IDataTableRow,
} from "@/components/dashboard/DataTable/DataTable";
import { Badge } from "@/components/ui/Badge/Badge";

interface QuoteRequest {
  id: number;
  cliente: string;
  servicio: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  fecha: string;
}

const mockCotizaciones: readonly QuoteRequest[] = [
  {
    id: 1,
    cliente: "Empresa A",
    servicio: "Mantenimiento de Aires",
    estado: "Pendiente",
    fecha: "2026-06-01",
  },
  {
    id: 2,
    cliente: "Empresa B",
    servicio: "Instalación de Sistema VRF",
    estado: "Aprobada",
    fecha: "2026-06-03",
  },
];

const columns = [
  { id: "id", label: "ID" },
  { id: "client", label: "Cliente" },
  { id: "service", label: "Servicio" },
  { id: "status", label: "Estado" },
  { id: "date", label: "Fecha" },
] as const;

const statusVariants = {
  Pendiente: "accent",
  Aprobada: "secondary",
  Rechazada: "neutral",
} as const;

const rows: readonly IDataTableRow[] = mockCotizaciones.map((quote) => ({
  id: String(quote.id),
  cells: {
    id: <span className="font-medium text-gray-900">#{quote.id}</span>,
    client: quote.cliente,
    service: quote.servicio,
    status: (
      <Badge variant={statusVariants[quote.estado]}>{quote.estado}</Badge>
    ),
    date: quote.fecha,
  },
}));

export default function QuoteRequestsView() {
  return (
    <DataTable
      caption="Listado de solicitudes de cotización"
      columns={columns}
      rows={rows}
      emptyState={null}
    />
  );
}
