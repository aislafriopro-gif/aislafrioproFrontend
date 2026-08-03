import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";
import Image from "next/image";
import Link from "next/link";

export interface IServiceItem {
  id: string;
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
  href: string;
}

export interface IServicesProps {
  eyebrow?: string;
  title: string;
  description?: string;
  headingLevel?: "h1" | "h2";
  alignment?: "left" | "center";
  services: readonly IServiceItem[];
  className?: string;
}

export function Services({
    eyebrow,
    title,
    description,
    services,
    headingLevel = "h2",
    alignment = "center",
    className = "",
    }: IServicesProps) {
    const Heading = headingLevel;
  return (
    <Section
      id="servicios"
      aria-labelledby="services-title"
      className={`bg-gray-100 ${className}`}
    >
      <Container>
        <div
            className={`flex flex-col gap-md ${
                alignment === "center"
                ? "items-center text-center"
                : "items-start text-left"
            }`}
>
          {eyebrow && (
            <Badge variant="primary">{eyebrow}</Badge>
          )}

          <Heading
            id="services-title"
            className="..."
            >
            {title}
        </Heading>

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
                className="flex h-full flex-col items-center text-center"
                >
                <div className="flex size-xxl items-center justify-center rounded-full border-2 border-secondary">
                    <Image
                    src={service.icon.src}
                    alt={service.icon.alt}
                    width={32}
                    height={32}
                    />
                </div>

                <h3 className="mt-md text-h5 font-semibold text-gray-900">
                    {service.title}
                </h3>

                <p className="mt-sm flex-1 text-body text-gray-700">
                    {service.description}
                </p>

                <Link
                    href={service.href}
                    aria-label={`Ver más sobre ${service.title}`}
                    className="mt-lg inline-flex w-fit items-center gap-sm rounded-md border-2 border-primary px-lg py-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    Ver más
                    <span aria-hidden="true">→</span>
                </Link>
                </Card>
            </article>
            ))}
        </div>
      </Container>
    </Section>
  );
}