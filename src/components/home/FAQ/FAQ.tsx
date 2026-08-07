import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";

export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface IFaqProps {
  eyebrow?: string;
  title: string;
  description?: string;
  faqs: readonly IFaqItem[];
  className?: string;
}

export function FAQ({
  eyebrow,
  title,
  description,
  faqs,
  className = "",
}: IFaqProps) {
  return (
    <Section
      aria-labelledby="faq-title"
      className={`bg-white ${className}`}
    >
      <Container>
        <div className="flex flex-col items-center gap-md text-center">
          {eyebrow && (
            <Badge variant="accent">{eyebrow}</Badge>
          )}

          <h2
            id="faq-title"
            className="max-w-3xl text-h4 font-semibold text-gray-900 tablet:text-h3 desktop:text-h2"
          >
            {title}
          </h2>

          {description && (
            <p className="max-w-2xl text-body leading-relaxed text-gray-700">
              {description}
            </p>
          )}
        </div>

        <div className="mt-xl flex flex-col gap-sm">
          {faqs.map((faq) => (
            <Card key={faq.id} animated>
              <details name="faq-accordion" className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-md rounded-sm text-body font-semibold text-gray-900 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:text-secondary group-open:text-primary motion-reduce:transition-none">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="text-h5 text-primary transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>

                <p className="mt-md border-t border-gray-200 pt-md text-body leading-relaxed text-gray-700">
                  {faq.answer}
                </p>
              </details>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
