import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";

export interface IServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface IServicesProps {
  eyebrow?: string;
  title: string;
  description?: string;
  services: readonly IServiceItem[];
  className?: string;
}

export function Services({
  eyebrow,
  title,
  description,
  services,
  className = "",
}: IServicesProps) {
  return (
    <Section
      aria-labelledby="services-title"
      className={`bg-gray-100 ${className}`}
    >
      <Container>
        <div className="flex flex-col items-start gap-md">
          {eyebrow && (
            <Badge variant="primary">{eyebrow}</Badge>
          )}

          <h2
            id="services-title"
            className="max-w-3xl text-h4 font-semibold text-gray-900 tablet:text-h3 desktop:text-h2"
          >
            {title}
          </h2>

          {description && (
            <p className="max-w-2xl text-body text-gray-700">
              {description}
            </p>
          )}
        </div>

        <div className="mt-xl grid gap-lg tablet:grid-cols-2 desktop:grid-cols-3">
          {services.map((service) => (
            <article key={service.id}>
              <Card
                variant="elevated"
                className="h-full"
              >
                <h3 className="text-h5 font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-sm text-body text-gray-700">
                  {service.description}
                </p>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}