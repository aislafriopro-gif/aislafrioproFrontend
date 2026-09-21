"use client";

import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";
import { useState } from "react";

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
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  function toggleFaq(faqId: string) {
    setActiveFaqId((currentId) =>
      currentId === faqId ? null : faqId,
    );
  }

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

        <div className="mt-xl flex flex-col gap-sm">
          {faqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            const triggerId = `faq-trigger-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <Card key={faq.id} animated>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-md rounded-sm text-left text-body font-semibold text-gray-900 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:text-secondary-strong motion-reduce:transition-none"
                >
                  <span className="min-w-0 break-words">{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-h5 text-primary transition-transform duration-200 ease-out motion-reduce:transition-none ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-md border-t border-gray-200 pt-md text-body leading-relaxed text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
