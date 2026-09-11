"use client";

import React, { useState } from "react";

interface PhotoUploadProps {
    onPhotoSelected: (file: File) => void;
    uploading?: boolean;
}

export default function PhotoUpload({ onPhotoSelected, uploading = false }: PhotoUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            onPhotoSelected(file);
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Evidencia Fotográfica</label>
            
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="text-sm text-gray-500"><span className="font-semibold">Hacé clic para subir</span> o arrastrá la foto</p>
                        <p className="text-xs text-gray-400">PNG, JPG o JPEG</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
                </label>
            </div>

            {preview && (
                <div className="relative mt-2 w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
    );
}