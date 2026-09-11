
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { workOrdersService } from "@/services/work-orders.service";
import PhotoUpload from "@/components/work-orders/PhotoUpload";
import PDFDownloadButton from "@/components/work-orders/PDFDownloadButton";

interface MaterialItem {
    name: string;
    quantity: string;
}

export default function TechnicianWorkOrderPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;

    const [workDone, setWorkDone] = useState("");
    const [observations, setObservations] = useState("");
    const [materials, setMaterials] = useState<MaterialItem[]>([{ name: "", quantity: "1" }]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [targetStatus, setTargetStatus] = useState<string>("COMPLETED");
    const [loading, setLoading] = useState(false);

    const handleAddMaterial = () => {
        setMaterials([...materials, { name: "", quantity: "1" }]);
    };

    const handleMaterialChange = (index: number, field: keyof MaterialItem, value: string) => {
        const updated = [...materials];
        updated[index] = { ...updated[index], [field]: value };
        setMaterials(updated);
    };

    const handleRemoveMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index));
    };

    const handleCompleteOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Debes adjuntar al menos una foto de evidencia.");
            return;
        }

        setLoading(true);

        try {
            await workOrdersService.diligenceOrder(orderId, {
                workDone,
                observations,
                materials: materials.filter((m) => m.name.trim() !== ""),
            });

            await workOrdersService.uploadPhoto(orderId, selectedFile);
            await workOrdersService.updateStatus(orderId, targetStatus);

            alert("¡Orden de trabajo procesada exitosamente!");
            router.push("/work-orders");
        } catch (error: unknown) {
            console.error("Error al procesar la orden:", error);
            alert("Hubo un error al procesar la orden.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm my-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Panel del Técnico - Cierre de OT</h1>
                    <p className="text-sm text-gray-500">Orden ID: {orderId}</p>
                </div>
                {orderId && <PDFDownloadButton workOrderId={orderId} />}
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado de la Orden</label>
                    <select
                        value={targetStatus}
                        onChange={(e) => setTargetStatus(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    >
                        <option value="IN_PROGRESS">En Progreso (IN_PROGRESS)</option>
                        <option value="COMPLETED">Completada (COMPLETED)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trabajo Realizado</label>
                    <textarea
                        rows={3}
                        required
                        value={workDone}
                        onChange={(e) => setWorkDone(e.target.value)}
                        placeholder="Detalla las tareas realizadas..."
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                    <textarea
                        rows={2}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Observaciones adicionales..."
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Materiales Utilizados</label>
                        <button
                            type="button"
                            onClick={handleAddMaterial}
                            className="text-xs text-primary font-semibold hover:underline"
                        >
                            + Agregar Material
                        </button>
                    </div>

                    <div className="space-y-3">
                        {materials.map((mat, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Nombre del material"
                                    value={mat.name}
                                    onChange={(e) => handleMaterialChange(index, "name", e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Cantidad"
                                    value={mat.quantity}
                                    onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                                    className="w-28 rounded-lg border border-gray-300 p-2 text-sm focus:outline-none"
                                />
                                {materials.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMaterial(index)}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <PhotoUpload onPhotoSelected={(file) => setSelectedFile(file)} />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50 shadow-sm"
                    >
                        {loading ? "Procesando..." : "Guardar y Actualizar Estado"}
                    </button>
                </div>
            </form>
        </div>
    );
}