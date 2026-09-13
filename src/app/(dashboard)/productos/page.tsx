"use client";

import React, { useState, useEffect } from "react";
import { productsService } from "@/services/products.service";
import { IProduct } from "@/interfaces/IProduct";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { Button } from "@/components/ui/Button/Button";

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await productsService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    useEffect(() => {
        queueMicrotask(() => {
            fetchProducts();
        });
    }, []);

    const handleCreateOrUpdate = async (formData: Partial<IProduct>) => {
        setLoading(true);
        try {
            if (isEditing && selectedProduct) {
                const productId = selectedProduct.id || (selectedProduct as Record<string, unknown>)._id as string;
                
                if (!productId) {
                    alert("No se encontró un ID válido para este producto.");
                    return;
                }

                await productsService.update(productId, formData);
            } else {
                await productsService.create(formData);
            }
            setShowForm(false);
            setSelectedProduct(null);
            setIsEditing(false);
            fetchProducts();
        } catch (error) {
            console.error("Error al guardar producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!id) {
            alert("ID de producto no válido");
            return;
        }

        if (!confirm("¿Estás seguro de eliminar este producto?")) return;
        
        try {
            await productsService.remove(id);
            fetchProducts();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const handleEditClick = (product: IProduct) => {
        setSelectedProduct(product);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleNewClick = () => {
        setSelectedProduct(null);
        setIsEditing(false);
        setShowForm(true);
    };

    return (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <section aria-labelledby="products-panel-title">
                <PageHeader
                    id="products-panel-title"
                    title="Productos"
                    description="Gestiona el inventario disponible en la tienda."
                    actions={!showForm ? (
                        <Button
                            onClick={handleNewClick}
                        >
                            Nuevo producto
                        </Button>
                    ) : undefined}
                />

                <div className="mt-lg">
                    {showForm ? (
                        <ProductForm
                            initialData={selectedProduct}
                            onSubmit={handleCreateOrUpdate}
                            onCancel={() => {
                                setShowForm(false);
                                setSelectedProduct(null);
                                setIsEditing(false);
                            }}
                            loading={loading}
                        />
                    ) : (
                        <ProductTable
                            products={products}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </section>
        </ProtectedRoute>
    );
}
