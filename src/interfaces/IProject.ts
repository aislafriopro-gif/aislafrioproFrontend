// src/interfaces/IProject.ts

export interface IProject {
    id: string;
    _id?: string;
    name?: string;
    slug?: string;
    description?: string;
    status?: string | boolean;
    coverImage?: string;
    beforeImage?: string;
    afterImage?: string;
    images?: Array<string | { url: string; alt?: string }>;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}