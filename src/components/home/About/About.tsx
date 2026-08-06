import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";

export interface IAboutProps {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  additionalContent?: ReactNode;
  media?: ReactNode;
  headingLevel?: "h1" | "h2";
  className?: string;
}

export function About({
  eyebrow,
  title,
  description,
  additionalContent,
  media,
  headingLevel = "h2",
  className = "",
}: IAboutProps) {
    const Heading = headingLevel;
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

            <Heading
            id="about-title"
            className="max-w-3xl text-h4 font-semibold text-gray-900 tablet:text-h3 desktop:text-h2"
            >
            {title}
            </Heading>

            <p className="max-w-2xl text-body leading-relaxed text-gray-700">
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
