export interface IProduct {
    id: string;
    _id?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    published?: boolean;
    images?: string[];
    imageUrl?: string;
    slug?: string;
    deletedAt?: string | null;
    [key: string]: unknown;
}