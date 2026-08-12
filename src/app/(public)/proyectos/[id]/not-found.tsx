import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Card } from "@/components/ui/Card/Card";

export default function NotFound() {
  return (
    <Section
      aria-labelledby="project-not-found-title"
      className="bg-white"
    >
      <Container>
        <Card className="mx-auto max-w-2xl text-center">
          <p className="text-small font-semibold uppercase tracking-wider text-secondary">
            Proyecto no encontrado
          </p>

          <h1
            id="project-not-found-title"
            className="mt-sm text-h4 font-semibold text-gray-900 tablet:text-h3"
          >
            El proyecto solicitado no está disponible
          </h1>

          <p className="mt-md text-body leading-relaxed text-gray-700">
            El identificador puede ser incorrecto o el proyecto todavía
            no se encuentra publicado.
          </p>

          <Link
            href="/proyectos"
            className="mt-lg inline-flex items-center justify-center gap-sm rounded-md bg-primary px-lg py-md font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">←</span>
            Ver todos los proyectos
          </Link>
        </Card>
      </Container>
    </Section>
  );
}