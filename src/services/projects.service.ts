// src/services/projects.service.ts

import { api } from "@/lib/api";
import { IProject } from "@/interfaces/IProject";

export const projectsService = {
    async getAll(): Promise<IProject[]> {
        const response = await api.get("/projects");
        const responseData = response.data;

        let list: Record<string, unknown>[] = [];

        if (Array.isArray(responseData)) {
            list = responseData as Record<string, unknown>[];
        } else if (responseData && typeof responseData === "object") {
            const typedData = responseData as Record<string, unknown>;
            if (Array.isArray(typedData.data)) {
                list = typedData.data as Record<string, unknown>[];
            } else if (Array.isArray(typedData.projects)) {
                list = typedData.projects as Record<string, unknown>[];
            } else {
                list = [typedData];
            }
        }

        return list.map((item) => {
            const rawId = item.id || item._id;
            const realId = rawId ? String(rawId) : "";
            return {
                ...item,
                id: realId,
                _id: realId,
            } as unknown as IProject;
        });
    },

    async getById(id: string): Promise<IProject> {
        const { data } = await api.get(`/projects/${id}`);
        const typedData = data as Record<string, unknown>;
        const rawId = typedData?.id || typedData?._id;
        const realId = rawId ? String(rawId) : "";
        return {
            ...typedData,
            id: realId,
            _id: realId,
        } as unknown as IProject;
    },

    async getBySlug(slug: string): Promise<IProject> {
        const { data } = await api.get(`/projects/by-slug/${slug}`);
        const typedData = data as Record<string, unknown>;
        const rawId = typedData?.id || typedData?._id;
        const realId = rawId ? String(rawId) : "";
        return {
            ...typedData,
            id: realId,
            _id: realId,
        } as unknown as IProject;
    },

    async create(projectData: Partial<IProject>): Promise<IProject> {
        const formData = new FormData();
        if (projectData.name) {
            formData.append("name", projectData.name);
            formData.append("slug", projectData.name.toLowerCase().replace(/\s+/g, "-"));
        }
        if (projectData.description) {
            formData.append("description", projectData.description);
        }

        const { data } = await api.post("/projects", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data as IProject;
    },

    async update(id: string, projectData: Partial<IProject>): Promise<IProject> {
        if (!id || id === "undefined") {
            throw new Error("ID de proyecto no válido");
        }

        const formData = new FormData();
        if (projectData.name !== undefined) {
            formData.append("name", projectData.name);
            formData.append("slug", projectData.name.toLowerCase().replace(/\s+/g, "-"));
        }
        if (projectData.description !== undefined) {
            formData.append("description", projectData.description);
        }

        const { data } = await api.patch(`/projects/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data as IProject;
    },

    async remove(id: string): Promise<void> {
        if (!id || id === "undefined") {
            throw new Error("ID de proyecto no válido para eliminar");
        }
        await api.delete(`/projects/${id}`);
    },
};