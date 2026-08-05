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
  theme?: "light" | "dark";
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
    theme = "light",
    className = "",
    }: IServicesProps) {
    const Heading = headingLevel;
    const isDark = theme === "dark";
  return (
    <Section
      id="servicios"
      aria-labelledby="services-title"
      className={`${isDark ? "bg-gray-900" : "bg-gray-100"} ${className}`}
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
            <Badge variant={isDark ? "secondary" : "primary"}>{eyebrow}</Badge>
          )}

          <Heading
            id="services-title"
            className={`max-w-3xl text-h4 font-semibold tablet:text-h3 desktop:text-h2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            >
            {title}
        </Heading>

          {description && (
            <p
              className={`max-w-2xl text-body ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        <div className="mt-xl grid gap-lg tablet:grid-cols-2 desktop:grid-cols-3">
          {services.map((service) => (
            <article key={service.id}>
              <Card
                variant={isDark ? "dark" : "elevated"}
                className="flex h-full items-start gap-lg text-left"
              >
                <div className="flex size-xxl shrink-0 items-center justify-center rounded-md border-2 border-primary">
                    <Image
                    src={service.icon.src}
                    alt={service.icon.alt}
                    width={32}
                    height={32}
                    />
                </div>

                <div className="flex min-h-full flex-1 flex-col">
                    <h3
                      className={`text-h5 font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                        {service.title}
                    </h3>

                    <p
                      className={`mt-sm flex-1 text-body ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                        {service.description}
                    </p>

                    <Link
                        href={service.href}
                        aria-label={`Ver más sobre ${service.title}`}
                        className={`mt-lg inline-flex w-fit items-center gap-sm rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                          isDark
                            ? "text-secondary hover:text-accent focus-visible:ring-accent focus-visible:ring-offset-gray-700"
                            : "text-primary hover:text-secondary focus-visible:ring-primary focus-visible:ring-offset-white"
                        }`}
                    >
                        Más información
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
                </Card>
            </article>
            ))}
        </div>
      </Container>
    </Section>
  );
}
