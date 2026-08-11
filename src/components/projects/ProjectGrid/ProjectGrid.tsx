import { Card } from "@/components/ui/Card/Card";
import {
  ProjectCard,
  type IProjectCardData,
} from "@/components/projects/ProjectCard/ProjectCard";

export interface IProjectGridProps {
  projects: readonly IProjectCardData[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProjectGrid({
  projects,
  emptyTitle = "Aún no hay proyectos disponibles",
  emptyDescription = "Los proyectos realizados se mostrarán en esta sección cuando la información esté disponible.",
}: IProjectGridProps) {
  if (projects.length === 0) {
    return (
      <Card
        role="status"
        className="text-center"
      >
        <h2 className="text-h5 font-semibold text-gray-900">
          {emptyTitle}
        </h2>

        <p className="mt-sm text-body leading-relaxed text-gray-700">
          {emptyDescription}
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-md tablet:grid-cols-2 tablet:gap-lg desktop:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}