import React from "react";

interface DiligenceFormProps {
    workDone: string;
    observations: string;
    onChangeWorkDone: (value: string) => void;
    onChangeObservations: (value: string) => void;
}

export function DiligenceForm({
    workDone,
    observations,
    onChangeWorkDone,
    onChangeObservations,
}: DiligenceFormProps) {
    return (
        <div className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Detalles de la Ejecución</h2>
            
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Trabajo Realizado</label>
                <textarea
                    rows={4}
                    value={workDone}
                    onChange={(e) => onChangeWorkDone(e.target.value)}
                    placeholder="Describa detalladamente el trabajo técnico realizado..."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Observaciones</label>
                <textarea
                    rows={3}
                    value={observations}
                    onChange={(e) => onChangeObservations(e.target.value)}
                    placeholder="Observaciones adicionales, notas o recomendaciones..."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                />
            </div>
        </div>
    );
}