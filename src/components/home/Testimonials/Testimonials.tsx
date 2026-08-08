import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";

export interface ITestimonialItem {
  id: string;
  quote: string;
  company: {
    name: string;
    description: string;
  };
}

export interface ITestimonialsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  testimonials: readonly ITestimonialItem[];
  className?: string;
}

export function Testimonials({
  eyebrow,
  title,
  description,
  testimonials,
  className = "",
}: ITestimonialsProps) {
  return (
    <Section
      id="testimonios"
      aria-labelledby="testimonials-title"
      className={`bg-gray-100 ${className}`}
    >
      <Container>
        <div className="flex flex-col items-center gap-md text-center">
          {eyebrow && <Badge variant="primary">{eyebrow}</Badge>}

          <h2
            id="testimonials-title"
            className="max-w-3xl break-words text-h4 font-semibold leading-tight text-gray-900 tablet:text-h3 desktop:text-h2"
          >
            {title}
          </h2>

          {description && (
            <p className="max-w-2xl text-body leading-relaxed text-gray-700">
              {description}
            </p>
          )}
        </div>

        <div className="mt-xl grid gap-md tablet:grid-cols-2 tablet:gap-lg desktop:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id}>
              <Card
                variant="elevated"
                animated
                className="flex h-full flex-col"
              >
                <blockquote className="min-w-0 flex-1 break-words text-body font-medium leading-relaxed text-gray-900 tablet:text-h5">
                  <p>
                    <span
                      aria-hidden="true"
                      className="mr-xs text-h4 font-semibold leading-none text-primary"
                    >
                      “
                    </span>
                    {testimonial.quote}
                    <span
                      aria-hidden="true"
                      className="ml-xs text-h4 font-semibold leading-none text-primary"
                    >
                      ”
                    </span>
                  </p>
                </blockquote>

                <footer className="mt-lg border-t border-gray-200 pt-md">
                  <cite className="text-body font-semibold not-italic text-gray-900">
                    {testimonial.company.name}
                  </cite>

                  <p className="mt-xs text-small leading-relaxed text-gray-500">
                    {testimonial.company.description}
                  </p>
                  </footer>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
