import { About } from "@/components/home/About/About";
import Image from "next/image";

const ABOUT_POINTS = [
  {
    title: "Nuestro enfoque",
    description:
      "Comprender las necesidades generales de cada espacio antes de plantear una alternativa.",
  },
  {
    title: "Cómo trabajamos",
    description:
      "Evaluar las condiciones del proyecto y orientar al cliente durante el proceso.",
  },
  {
    title: "Nuestro objetivo",
    description:
      "Contribuir a la organización y eficiencia de diferentes entornos industriales.",
  },
] as const;

export default function Page() {
  return (
    <About
      headingLevel="h1"
      eyebrow="Nosotros"
      title={
        <>
          Conoce más sobre{" "}
          <span className="text-primary">AislaFrioPro</span>
        </>
      }
      description="AislaFrioPro brinda soluciones relacionadas con la instalación y el mantenimiento de cortinas industriales de PVC, considerando las características y necesidades generales de cada espacio."
      additionalContent={
        <div className="mt-md grid w-full gap-md tablet:grid-cols-3">
          {ABOUT_POINTS.map((point) => (
            <article key={point.title}>
              <span
                aria-hidden="true"
                className="mb-sm block size-md rounded-full bg-secondary"
              />

              <h2 className="text-body font-semibold text-gray-900">
                {point.title}
              </h2>

              <p className="mt-xs text-small text-gray-700">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      }
      media={
        <div className="relative p-lg">
          <div
            aria-hidden="true"
            className="absolute inset-lg -rotate-3 rounded-xl border border-dashed border-primary"
          />

          <div
            aria-hidden="true"
            className="absolute inset-lg rotate-3 rounded-xl border border-dashed border-secondary"
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-md">
            <Image
              src="/images/nosotros/about1.png"
              alt="Instalaciones y soluciones industriales de AislaFrioPro"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      }
    />
  );
}