import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";

const CONTACT_CHANNELS = [
  {
    id: "phone",
    title: "Teléfono",
    description: "Información pendiente de confirmación",
  },
  {
    id: "email",
    title: "Correo",
    description: "Información pendiente de confirmación",
  },
  {
    id: "location",
    title: "Ubicación",
    description: "Información pendiente de confirmación",
  },
] as const;

export default function Page() {
  return (
    <Section
      aria-labelledby="contact-page-title"
      className="bg-white"
    >
      <Container>
        <div className="flex max-w-3xl flex-col items-start gap-md">
          <Badge variant="secondary">Contacto</Badge>

          <h1
            id="contact-page-title"
            className="text-h3 font-semibold text-primary tablet:text-h2 desktop:text-h1"
          >
            Contáctanos
          </h1>

          <p className="text-body text-gray-700">
            Estamos listos para conocer las necesidades de tu proyecto y
            orientarte sobre nuestras soluciones.
          </p>
        </div>

        <div className="mt-xl grid gap-lg desktop:grid-cols-[0.8fr_1.2fr_1.2fr]">
          <div className="flex flex-col gap-md">
            {CONTACT_CHANNELS.map((channel) => (
              <Card key={channel.id} variant="default">
                <div className="flex items-start gap-md">
                  <span
                    aria-hidden="true"
                    className="mt-xs size-md shrink-0 rounded-full bg-secondary"
                  />

                  <div>
                    <h2 className="text-body font-semibold text-gray-900">
                      {channel.title}
                    </h2>

                    <p className="mt-xs text-small text-gray-500">
                      {channel.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card variant="elevated">
            <h2 className="text-h5 font-semibold text-gray-900">
              Envíanos un mensaje
            </h2>

            <form
              aria-describedby="contact-form-status"
              className="mt-lg flex flex-col gap-md"
            >
              <div className="grid gap-md tablet:grid-cols-2">
                <Input
                  label="Nombre"
                  name="name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                />

                <Input
                  label="Correo"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                />
              </div>

              <Textarea
                label="Mensaje"
                name="message"
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto..."
              />

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                aria-describedby="contact-form-status"
              >
                Enviar mensaje →
              </Button>

              <p
                id="contact-form-status"
                className="text-small text-gray-500"
              >
                El envío estará disponible cuando se defina la integración.
              </p>
            </form>
          </Card>

          <div className="min-h-80 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            <iframe
              title="Mapa provisional de ubicación en Bogotá"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15907.214572355942!2d-74.08949909122771!3d4.629092902830753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9984322e7f45%3A0x802e616dc42360f8!2zQ0lCLCBTYW50YSBGw6ksIEJvZ290w6EsIENvbG9tYmlh!5e0!3m2!1ses-419!2spe!4v1785804827967!5m2!1ses-419!2spe"
              className="h-full min-h-80 w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
