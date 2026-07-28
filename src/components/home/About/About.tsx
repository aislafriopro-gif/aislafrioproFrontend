import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";

export interface IAboutProps {
  eyebrow?: string;
  title: string;
  description: string;
  additionalContent?: ReactNode;
  media?: ReactNode;
  className?: string;
}

export function About({
  eyebrow,
  title,
  description,
  additionalContent,
  media,
  className = "",
}: IAboutProps) {
  return (
    <Section
      aria-labelledby="about-title"
      className={`bg-white ${className}`}
    >
      <Container>
        <div
          className={`grid items-center gap-xl ${
            media ? "desktop:grid-cols-2" : ""
          }`}
        >
          <div className="flex flex-col items-start gap-md">
            {eyebrow && (
              <Badge variant="secondary">{eyebrow}</Badge>
            )}

            <h2
              id="about-title"
              className="max-w-3xl text-h4 font-semibold text-gray-900 tablet:text-h3 desktop:text-h2"
            >
              {title}
            </h2>

            <p className="max-w-2xl text-body text-gray-700">
              {description}
            </p>

            {additionalContent}
          </div>

          {media && <div className="w-full">{media}</div>}
        </div>
      </Container>
    </Section>
  );
}