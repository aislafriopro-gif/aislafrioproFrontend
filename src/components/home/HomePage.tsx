import { About } from "@/components/home/About/About";
import {
  FAQ,
  type IFaqItem,
} from "@/components/home/FAQ/FAQ";
import {
  Hero,
  type IHeroSlide,
} from "@/components/home/Hero/Hero";
import {
  Services,
  type IServiceItem,
} from "@/components/home/Services/Services";
import Link from "next/link";

const HERO_SLIDES: readonly IHeroSlide[] = [
  {
    id: "hero-main",
    eyebrow: "Soluciones industriales",
    title: [
      "Refrigeración y",
      "aislamiento a la medida",
      "de tu proyecto",
    ],
    description:
      "Encuentra soluciones adaptadas a las necesidades técnicas de cada espacio.",
    primaryAction: {
      label: "Cotizar ahora",
      href: "#cotizador",
    },
    secondaryAction: {
      label: "Ver productos",
      href: "#productos",
    },
  },
  {
    id: "hero-services",
    eyebrow: "Servicios especializados",
    title: [
      "Soluciones para",
      "diferentes",
      "necesidades",
    ],
    description:
      "Conoce nuestras áreas de servicio y encuentra una alternativa adecuada para tu proyecto.",
    primaryAction: {
      label: "Ver servicios",
      href: "#servicios",
    },
    secondaryAction: {
      label: "¿Por qué elegirnos?",
      href: "#por-que-elegirnos",
    },
  },
  {
    id: "hero-experience",
    eyebrow: "AislaFrioPro",
    title: [
      "Acompañamiento desde",
      "la planificación",
      "hasta la ejecución",
    ],
    description:
      "Conoce nuestro proceso de trabajo y los proyectos desarrollados por nuestro equipo.",
    primaryAction: {
      label: "Nuestro proceso",
      href: "#proceso",
    },
    secondaryAction: {
      label: "Ver proyectos",
      href: "#proyectos",
    },
  },
];

const TEMPORARY_SERVICES: readonly IServiceItem[] = [
  {
    id: "service-1",
    title: "Aislamiento térmico",
    description:
      "Soluciones orientadas a mejorar el aislamiento y la eficiencia de diferentes espacios.",
    icon: {
      src: "/icons/services/thermal-insulation.svg",
      alt: "",
    },
    href: "/servicios",
  },
  {
    id: "service-2",
    title: "Refrigeración especializada",
    description:
      "Alternativas de refrigeración adaptadas a las necesidades generales de cada proyecto.",
    icon: {
      src: "/icons/services/industrial-refrigeration.svg",
      alt: "",
    },
    href: "/servicios",
  },
  {
    id: "service-3",
    title: "Asesoría para proyectos",
    description:
      "Orientación inicial para identificar soluciones apropiadas según los requerimientos del proyecto.",
    icon: {
      src: "/icons/services/project-consulting.svg",
      alt: "",
    },
    href: "/servicios",
  },
];

const TEMPORARY_FAQS: readonly IFaqItem[] = [
  {
    id: "faq-1",
    question: "¿Qué soluciones ofrece AislaFrioPro?",
    answer:
      "La información definitiva sobre los servicios será proporcionada y validada posteriormente.",
  },
  {
    id: "faq-2",
    question: "¿Cómo puedo solicitar información?",
    answer:
      "Los canales y procesos oficiales de contacto todavía se encuentran pendientes de definición.",
  },
  {
    id: "faq-3",
    question: "¿Trabajan con proyectos personalizados?",
    answer:
      "El alcance y las condiciones de los proyectos personalizados deberán ser confirmados por el equipo responsable.",
  },
];

export function HomePage() {
  return (
    <>
      <Hero slides={HERO_SLIDES} />

      <About
        eyebrow="Nosotros"
        title="Soluciones industriales adaptadas a cada espacio"
        description="En AislaFrioPro brindamos soluciones para la instalación y el mantenimiento de cortinas industriales de PVC, orientadas a mejorar la separación y el funcionamiento de espacios industriales, logísticos y comerciales."
        additionalContent={
          <Link
            href="/nosotros"
            className="inline-flex items-center gap-sm rounded-md border-2 border-primary px-lg py-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Conoce más
            <span aria-hidden="true">→</span>
          </Link>
        }
        media={
          <div
            role="img"
            aria-label="Espacio reservado para una imagen de AislaFrioPro"
            className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-body text-gray-500"
          >
            Imagen corporativa aqui
          </div>
        }
      />

      <Services
        eyebrow="Servicios"
        title="Soluciones para diferentes necesidades"
        description="Explora una vista inicial de las soluciones que formarán parte de nuestro catálogo."
        services={TEMPORARY_SERVICES}
      />

      <FAQ
        eyebrow="Preguntas frecuentes"
        title="Resolvemos tus principales dudas"
        description="Consulta respuestas provisionales sobre nuestros servicios y procesos."
        faqs={TEMPORARY_FAQS}
      />
    </>
  );
}