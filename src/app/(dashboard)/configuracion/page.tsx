import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Switch } from "@/components/ui/Switch/Switch";

export default function Page() {
  return (
    <section aria-labelledby="settings-content-title">
      <PageHeader
        id="settings-content-title"
        title="Configuración"
        description="Gestiona las preferencias generales del panel administrativo."
        actions={
          <Button disabled title="Funcionalidad pendiente de implementación">
            Guardar cambios
          </Button>
        }
      />

      <div className="mt-lg grid gap-md desktop:grid-cols-2">
        <Card variant="elevated">
          <h3 className="text-body font-semibold text-gray-900">
            Notificaciones
          </h3>

          <p className="mt-sm text-small leading-relaxed text-gray-600">
            Preferencias visuales preparadas para su futura integración.
          </p>

          <div className="mt-md flex flex-col gap-md">
            <Switch
              label="Notificaciones del sistema"
              disabled
            />

            <Switch
              label="Resumen de actividad"
              disabled
            />
          </div>
        </Card>

        <Card variant="elevated">
          <h3 className="text-body font-semibold text-gray-900">
            Preferencias regionales
          </h3>

          <dl className="mt-md space-y-md text-small">
            <div>
              <dt className="font-medium text-gray-700">Idioma</dt>
              <dd className="mt-xs text-gray-600">Español</dd>
            </div>

            <div>
              <dt className="font-medium text-gray-700">Zona horaria</dt>
              <dd className="mt-xs text-gray-600">
                Pendiente de configuración
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </section>
  );
}