import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";

export interface IHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  media?: ReactNode;
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  className = "",
}: IHeroProps) {
  return (
    <Section
      aria-labelledby="hero-title"
      className={`bg-gray-100 ${className}`}
    >
      <Container>
        <div
          className={`grid items-center gap-xl ${
            media ? "desktop:grid-cols-2" : ""
          }`}
        >
          <div className="flex flex-col items-start gap-md">
            {eyebrow && (
              <Badge variant="primary">{eyebrow}</Badge>
            )}

            <h1
              id="hero-title"
              className="max-w-3xl text-h3 font-semibold text-gray-900 tablet:text-h2 desktop:text-h1"
            >
              {title}
            </h1>

            <p className="max-w-2xl text-body text-gray-700">
              {description}
            </p>

            {actions && (
              <div className="flex w-full flex-col gap-sm tablet:w-auto tablet:flex-row">
                {actions}
              </div>
            )}
          </div>

          {media && <div className="w-full">{media}</div>}
        </div>
      </Container>
    </Section>
  );
}