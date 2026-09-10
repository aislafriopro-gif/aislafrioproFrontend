import React from "react";

export interface IMaterialItem {
    name: string;
    quantity: number;
}

interface MaterialListProps {
    materials: IMaterialItem[];
    onChange: (materials: IMaterialItem[]) => void;
}

export function MaterialList({ materials, onChange }: MaterialListProps) {
    const handleAdd = () => {
        onChange([...materials, { name: "", quantity: 1 }]);
    };

    const handleRemove = (index: number) => {
        if (materials.length > 1) {
            const updated = materials.filter((_, i) => i !== index);
            onChange(updated);
        }
    };

    const handleChange = (index: number, field: keyof IMaterialItem, value: string | number) => {
        const updated = materials.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        onChange(updated);
    };

    return (
        <div className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Materiales Utilizados</h2>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Agregar Material
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Nombre del material"
                            value={material.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                        />
                        <input
                            type="number"
                            min={1}
                            placeholder="Cant"
                            value={material.quantity}
                            onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
                            className="w-24 rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            disabled={materials.length === 1}
                            className="px-3 py-3 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}