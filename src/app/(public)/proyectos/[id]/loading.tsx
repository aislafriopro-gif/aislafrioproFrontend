import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Loader } from "@/components/ui/Loader/Loader";

export default function Loading() {
  return (
    <Section
      aria-label="Cargando detalle del proyecto"
      className="bg-white"
    >
      <Container>
        <div className="flex min-h-96 flex-col items-center justify-center gap-md text-center">
          <Loader
            size="lg"
            label="Cargando proyecto"
          />

          <p className="text-body text-gray-700">
            Estamos preparando la información del proyecto.
          </p>
        </div>
      </Container>
    </Section>
  );
}