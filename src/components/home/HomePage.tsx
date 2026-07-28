import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";

export default function HomePage() {
  return (
    <>
      <Section
        aria-labelledby="home-title"
        className="bg-gray-100"
      >
        <Container>
          <div className="flex flex-col items-start gap-md">
            <Badge variant="primary">
              AislaFrioPro
            </Badge>

            <h1
              id="home-title"
              className="max-w-3xl text-h3 font-semibold text-gray-900 tablet:text-h2 desktop:text-h1"
            >
              Soluciones de refrigeración y aislamiento para tu proyecto
            </h1>

            <p className="max-w-2xl text-body text-gray-700">
              Conoce nuestras soluciones y servicios especializados.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}