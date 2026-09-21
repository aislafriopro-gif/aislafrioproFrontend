// src/hooks/useProjects.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService } from "@/services/projects.service";
import { IProject } from "@/interfaces/IProject";

export const PROJECTS_QUERY_KEY = ["projects"];

export function useProjects() {
    const queryClient = useQueryClient();

    const projectsQuery = useQuery({
        queryKey: PROJECTS_QUERY_KEY,
        queryFn: () => projectsService.getAll(),
    });

    const createProjectMutation = useMutation({
        mutationFn: (newProject: Partial<IProject>) => projectsService.create(newProject),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
        },
    });

    const updateProjectMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<IProject> }) => 
            projectsService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
        },
    });

    const deleteProjectMutation = useMutation({
        mutationFn: (id: string) => projectsService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
        },
    });

    return {
        ...projectsQuery,
        projects: projectsQuery.data || [],
        createProject: createProjectMutation.mutateAsync,
        updateProject: updateProjectMutation.mutateAsync,
        deleteProject: deleteProjectMutation.mutateAsync,
        isCreating: createProjectMutation.isPending,
        isUpdating: updateProjectMutation.isPending,
        isDeleting: deleteProjectMutation.isPending,
    };
}

export function useProject(id: string) {
    return useQuery({
        queryKey: [...PROJECTS_QUERY_KEY, id],
        queryFn: () => projectsService.getById(id),
        enabled: !!id && id !== "undefined",
    });
}