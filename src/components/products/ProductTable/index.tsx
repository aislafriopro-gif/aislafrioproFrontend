"use client";

import React from "react";
import { IProduct } from "@/interfaces/IProduct";

interface ProductTableProps {
    products: IProduct[];
    onEdit: (product: IProduct) => void;
    onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const productList = Array.isArray(products) ? products : [];

    return (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                        <th className="p-4 font-semibold">Producto</th>
                        <th className="p-4 font-semibold">Precio</th>
                        <th className="p-4 font-semibold">Stock</th>
                        <th className="p-4 font-semibold">Estado</th>
                        <th className="p-4 font-semibold text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {productList.length === 0 ? (
                        <tr key="empty-row">
                            <td colSpan={5} className="p-6 text-center text-gray-500">
                                No hay productos registrados.
                            </td>
                        </tr>
                    ) : (
                        productList.map((product, index) => {
                            const isDeleted = Boolean(product.deletedAt);
                            const productId = product.id || (product._id as string);

                            return (
                                <tr key={productId || index} className="hover:bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900">{product.name}</td>
                                    <td className="p-4 text-gray-600">${product.price ?? 0}</td>
                                    <td className="p-4 text-gray-600">{product.stock ?? 0}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                isDeleted
                                                    ? "bg-red-100 text-red-800"
                                                    : product.published
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {isDeleted ? "Eliminado" : product.published ? "Publicado" : "Borrador"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-end space-x-2">
                                        {!isDeleted ? (
                                            <>
                                                <button
                                                    onClick={() => onEdit(product)}
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => onDelete(productId)}
                                                    className="text-red-600 hover:underline font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">Sin acciones</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}