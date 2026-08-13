import { Card } from "@/components/ui/Card/Card";

export default function Page() {
  return (
    <section aria-labelledby="settings-content-title">
      <h2
        id="settings-content-title"
        className="text-h4 font-semibold text-gray-900 tablet:text-h3"
      >
        Configuración
      </h2>

      <Card className="mt-lg">
        <p className="text-body leading-relaxed text-gray-700">
          Opciones de configuración.
        </p>
      </Card>
    </section>
  );
}