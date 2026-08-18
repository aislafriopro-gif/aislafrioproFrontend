"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { register, RegisterCredentials } from "@/services/auth.service";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await register(formData);
      setSuccess(true);
      // Redirigir después de un registro exitoso
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      const errorMessage = isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message || "Ocurrió un error al intentar registrar la cuenta."
        : "Ocurrió un error al intentar registrar la cuenta.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen flex-col bg-gray-100">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-200 rounded-xl bg-white p-8 shadow-lg border border-gray-200">
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-gray-900">Crear cuenta</h1>
            <p className="mt-2 text-base text-gray-500">
              Ingresa tus datos para registrarte en la plataforma
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-600 border border-emerald-200">
              ¡Registro exitoso! Iniciando sesión...
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-900" htmlFor="name">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-900" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-900" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-base font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}