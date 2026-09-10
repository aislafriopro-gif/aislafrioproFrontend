"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usersService, IUser } from "@/services/users.service";
import { clientsService, IClient } from "@/services/clients.service";
import { workOrdersService } from "@/services/work-orders.service"; 

export default function NewWorkOrderPage() {
    const router = useRouter();
    const [technicians, setTechnicians] = useState<IUser[]>([]);
    const [clients, setClients] = useState<IClient[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        client: "", 
        title: "",
        description: "",
        status: "PENDING" as "PENDING" | "IN_PROGRESS" | "COMPLETED",
        clientId: "",
        technicianId: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [techs, clientList] = await Promise.all([
                    usersService.getTechnicians(),
                    clientsService.getAll(),
                ]);
                setTechnicians(techs);
                setClients(clientList);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await workOrdersService.create({
                clientId: formData.clientId,
                technicianId: formData.technicianId || undefined,
            });
            alert("Orden de Trabajo creada y asignada exitosamente.");
            router.push("/work-orders");
        } catch (error: unknown) {
            
            
        } finally {
            setIsSubmitting(false);
        }
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
                    <select
                        required
                        value={formData.clientId}
                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm bg-white focus:border-primary focus:outline-none"
                    >
                        <option value="">Seleccione un cliente...</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Orden</label>
                    <input
                        type="text"
                        placeholder="Ej: Instalación de Paneles Térmicos"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asignar Técnico</label>
                    <select
                        value={formData.technicianId}
                        onChange={(e) => setFormData({ ...formData, technicianId: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm bg-white focus:border-primary focus:outline-none"
                    >
                        <option value="">Sin asignar / Seleccione un técnico...</option>
                        {technicians.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                                {tech.name} ({tech.email})
                            </option>
                        ))}
                    </select>
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
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED" })}
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm bg-white focus:border-primary focus:outline-none"
                    >
                        <option value="PENDING">Pendiente</option>
                        <option value="IN_PROGRESS">En Proceso</option>
                        <option value="COMPLETED">Completada</option>
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
                        disabled={isSubmitting}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isSubmitting ? "Guardando..." : "Guardar Orden"}
                    </button>
                </div>
            </form>
        </div>
    );
}