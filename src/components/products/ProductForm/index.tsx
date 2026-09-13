"use client";

import React, { useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Button } from "@/components/ui/Button/Button";

interface ProductFormProps {
    initialData?: IProduct | null;
    onSubmit: (data: Partial<IProduct>) => void;
    onCancel: () => void;
    loading?: boolean;
}

export default function ProductForm({ initialData, onSubmit, onCancel, loading = false }: ProductFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [price, setPrice] = useState<number>(initialData?.price || 0);
    const [stock, setStock] = useState<number>(initialData?.stock || 0);
    const [published, setPublished] = useState(initialData?.published || false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            published,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-md rounded-lg border border-gray-200 bg-white p-md shadow-sm tablet:p-lg">
            <h2 className="text-h5 font-semibold text-gray-900">
                {initialData ? "Editar producto" : "Nuevo producto"}
            </h2>

            <Input
                label="Nombre"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Textarea
                label="Descripción"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-md tablet:grid-cols-2">
                    <Input
                        label="Precio ($)"
                        type="number"
                        min={0}
                        step="0.01"
                        required
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <Input
                        label="Stock"
                        type="number"
                        min={0}
                        required
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
            </div>

            <div className="pt-sm">
                <Checkbox
                    label="Publicado en tienda"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                />
            </div>

            <div className="flex flex-col-reverse gap-sm border-t border-gray-200 pt-md tablet:flex-row tablet:justify-end">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="border border-gray-300 !bg-white !text-gray-700 hover:!bg-gray-100"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    loading={loading}
                >
                    Guardar producto
                </Button>
            </div>
        </form>
    );
}
