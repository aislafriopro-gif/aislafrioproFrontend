import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";

const PROJECT_CATEGORIES = [
  "Todos",
  "Cortinas industriales",
  "Aislamiento térmico",
  "Puertas frigoríficas",
  "Instalaciones",
] as const;

const PROJECTS = [
  {
    id: "project-1",
    title: "Proyecto industrial",
    category: "Cortinas industriales",
  },
  {
    id: "project-2",
    title: "Área de almacenamiento",
    category: "Aislamiento térmico",
  },
  {
    id: "project-3",
    title: "Zona de acceso controlado",
    category: "Puertas frigoríficas",
  },
  {
    id: "project-4",
    title: "Espacio de producción",
    category: "Instalaciones",
  },
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

        <div className="mt-lg grid gap-lg tablet:grid-cols-2 desktop:grid-cols-4">
          {PROJECTS.map((project) => (
            <article key={project.id}>
              <Card
                variant="elevated"
                className="flex h-full flex-col"
              >
                <div
                  role="img"
                  aria-label={`Imagen pendiente para ${project.title}`}
                  className="flex aspect-[4/3] items-center justify-center rounded-md bg-gray-100 p-md text-center text-small text-gray-500"
                >
                  Imagen del proyecto
                </div>

                <h2 className="mt-md text-h6 font-semibold text-gray-900">
                  {project.title}
                </h2>

                <p className="mt-xs flex-1 text-small text-gray-500">
                  {project.category}
                </p>

                <Link
                  href="/contacto"
                  aria-label={`Consultar sobre ${project.title}`}
                  className="mt-md inline-flex items-center gap-sm font-medium text-secondary transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Consultar
                  <span aria-hidden="true">→</span>
                </Link>
              </Card>
            </article>
          ))}
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