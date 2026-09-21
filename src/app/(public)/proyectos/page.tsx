// src/app/(public)/proyectos/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { ProjectGrid } from "@/components/projects/ProjectGrid/ProjectGrid";
import { useProjects } from "@/hooks/useProjects";

const PROJECT_CATEGORIES = [
  "Todos",
  "Cortinas industriales",
  "Aislamiento térmico",
  "Puertas frigoríficas",
  "Instalaciones",
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const { projects, isLoading, isError } = useProjects();

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "Todos") return true;
    return project.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Mapeo ajustado para cumplir exactamente con IProjectCardData (incluyendo href y relevantInfo)
  const formattedProjects = filteredProjects.map((p) => {
    const projectId = String(p.id || p._id || "");
    return {
      id: projectId,
      name: p.name || "Proyecto sin nombre",
      summary: p.description || "",
      category: p.category || "Instalaciones",
      href: `/proyectos/${projectId}`,
      image: {
        src: typeof p.coverImage === "string" ? p.coverImage : "/images/proyectos/pr1.jpeg",
        alt: p.name || "Proyecto AislaFrioPro",
      },
      relevantInfo: [
        { label: "Categoría", value: p.category || "Instalación general" },
        { label: "Estado", value: "Completado" },
      ],
    };
  });

  return (
    <Section aria-labelledby="projects-page-title" className="bg-white">
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
            Explora los proyectos reales desarrollados por AislaFrioPro con estándares de alta calidad.
          </p>
        </div>

        <div
          aria-label="Filtrar proyectos por categoría"
          className="mt-lg flex flex-wrap gap-sm"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-md py-xs text-small font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "border-secondary-strong bg-secondary-strong text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-lg">
          {isLoading && (
            <p className="py-xl text-center text-gray-500">Cargando proyectos...</p>
          )}

          {isError && (
            <p className="py-xl text-center text-red-500">
              Hubo un error al cargar los proyectos. Inténtalo de nuevo más tarde.
            </p>
          )}

          {!isLoading && !isError && (
            <ProjectGrid projects={formattedProjects} />
          )}
        </div>

        <div className="mt-xl flex flex-col gap-md rounded-lg bg-secondary/10 p-lg tablet:flex-row tablet:items-center tablet:justify-between">
          <div>
            <h2 className="text-h5 font-semibold text-gray-900">
              ¿Tienes un proyecto en mente?
            </h2>

            <p className="mt-xs text-body text-gray-700">
              Contáctanos para conocer las alternativas disponibles para tu proyecto.
            </p>
          </div>

          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-sm rounded-md bg-secondary-strong px-lg py-md font-medium text-white transition-colors hover:bg-secondary-strong/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            Cotiza tu proyecto
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}