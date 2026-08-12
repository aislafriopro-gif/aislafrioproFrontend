import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";
import { ProjectGallery } from "@/components/projects/ProjectGallery/ProjectGallery";
import { BeforeAfter } from "@/components/projects/BeforeAfter/BeforeAfter";
import {
  TEMPORARY_PROJECTS,
  findTemporaryProjectById,
} from "@/features/projects/data/temporaryProjects";

export interface IProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return TEMPORARY_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export default async function Page({
  params,
}: IProjectDetailPageProps) {
  const { id } = await params;
  const project = findTemporaryProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <Section
      aria-labelledby="project-detail-title"
      className="bg-white"
    >
      <Container>
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-sm font-medium text-primary transition-colors hover:text-secondary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span aria-hidden="true">←</span>
          Volver a proyectos
        </Link>

        <header className="mt-lg flex max-w-3xl flex-col items-start gap-md">
          <Badge variant="secondary">Detalle del proyecto</Badge>

          <h1
            id="project-detail-title"
            className="text-h3 font-semibold leading-tight text-gray-900 tablet:text-h2 desktop:text-h1"
          >
            {project.name}
          </h1>

          <p className="text-body leading-relaxed text-gray-700">
            {project.description}
          </p>
        </header>

        <Card className="mt-xl">
          <h2 className="text-h5 font-semibold text-gray-900">
            Información del proyecto
          </h2>

          <dl className="mt-md grid gap-md tablet:grid-cols-2">
            {project.relevantInfo.map((information) => (
              <div key={information.label}>
                <dt className="text-small font-semibold text-gray-500">
                  {information.label}
                </dt>

                <dd className="mt-xs text-body text-gray-900">
                  {information.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <section
          aria-labelledby="project-gallery-title"
          className="mt-xxl"
        >
          <h2
            id="project-gallery-title"
            className="text-h4 font-semibold text-gray-900 tablet:text-h3"
          >
            Galería del proyecto
          </h2>

          <div className="mt-lg">
            <ProjectGallery images={project.gallery} />
          </div>
        </section>

        <section
          aria-labelledby="before-after-title"
          className="mt-xxl"
        >
          <h2
            id="before-after-title"
            className="text-h4 font-semibold text-gray-900 tablet:text-h3"
          >
            Antes y después
          </h2>

          <div className="mt-lg">
            {project.beforeAfter ? (
              <BeforeAfter images={project.beforeAfter} />
            ) : (
              <Card
                role="status"
                className="text-center"
              >
                <h3 className="text-h5 font-semibold text-gray-900">
                  Comparación no disponible
                </h3>

                <p className="mt-sm text-body text-gray-700">
                  Este proyecto todavía no tiene imágenes de antes y después.
                </p>
              </Card>
            )}
          </div>
        </section>
      </Container>
    </Section>
  );
}