import Image from "next/image";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";

export interface IBenefitItem {
  id: string;
  title: string;
  description: string;
  icon?: {
    src: string;
    alt: string;
  };
}

export interface IBenefitsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  benefits: readonly IBenefitItem[];
  className?: string;
}

export function Benefits({
  eyebrow,
  title,
  description,
  benefits,
  className = "",
}: IBenefitsProps) {
  return (
    <Section
      id="beneficios"
      aria-labelledby="benefits-title"
      className={`bg-white ${className}`}
    >
      <Container>
        <div className="flex flex-col items-center gap-sm text-center">
          {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}

          <h2
            id="benefits-title"
            className="max-w-3xl text-h4 font-semibold text-gray-900 tablet:text-h3 desktop:text-h2"
          >
            {title}
          </h2>

          {description && (
            <p className="max-w-2xl text-body leading-relaxed text-gray-700">
              {description}
            </p>
          )}
        </div>

        <div className="mt-lg grid gap-md tablet:grid-cols-2 desktop:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.id}>
              <Card
                variant="elevated"
                animated
                className="flex h-full items-start gap-md text-left"
              >
                {benefit.icon && (
                  <div className="flex size-xl shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <Image
                      src={benefit.icon.src}
                      alt={benefit.icon.alt}
                      width={24}
                      height={24}
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-body font-semibold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-xs text-small leading-relaxed text-gray-700">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
