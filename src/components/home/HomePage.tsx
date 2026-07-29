import { About } from "@/components/home/About/About";
import { Hero } from "@/components/home/Hero/Hero";

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
    </>
  );
}