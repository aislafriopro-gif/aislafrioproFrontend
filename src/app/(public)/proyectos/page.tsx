import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import {
  ProjectGrid,
} from "@/components/projects/ProjectGrid/ProjectGrid";
import type {
  IProjectCardData,
} from "@/components/projects/ProjectCard/ProjectCard";


const PROJECT_CATEGORIES = [
  "Todos",
  "Cortinas industriales",
  "Aislamiento térmico",
  "Puertas frigoríficas",
  "Instalaciones",
] as const;

const PROJECTS: readonly IProjectCardData[] = [
  {
    id: "project-1",
    name: "Proyecto industrial",
    description:
      "Instalación orientada a mejorar la separación y el control de un acceso industrial.",
    image: {
      src: "/images/proyectos/pr1.jpeg",
      alt: "Cortina industrial transparente de tiras de PVC instalada en un acceso",
    },
    relevantInfo: [
      {
        label: "Servicio",
        value: "Cortinas industriales",
      },
      {
        label: "Aplicación",
        value: "Separación de ambientes",
      },
    ],
    href: "/contacto",
  },
  {
    id: "project-2",
    name: "Área de almacenamiento",
    description:
      "Solución preparada para contribuir al control térmico de un espacio de almacenamiento.",
    image: {
      src: "/images/proyectos/pr2.jpeg",
      alt: "Cortina de tiras de PVC instalada junto a una puerta aislante",
    },
    relevantInfo: [
      {
        label: "Servicio",
        value: "Aislamiento térmico",
      },
      {
        label: "Aplicación",
        value: "Almacenamiento",
      },
    ],
    href: "/contacto",
  },
  {
    id: "project-3",
    name: "Zona de acceso controlado",
    description:
      "Adecuación visual de un acceso para apoyar la separación de espacios con condiciones diferentes.",
    image: {
      src: "/images/proyectos/pr3.jpeg",
      alt: "Acceso con puerta aislante y cortina transparente de tiras de PVC",
    },
    relevantInfo: [
      {
        label: "Servicio",
        value: "Puertas frigoríficas",
      },
      {
        label: "Aplicación",
        value: "Control de acceso",
      },
    ],
    href: "/contacto",
  },
  {
    id: "project-4",
    name: "Espacio de producción",
    description:
      "Separación de un área productiva mediante una solución adaptable al entorno de trabajo.",
    image: {
      src: "/images/proyectos/pr4.jpeg",
      alt: "Cortina transparente de tiras de PVC instalada en un espacio refrigerado",
    },
    relevantInfo: [
      {
        label: "Servicio",
        value: "Instalaciones",
      },
      {
        label: "Aplicación",
        value: "Área productiva",
      },
    ],
    href: "/contacto",
  },
];

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
          <ProjectGrid projects={PROJECTS} />
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
