"use client";

import {
  Services,
  type IServiceItem,
} from "@/components/home/Services/Services";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { useServices } from "@/hooks/useServices"; // Importamos el hook que creamos

const SERVICES: readonly IServiceItem[] = [
  {
    id: "industrial-curtains",
    title: "Cortinas industriales",
    description:
      "Soluciones orientadas a la separación y protección de diferentes espacios industriales.",
    icon: {
      src: "/icons/services/industrial-curtains.svg",
      alt: "",
    },
    href: "/contacto",
  },
  {
    id: "thermal-insulation",
    title: "Aislamiento térmico",
    description:
      "Alternativas para mejorar el control térmico y la eficiencia de diferentes ambientes.",
    icon: {
      src: "/icons/services/thermal-insulation.svg",
      alt: "",
    },
    href: "/contacto",
  },
  {
    id: "industrial-refrigeration",
    title: "Refrigeración especializada",
    description:
      "Soluciones adaptadas a los requerimientos generales de espacios industriales.",
    icon: {
      src: "/icons/services/industrial-refrigeration.svg",
      alt: "",
    },
    href: "/contacto",
  },
  {
    id: "project-consulting",
    title: "Asesoría e instalación",
    description:
      "Orientación inicial para identificar e instalar una solución adecuada para cada proyecto.",
    icon: {
      src: "/icons/services/project-consulting.svg",
      alt: "",
    },
    href: "/contacto",
  },
];

const BENEFITS = [
  {
    title: "Materiales de calidad",
    description: "Selección de materiales según las necesidades del proyecto.",
  },
  {
    title: "Asesoría personalizada",
    description: "Orientación para evaluar diferentes alternativas.",
  },
  {
    title: "Instalación profesional",
    description: "Implementación planificada para cada espacio.",
  },
  {
    title: "Soporte",
    description: "Acompañamiento durante las diferentes etapas del proyecto.",
  },
] as const;

export default function Page() {
  // Integramente preparado con el hook de TanStack Query
  const { data, isLoading, error } = useServices();

  // Si el backend responde en un futuro con datos reales, los usará; si no, mantiene la estructura visual intacta
  const servicesToDisplay = data ? (data as unknown as IServiceItem[]) : SERVICES;

  return (
    <>
      {isLoading && (
        <div className="py-4 text-center text-sm text-gray-500">Cargando servicios en tiempo real...</div>
      )}

      {error && (
        <div className="py-4 text-center text-sm text-red-500">Aviso: Usando versión estática temporalmente.</div>
      )}

      <Services
        headingLevel="h1"
        alignment="left"
        eyebrow="Servicios"
        title="Nuestros servicios"
        description="Conoce las soluciones que AislaFrioPro prepara para diferentes necesidades industriales."
        services={servicesToDisplay}
      />

      <Section
        aria-labelledby="service-benefits-title"
        className="bg-white"
      >
        <Container>
          <h2
            id="service-benefits-title"
            className="sr-only"
          >
            Beneficios de nuestros servicios
          </h2>

          <div className="grid gap-lg rounded-lg bg-secondary/10 p-lg tablet:grid-cols-2 desktop:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <article key={benefit.title}>
                <h3 className="text-body font-semibold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-xs text-small text-gray-700">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}