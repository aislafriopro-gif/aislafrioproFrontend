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
import Image from "next/image";
import {
  Benefits,
  type IBenefitItem,
} from "@/components/home/Benefits/Benefits";
import {
  Testimonials,
  type ITestimonialItem,
} from "@/components/home/Testimonials/Testimonials";

const HERO_BACKGROUND = {
    src: "/images/hero/hero1.png",
    alt: "",
  } as const;
const HERO_SLIDES: readonly IHeroSlide[] = [
  {
    id: "hero-main",
    eyebrow: "Soluciones industriales",
    image: HERO_BACKGROUND,
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
    image: HERO_BACKGROUND,
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
    image: HERO_BACKGROUND,
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

const TEMPORARY_BENEFITS: readonly IBenefitItem[] = [
    {
      id: "benefit-1",
      title: "Separación de ambientes",
      description:
        "Alternativas orientadas a organizar y separar diferentes espacios de trabajo.",
      icon: {
        src: "/icons/services/industrial-curtains.svg",
        alt: "",
      },
    },
    {
      id: "benefit-2",
      title: "Control térmico",
      description:
        "Soluciones preparadas para contribuir al manejo de las condiciones térmicas.",
      icon: {
        src: "/icons/services/thermal-insulation.svg",
        alt: "",
      },
    },
    {
      id: "benefit-3",
      title: "Orientación técnica",
      description:
        "Acompañamiento inicial para identificar alternativas según cada proyecto.",
      icon: {
        src: "/icons/services/project-consulting.svg",
        alt: "",
      },
    },
  ];

  const TEMPORARY_TESTIMONIALS: readonly ITestimonialItem[] = [
    {
      id: "testimonial-1",
      quote:
        "El acompañamiento facilitó la definición de una alternativa acorde con las necesidades del espacio.",
      company: {
        name: "Empresa industrial",
        description:
          "Organización del sector productivo. Identidad e información pendientes de validación.",
      },
    },
    {
      id: "testimonial-2",
      quote:
        "La instalación se desarrolló de manera ordenada y considerando las condiciones particulares del área.",
      company: {
        name: "Centro logístico",
        description:
          "Operación dedicada al almacenamiento. Identidad e información pendientes de validación.",
      },
    },
    {
      id: "testimonial-3",
      quote:
        "La solución contribuyó a mejorar la separación y el funcionamiento del entorno de trabajo.",
      company: {
        name: "Empresa del sector alimentario",
        description:
          "Organización con espacios de conservación. Identidad e información pendientes de validación.",
      },
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
            className="inline-flex items-center gap-sm rounded-md border-2 border-primary px-lg py-sm font-medium text-primary transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-xs hover:bg-primary hover:text-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
          >
            Conoce más
            <span aria-hidden="true">→</span>
          </Link>
        }
        media={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/nosotros/about1.png"
              alt="Instalaciones y soluciones industriales de AislaFrioPro"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      />

      <Services
        theme="dark"
        eyebrow="Servicios"
        title="Soluciones para diferentes necesidades"
        description="Explora una vista inicial de las soluciones que formarán parte de nuestro catálogo."
        services={TEMPORARY_SERVICES}
      />

      <Benefits
        eyebrow="Beneficios técnicos"
        title="Soluciones pensadas para cada entorno"
        description="Conoce algunos beneficios generales."
        benefits={TEMPORARY_BENEFITS}
      />

      <Testimonials
        eyebrow="Testimonios"
        title="Experiencias de nuestros clientes"
        description="Explora los testimonios de algunos de nuestros clientes que demuestran la calidad de nuestro servicio."
        testimonials={TEMPORARY_TESTIMONIALS}
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
