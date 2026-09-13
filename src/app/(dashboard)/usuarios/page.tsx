// src/app/(dashboard)/usuarios/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { DataTable, type IDataTableRow } from "@/components/dashboard/DataTable/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { Button } from "@/components/ui/Button/Button";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/config/permissions";
import api from "@/lib/api";

const userColumns = [
  { id: "name", label: "Nombre" },
  { id: "email", label: "Correo" },
  { id: "role", label: "Rol" },
  { id: "status", label: "Estado" },
  { id: "actions", label: "Acciones" },
] as const;

interface ApiRole {
  id: string;
  name: string;
}

interface ApiUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: ApiRole | string;
  status?: string;
}

const FALLBACK_ROLES = [
  { id: "eb60dd23-625e-4f9a-aa06-760e317aba1b", name: "ADMIN" },
  { id: "86399542-6067-4568-a4bf-c55f79294b39", name: "CLIENT" },
  { id: "a2d0ebb9-a425-4788-8a1f-d6a1084935ee", name: "USER" },
  { id: "e9b4a4f5-1da0-4d13-ad96-e2478454c6b1", name: "TECHNICIAN" },
];

export default function Page() {
  const [users, setUsers] = useState<IDataTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);
  const [newName, setNewName] = useState("");
  const [newRoleId, setNewRoleId] = useState("");
  const [initialRoleId, setInitialRoleId] = useState("");
  const [availableRoles] = useState<ApiRole[]>(FALLBACK_ROLES);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get<{ data: ApiUser[] } | ApiUser[]>("/users");
      const rawData = response.data;
      const usersList = Array.isArray(rawData) 
        ? rawData 
        : (rawData && Array.isArray((rawData as { data: ApiUser[] }).data) ? (rawData as { data: ApiUser[] }).data : []);

      const formattedRows: IDataTableRow[] = usersList.map((user) => {
        const roleName = typeof user.role === "object" && user.role !== null 
          ? user.role.name 
          : String(user.role || "N/A");

        return {
          id: user.id || Math.random().toString(),
          cells: {
            name: user.name || "Sin nombre",
            email: user.email || "Sin correo",
            role: roleName,
            status: user.status || "Activo",
            actions: (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  setEditingUser(user);
                  setNewName(user.name || "");
                  const currentRoleId = typeof user.role === "object" && user.role !== null ? user.role.id || "" : "";
                  setNewRoleId(currentRoleId);
                  setInitialRoleId(currentRoleId);
                }}
              >
                Editar
              </Button>
            ),
          },
        };
      });

      setUsers(formattedRows);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchUsers();
    });
  }, [fetchUsers]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await api.patch(`/users/${editingUser.id}`, {
        name: newName,
      });

      if (newRoleId && newRoleId !== initialRoleId) {
        await api.patch(`/users/${editingUser.id}/role`, {
          roleId: newRoleId,
        });
      }

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <ProtectedRoute allowedRoles={PERMISSIONS.adminOnly}>
      <section aria-labelledby="users-content-title">
        <PageHeader
          id="users-content-title"
          title="Usuarios"
          description="Administra la información y los permisos de los usuarios del sistema."
          actions={
            <Button onClick={() => alert("Modal de creación próximamente")}>
              Agregar usuario
            </Button>
          }
        />

        <div className="mt-lg">
          <DataTable
            caption="Listado de usuarios"
            columns={userColumns}
            rows={users}
            emptyState={
              <EmptyState
                title={isLoading ? "Cargando usuarios..." : "No hay usuarios para mostrar"}
                description={
                  isLoading
                    ? "Por favor espera un momento mientras se obtienen los datos."
                    : "No se encontraron registros de usuarios en el sistema."
                }
                descriptionAlign="left"
              />
            }
          />
        </div>

        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-200 rounded-lg bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Editar Usuario</h2>
              <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rol del sistema</label>
                  <select
                    value={newRoleId}
                    onChange={(e) => setNewRoleId(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none bg-white"
                  >
                    <option value="">Selecciona un rol</option>
                    {availableRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button type="button" variant="secondary" onClick={() => setEditingUser(null)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
