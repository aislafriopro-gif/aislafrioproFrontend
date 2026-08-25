    "use client";

    import React, { useState } from "react";
    import { useRouter } from "next/navigation";

    export default function NewWorkOrderPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        client: "",
        title: "",
        description: "",
        status: "Pendiente",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulación de envío mock
        alert("Orden de Trabajo creada exitosamente (Mock)");
        router.push("/work-orders");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Crear Nueva Orden de Trabajo</h1>
            <p className="text-sm text-gray-500">Ingresá los datos para generar una OT operativa.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <input
                type="text"
                required
                placeholder="Ej: Frigorífico del Sur"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary focus:outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Orden</label>
            <input
                type="text"
                required
                placeholder="Ej: Instalación de Paneles Térmicos"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary focus:outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Detalle</label>
            <textarea
                rows={4}
                placeholder="Detalles sobre las tareas a realizar..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary focus:outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Inicial</label>
            <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary focus:outline-none"
            >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completada">Completada</option>
            </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
            <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Cancelar
            </button>
            <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
                Guardar Orden
            </button>
            </div>
        </form>
        </div>
    );
}