import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card/Card";

export interface IProjectCardData {
  id: string;
  name: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
  relevantInfo: readonly {
    label: string;
    value: string;
  }[];
  href: string;
}

export interface IProjectCardProps {
  project: IProjectCardData;
}

export function ProjectCard({ project }: IProjectCardProps) {
  return (
    <article className="h-full">
      <Card
        variant="elevated"
        animated
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <h2 className="mt-md text-body font-semibold text-gray-900">
          {project.name}
        </h2>

        <p className="mt-xs text-small leading-relaxed text-gray-700">
          {project.summary}
        </p>

        <dl className="mt-md flex flex-col gap-xs">
          {project.relevantInfo.map((information) => (
            <div
              key={information.label}
              className="flex flex-wrap gap-xs text-small"
            >
              <dt className="font-semibold text-gray-700">
                {information.label}:
              </dt>

              <dd className="text-gray-500">
                {information.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={project.href}
          aria-label={`Ver detalle de ${project.name}`}
          className="mt-auto inline-flex w-fit items-center gap-sm pt-md font-medium text-secondary transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Ver detalle
          <span aria-hidden="true">→</span>
        </Link>
      </Card>
    </article>
  );
}