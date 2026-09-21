// src/app/(dashboard)/mi-cuenta/page.tsx

"use client";

import { useState, FormEvent } from "react";
import { useAuthStore } from "@/store/auth.store";
import api from "@/lib/api";

interface ExtendedUser {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: unknown;
}

export default function MiCuentaPage() {
    const user = useAuthStore((state) => state.user) as ExtendedUser | null;
    const updateSession = useAuthStore((state) => state.updateSession);

    // Inicializamos los estados directamente desde el usuario
    const [name, setName] = useState(() => user?.name || "");
    const [email, setEmail] = useState(() => user?.email || "");
    const [phone, setPhone] = useState(() => user?.phone || "");

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCancel = () => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
        setIsEditing(false);
        setError(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const payload = {
            name,
            email,
            phone,
        };

        try {
            setIsSubmitting(true);

            if (!user?.id) {
                throw new Error("No se encontró el ID del usuario en la sesión.");
            }

            const endpoint = `/users/${user.id}`;
            
            const response = await api.patch(endpoint, payload, {
                timeout: 60000, 
            });

            const responseData = response.data as { phone?: string };

            // Evitamos 'any' usando un casting seguro mediante unknown
            updateSession({ 
                name, 
                email, 
                phone: responseData?.phone ? responseData.phone : phone 
            } as unknown as { name: string; email: string; phone: string });

            setSuccessMessage("Perfil actualizado correctamente.");
            setIsEditing(false);
        } catch (err: unknown) {
            
            setError("No se pudo actualizar el perfil. El servidor tardó en responder o los datos son incorrectos.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">Cargando datos de la cuenta...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-950">Mi Cuenta</h1>
                    <p className="mt-1 text-sm text-gray-800">
                        Consulta y actualiza la información de tu perfil personal.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(true);
                            setSuccessMessage(null);
                        }}
                        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                        Modificar
                    </button>
                )}
            </div>

            <div className="mt-6 rounded-lg bg-white p-6 shadow-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos del Perfil</h2>

                {successMessage && (
                    <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                        {error}
                    </div>
                )}

                {!isEditing ? (
                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Nombre completo
                            </span>
                            <p className="mt-1 text-base text-gray-900 font-medium">{name || "No especificado"}</p>
                        </div>

                        <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Correo electrónico
                            </span>
                            <p className="mt-1 text-base text-gray-900 font-medium">{email || "No especificado"}</p>
                        </div>

                        <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Teléfono
                            </span>
                            <p className="mt-1 text-base text-gray-900 font-medium">{phone || "No especificado"}</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-900">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Ej. +5491112345678"
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                            >
                                {isSubmitting ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}