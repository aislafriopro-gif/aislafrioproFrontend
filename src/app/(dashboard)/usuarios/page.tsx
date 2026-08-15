import { DataTable, type IDataTableRow } from "@/components/dashboard/DataTable/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { Button } from "@/components/ui/Button/Button";

const userColumns = [
  { id: "name", label: "Nombre" },
  { id: "email", label: "Correo" },
  { id: "role", label: "Rol" },
  { id: "status", label: "Estado" },
] as const;

const userRows: readonly IDataTableRow[] = [];

export default function Page() {
  return (
    <section aria-labelledby="users-content-title">
      <PageHeader
        id="users-content-title"
        title="Usuarios"
        description="Administra la información y los permisos de los usuarios del sistema."
        actions={
          <Button disabled title="Funcionalidad pendiente de implementación">
            Agregar usuario
          </Button>
        }
      />

      <div className="mt-lg">
        <DataTable
          caption="Listado de usuarios"
          columns={userColumns}
          rows={userRows}
          emptyState={
            <EmptyState
              title="No hay usuarios para mostrar"
              description="El listado estará disponible cuando se implemente la integración correspondiente."
            />
          }
        />
      </div>
    </section>
  );
}