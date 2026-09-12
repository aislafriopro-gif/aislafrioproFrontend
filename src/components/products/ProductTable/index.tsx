"use client";

import { IProduct } from "@/interfaces/IProduct";
import { Badge } from "@/components/ui/Badge/Badge";

interface ProductTableProps {
    products: IProduct[];
    onEdit: (product: IProduct) => void;
    onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const productList = Array.isArray(products) ? products : [];

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="divide-y divide-gray-200 tablet:hidden">
                {productList.length === 0 ? (
                    <p className="p-lg text-center text-small text-gray-500">
                        No hay productos registrados.
                    </p>
                ) : (
                    productList.map((product, index) => {
                        const isDeleted = Boolean(product.deletedAt);
                        const productId = product.id || (product._id as string);

                        return (
                            <article key={productId || index} className="p-sm">
                                <dl className="grid grid-cols-4 items-start gap-xs text-small">
                                    <div className="min-w-0">
                                        <dt className="font-semibold text-gray-700">Producto</dt>
                                        <dd className="mt-xs break-words font-semibold text-gray-900">
                                            {product.name}
                                        </dd>
                                    </div>
                                    <div className="min-w-0 text-center">
                                        <dt className="font-semibold text-gray-700">Precio</dt>
                                        <dd className="mt-xs whitespace-nowrap text-gray-900">
                                            ${product.price ?? 0}
                                        </dd>
                                    </div>
                                    <div className="min-w-0 text-center">
                                        <dt className="font-semibold text-gray-700">Stock</dt>
                                        <dd className="mt-xs text-gray-900">{product.stock ?? 0}</dd>
                                    </div>
                                    <div className="min-w-0 text-center">
                                        <dt className="font-semibold text-gray-700">Estado</dt>
                                        <dd className="mt-xs">
                                            <Badge
                                                className="max-w-full justify-center px-xs"
                                                variant={
                                                    isDeleted
                                                        ? "neutral"
                                                        : product.published
                                                          ? "secondary"
                                                          : "accent"
                                                }
                                            >
                                                {isDeleted
                                                    ? "Eliminado"
                                                    : product.published
                                                      ? "Publicado"
                                                      : "Borrador"}
                                            </Badge>
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-sm flex flex-wrap justify-end gap-md border-t border-gray-200 pt-sm">
                                    {!isDeleted ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => onEdit(product)}
                                                className="rounded-sm font-medium text-primary transition-colors hover:text-secondary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(productId)}
                                                className="rounded-sm font-medium text-accent-strong transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-small italic text-gray-500">Sin acciones</span>
                                    )}
                                </div>
                            </article>
                        );
                    })
                )}
            </div>

            <div className="hidden overflow-x-auto tablet:block">
            <table className="w-full min-w-[40rem] border-collapse text-left text-small">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-100 text-gray-700">
                        <th className="p-md font-semibold">Producto</th>
                        <th className="p-md font-semibold">Precio</th>
                        <th className="p-md font-semibold">Stock</th>
                        <th className="p-md font-semibold">Estado</th>
                        <th className="p-md text-end font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {productList.length === 0 ? (
                        <tr key="empty-row">
                            <td colSpan={5} className="p-lg text-center text-gray-500">
                                No hay productos registrados.
                            </td>
                        </tr>
                    ) : (
                        productList.map((product, index) => {
                            const isDeleted = Boolean(product.deletedAt);
                            const productId = product.id || (product._id as string);

                            return (
                                <tr key={productId || index} className="transition-colors hover:bg-gray-100">
                                    <td className="p-md font-medium text-gray-900">{product.name}</td>
                                    <td className="p-md text-gray-700">${product.price ?? 0}</td>
                                    <td className="p-md text-gray-700">{product.stock ?? 0}</td>
                                    <td className="p-md">
                                        <Badge
                                            variant={isDeleted ? "neutral" : product.published ? "secondary" : "accent"}
                                        >
                                            {isDeleted ? "Eliminado" : product.published ? "Publicado" : "Borrador"}
                                        </Badge>
                                    </td>
                                    <td className="space-x-sm p-md text-end">
                                        {!isDeleted ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => onEdit(product)}
                                                    className="rounded-sm font-medium text-primary transition-colors hover:text-secondary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDelete(productId)}
                                                    className="rounded-sm font-medium text-accent-strong transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-small italic text-gray-500">Sin acciones</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
}
