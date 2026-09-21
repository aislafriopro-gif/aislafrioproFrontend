// src/app/(public)/proyectos/[id]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";
import { ProjectGallery } from "@/components/projects/ProjectGallery/ProjectGallery";
import { BeforeAfter } from "@/components/projects/BeforeAfter/BeforeAfter";
import { projectsService } from "@/services/projects.service";
import { IProject } from "@/interfaces/IProject";

export interface IProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const projects = await projectsService.getAll();
    return projects.map((project) => ({
      id: String(project.id || project._id),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: IProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  let project: IProject | null = null;
  try {
    project = await projectsService.getById(id);
  } catch {
    project = null;
  }

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const projectName = project.name || "Proyecto";
  const projectDescription = project.description || "Detalle del proyecto en AislaFrioPro.";
  const url = `/proyectos/${id}`;
  
  let coverImg = "/images/proyectos/pr1.jpeg";
  if (typeof project.coverImage === "string") {
    coverImg = project.coverImage;
  }

  return {
    title: projectName,
    description: projectDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${projectName} | AislaFrioPro`,
      description: projectDescription,
      url,
      siteName: "AislaFrioPro",
      locale: "es_CO",
      type: "website",
      images: [{ url: coverImg, alt: projectName }],
    },
  };
}

export default async function Page({
  params,
}: IProjectDetailPageProps) {
  const { id } = await params;

  let project: IProject | null = null;
  try {
    project = await projectsService.getById(id);
  } catch {
    project = null;
  }

  if (!project) {
    notFound();
  }

  const projectName = project.name || "Proyecto";
  const projectDescription = project.description || "Sin descripción disponible para este proyecto.";

  // Mapeo corregido directamente a las propiedades src y alt que exige IProjectGalleryImage
  const galleryImages = Array.isArray(project.images) 
    ? project.images.map((img, index) => {
        const src = typeof img === "string" ? img : img.url;
        const alt = typeof img === "object" && img.alt ? img.alt : projectName;
        return {
          id: `gallery-${index}`,
          src,
          alt,
        };
      })
    : [];

  const beforeAfterData = (project.beforeImage && project.afterImage) ? {
    before: { src: project.beforeImage, alt: "Antes de la instalación" },
    after: { src: project.afterImage, alt: "Después de la instalación" }
  } : null;

  return (
    <Section aria-labelledby="project-detail-title" className="bg-white">
      <Container>
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-sm font-medium text-primary transition-colors hover:text-secondary-strong focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
            {projectName}
          </h1>

          <p className="text-body leading-relaxed text-gray-700">
            {projectDescription}
          </p>
        </header>

        <Card className="mt-xl">
          <h2 className="text-h5 font-semibold text-gray-900">
            Información del proyecto
          </h2>

          <dl className="mt-md grid gap-md tablet:grid-cols-2">
            <div>
              <dt className="text-small font-semibold text-gray-500">Categoría</dt>
              <dd className="mt-xs text-body text-gray-900">{project.category || "General"}</dd>
            </div>
            <div>
              <dt className="text-small font-semibold text-gray-500">Estado</dt>
              <dd className="mt-xs text-body text-gray-900">Activo</dd>
            </div>
          </dl>
        </Card>

        <section aria-labelledby="project-gallery-title" className="mt-xxl">
          <h2 id="project-gallery-title" className="text-h4 font-semibold text-gray-900 tablet:text-h3">
            Galería del proyecto
          </h2>

          <div className="mt-lg">
            {galleryImages.length > 0 ? (
              <ProjectGallery images={galleryImages} />
            ) : (
              <p className="text-body text-gray-500">No hay imágenes adicionales en la galería.</p>
            )}
          </div>
        </section>

        <section aria-labelledby="before-after-title" className="mt-xxl">
          <h2 id="before-after-title" className="text-h4 font-semibold text-gray-900 tablet:text-h3">
            Antes y después
          </h2>

          <div className="mt-lg">
            {beforeAfterData ? (
              <BeforeAfter images={beforeAfterData} />
            ) : (
              <Card role="status" className="text-center">
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