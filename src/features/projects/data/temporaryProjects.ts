import type {
  IProjectCardData,
} from "@/components/projects/ProjectCard/ProjectCard";
import type {
  IProjectGalleryImage,
} from "@/components/projects/ProjectGallery/ProjectGallery";
import type {
  IBeforeAfterImages,
} from "@/components/projects/BeforeAfter/BeforeAfter";



export interface IProject extends IProjectCardData {
  description: string;
  gallery: readonly IProjectGalleryImage[];
  beforeAfter?: IBeforeAfterImages;
}

export const TEMPORARY_PROJECTS: readonly IProject[] = [
  {
    id: "project-1",
    name: "Proyecto industrial",
    summary:
      "Instalación orientada a mejorar la separación y el control de un acceso industrial.",
    description:
      "Proyecto provisional enfocado en la separación de ambientes mediante cortinas industriales de PVC. La información técnica y comercial definitiva deberá validarse posteriormente.",
    image: {
      src: "/images/proyectos/pr1.jpeg",
      alt: "Cortina industrial transparente instalada en un acceso",
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
    gallery: [
      {
        id: "project-1-image-1",
        src: "/images/proyectos/pr1.jpeg",
        alt: "Vista principal provisional del proyecto industrial",
      },
      {
        id: "project-1-image-2",
        src: "/images/proyectos/pr2.jpeg",
        alt: "Vista complementaria provisional de una instalación industrial",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/proyectos/pr1.jpeg",
        alt: "Imagen provisional del estado inicial",
      },
      after: {
        src: "/images/proyectos/pr2.jpeg",
        alt: "Imagen provisional del estado final",
      },
    },
    href: "/proyectos/project-1",
  },
  {
    id: "project-2",
    name: "Área de almacenamiento",
    summary:
      "Solución preparada para contribuir al control térmico de un espacio de almacenamiento.",
    description:
      "Propuesta visual provisional para un área de almacenamiento que requiere separación y control de sus condiciones internas.",
    image: {
      src: "/images/proyectos/pr2.jpeg",
      alt: "Cortina de PVC instalada junto a una puerta aislante",
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
    gallery: [
      {
        id: "project-2-image-1",
        src: "/images/proyectos/pr2.jpeg",
        alt: "Vista provisional del área de almacenamiento",
      },
      {
        id: "project-2-image-2",
        src: "/images/proyectos/pr1.jpeg",
        alt: "Detalle provisional de una cortina industrial",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/proyectos/pr2.jpeg",
        alt: "Imagen provisional previa a la intervención",
      },
      after: {
        src: "/images/proyectos/pr1.jpeg",
        alt: "Imagen provisional posterior a la intervención",
      },
    },
    href: "/proyectos/project-2",
  },
  {
    id: "project-3",
    name: "Zona de acceso controlado",
    summary:
      "Adecuación visual de un acceso para separar espacios con condiciones diferentes.",
    description:
      "Estructura provisional de un proyecto orientado a organizar un acceso y apoyar la conservación de las condiciones de cada ambiente.",
    image: {
      src: "/images/proyectos/pr3.jpeg",
      alt: "Acceso con puerta aislante y cortina transparente",
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
    gallery: [
      {
        id: "project-3-image-1",
        src: "/images/proyectos/pr3.jpeg",
        alt: "Vista provisional de una zona de acceso controlado",
      },
      {
        id: "project-3-image-2",
        src: "/images/proyectos/pr4.jpeg",
        alt: "Vista complementaria provisional de un espacio industrial",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/proyectos/pr3.jpeg",
        alt: "Imagen provisional del acceso antes de la intervención",
      },
      after: {
        src: "/images/proyectos/pr4.jpeg",
        alt: "Imagen provisional del acceso después de la intervención",
      },
    },
    href: "/proyectos/project-3",
  },
  {
    id: "project-4",
    name: "Espacio de producción",
    summary:
      "Separación de un área productiva mediante una solución adaptable al entorno de trabajo.",
    description:
      "Presentación provisional de una solución para separar un espacio productivo y facilitar la organización de sus áreas de trabajo.",
    image: {
      src: "/images/proyectos/pr4.jpeg",
      alt: "Cortina transparente instalada en un espacio refrigerado",
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
    gallery: [],
    href: "/proyectos/project-4",
  },
];

export function findTemporaryProjectById(id: string) {
  return TEMPORARY_PROJECTS.find((project) => project.id === id);
}