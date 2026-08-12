"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";

export default function Error({
  unstable_retry,
}: {
  error: Error & {
    digest?: string;
  };
  unstable_retry: () => void;
}) {
  return (
    <Section
      aria-labelledby="project-error-title"
      className="bg-white"
    >
      <Container>
        <Card
          role="alert"
          className="mx-auto max-w-2xl text-center"
        >
          <h1
            id="project-error-title"
            className="text-h4 font-semibold text-gray-900 tablet:text-h3"
          >
            No pudimos cargar el proyecto
          </h1>

          <p className="mt-md text-body leading-relaxed text-gray-700">
            Ocurrió un problema mientras se preparaba la información.
            Puedes intentarlo nuevamente o regresar al listado.
          </p>

          <div className="mt-lg flex flex-col justify-center gap-sm tablet:flex-row">
            <Button
              onClick={unstable_retry}
              animated
            >
              Intentar nuevamente
            </Button>

            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center rounded-md border-2 border-primary px-md py-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Volver a proyectos
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  );
}