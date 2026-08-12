import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import {
  ProjectGrid,
} from "@/components/projects/ProjectGrid/ProjectGrid";
import {
  TEMPORARY_PROJECTS,
} from "@/features/projects/data/temporaryProjects";


const PROJECT_CATEGORIES = [
  "Todos",
  "Cortinas industriales",
  "Aislamiento térmico",
  "Puertas frigoríficas",
  "Instalaciones",
] as const;

export default function Page() {
  return (
    <Section
      aria-labelledby="projects-page-title"
      className="bg-white"
    >
      <Container>
        <div className="flex max-w-3xl flex-col items-start gap-md">
          <Badge variant="secondary">Proyectos</Badge>

          <h1
            id="projects-page-title"
            className="text-h3 font-semibold text-gray-900 tablet:text-h2 desktop:text-h1"
          >
            Nuestros <span className="text-primary">proyectos</span>
          </h1>

          <p className="text-body text-gray-700">
            Este espacio presentará los proyectos desarrollados por
            AislaFrioPro cuando la información oficial esté disponible.
          </p>
        </div>

        <div
          aria-label="Categorías previstas para los proyectos"
          className="mt-lg flex flex-wrap gap-sm"
        >
          {PROJECT_CATEGORIES.map((category, index) => (
            <span
              key={category}
              className={`rounded-full border px-md py-xs text-small font-medium ${
                index === 0
                  ? "border-secondary bg-secondary text-white"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-lg">
          <ProjectGrid projects={TEMPORARY_PROJECTS} />
        </div>

        <div className="mt-xl flex flex-col gap-md rounded-lg bg-secondary/10 p-lg tablet:flex-row tablet:items-center tablet:justify-between">
          <div>
            <h2 className="text-h5 font-semibold text-gray-900">
              ¿Tienes un proyecto en mente?
            </h2>

            <p className="mt-xs text-body text-gray-700">
              Contáctanos para conocer las alternativas disponibles para tu
              proyecto.
            </p>
          </div>

          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-sm rounded-md bg-secondary px-lg py-md font-medium text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            Cotiza tu proyecto
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
