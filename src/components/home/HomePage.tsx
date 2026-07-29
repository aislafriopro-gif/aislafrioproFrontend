import { About } from "@/components/home/About/About";
import {
  FAQ,
  type IFaqItem,
} from "@/components/home/FAQ/FAQ";
import { Hero } from "@/components/home/Hero/Hero";
import {
  Services,
  type IServiceItem,
} from "@/components/home/Services/Services";

const TEMPORARY_SERVICES: readonly IServiceItem[] = [
  {
    id: "service-1",
    title: "Aislamiento térmico",
    description:
      "Soluciones orientadas a mejorar el aislamiento y la eficiencia de diferentes espacios.",
  },
  {
    id: "service-2",
    title: "Refrigeración especializada",
    description:
      "Alternativas de refrigeración adaptadas a las necesidades generales de cada proyecto.",
  },
  {
    id: "service-3",
    title: "Asesoría para proyectos",
    description:
      "Orientación inicial para identificar soluciones apropiadas según los requerimientos del proyecto.",
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
      <Hero
        eyebrow="AislaFrioPro"
        title="Soluciones de refrigeración y aislamiento para tu proyecto"
        description="Conoce nuestras soluciones y servicios especializados."
      />

      <About
        eyebrow="Nosotros"
        title="Conoce más sobre AislaFrioPro"
        description="Esta sección presentará la experiencia, el enfoque de trabajo y el valor que AislaFrioPro ofrece a sus clientes."
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