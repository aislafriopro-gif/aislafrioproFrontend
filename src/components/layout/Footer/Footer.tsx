import type { HTMLAttributes } from "react";
import { Container } from "../Container/Container";

export interface IFooterLink {
  label: string;
  href: string;
}

export interface IFooterSection {
  title: string;
  links: IFooterLink[];
}

export interface IFooterProps extends HTMLAttributes<HTMLElement> {
  companyName?: string;
  description?: string;
  sections?: IFooterSection[];
  year?: number;
}

export function Footer({
  companyName = "Aislafriopro",
  description,
  sections = [],
  year = new Date().getFullYear(),
  className = "",
  ...props
}: IFooterProps) {
  return (
    <footer
      {...props}
      className={`bg-gray-900 py-xl text-white tablet:py-xxl ${className}`}
    >
      <Container>
        <div className="grid gap-xl tablet:grid-cols-2 desktop:grid-cols-[2fr_3fr]">
          <div>
            <h2 className="text-h5 font-semibold">{companyName}</h2>

            {description && (
              <p className="mt-sm max-w-md text-body text-gray-300">
                {description}
              </p>
            )}
          </div>

          {sections.length > 0 && (
            <nav
              aria-label="Enlaces del pie de página"
              className="grid gap-lg tablet:grid-cols-2 desktop:grid-cols-3"
            >
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-sm text-body font-semibold">
                    {section.title}
                  </h3>

                  <ul className="space-y-sm">
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.href}`}>
                        <a
                          href={link.href}
                          className="text-body text-gray-300 transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="mt-xl border-t border-gray-700 pt-md text-small text-gray-400">
          © {year} {companyName}. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}