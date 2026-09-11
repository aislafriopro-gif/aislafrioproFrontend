"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { workOrdersService } from "@/services/work-orders.service";
import PhotoUpload from "@/components/work-orders/PhotoUpload";

interface IMaterialItem {
    name: string;
    quantity: string;
}

export default function DiligenciarWorkOrderPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [submitting, setSubmitting] = useState(false);
    const [workDone, setWorkDone] = useState("");
    const [observations, setObservations] = useState("");
    const [materials, setMaterials] = useState<IMaterialItem[]>([{ name: "", quantity: "1" }]);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>("IN_PROGRESS");

    useEffect(() => {
        if (!id) return;
        workOrdersService
            .getById(id)
            .then((order: unknown) => {
                const typedOrder = order as Record<string, unknown>;
                if (typedOrder && typeof typedOrder.status === "string") {
                    setStatus(typedOrder.status);
                }
            })
            .catch((err: unknown) => console.error("Error al cargar la orden:", err));
    }, [id]);

    const handleAddMaterial = () => {
        setMaterials([...materials, { name: "", quantity: "1" }]);
    };

    const handleRemoveMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index));
    };

    const handleMaterialChange = (index: number, field: keyof IMaterialItem, value: string) => {
        const updated = [...materials];
        updated[index][field] = value;
        setMaterials(updated);
    };

    const handleSubmitDiligence = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            setSubmitting(true);

            if (photoFile) {
                await workOrdersService.uploadPhoto(id, photoFile);
            }

            const diligencePayload = {
                workDone,
                observations,
                materials: materials
                    .filter((m) => m.name.trim() !== "")
                    .map((m) => ({
                        name: m.name,
                        quantity: String(m.quantity),
                    })),
            };

            await workOrdersService.diligenceOrder(id, diligencePayload);
            await workOrdersService.updateStatus(id, status);

            router.push("/mis-ots");
        } catch (error: unknown) {
            const err = error as Record<string, unknown>;
            console.error("Error al guardar la diligencia:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Diligenciar Orden de Trabajo</h1>
                <p className="text-sm text-gray-500">
                    ID de Orden: <span className="font-mono">{id}</span>
                </p>
            </div>

            <form onSubmit={handleSubmitDiligence} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Estado de la Orden</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none bg-white"
                        required
                    >
                        <option value="PENDING">Pendiente (PENDING)</option>
                        <option value="IN_PROGRESS">En Progreso (IN_PROGRESS)</option>
                        <option value="COMPLETED">Completada (COMPLETED)</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Trabajo Realizado</label>
                    <textarea
                        rows={3}
                        value={workDone}
                        onChange={(e) => setWorkDone(e.target.value)}
                        placeholder="Describe detalladamente el trabajo efectuado..."
                        className="rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Observaciones</label>
                    <textarea
                        rows={2}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Observaciones adicionales..."
                        className="rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700">Materiales Ordenados / Utilizados</label>
                        <button
                            type="button"
                            onClick={handleAddMaterial}
                            className="text-xs font-medium text-primary hover:underline"
                        >
                            + Agregar Material
                        </button>
                    </div>

                    {materials.map((mat, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Nombre del material"
                                value={mat.name}
                                onChange={(e) => handleMaterialChange(index, "name", e.target.value)}
                                className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Cantidad"
                                value={mat.quantity}
                                onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                                className="w-24 rounded-lg border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none"
                            />
                            {materials.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMaterial(index)}
                                    className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Evidencia Fotográfica</label>
                    <PhotoUpload onPhotoSelected={(file) => setPhotoFile(file)} />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => router.push("/mis-ots")}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                        {submitting ? "Guardando..." : "Guardar Diligenciamiento"}
                    </button>
                </div>
            </form>
        </div>
    );
}