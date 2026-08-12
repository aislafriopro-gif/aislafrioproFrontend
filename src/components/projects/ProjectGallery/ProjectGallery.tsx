"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card/Card";

export interface IProjectGalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface IProjectGalleryProps {
  images: readonly IProjectGalleryImage[];
}

export function ProjectGallery({
  images,
}: IProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex] ?? images[0];

  if (!selectedImage) {
    return (
      <Card
        role="status"
        className="text-center"
      >
        <h2 className="text-h5 font-semibold text-gray-900">
          Galería no disponible
        </h2>

        <p className="mt-sm text-body text-gray-700">
          Este proyecto todavía no tiene imágenes disponibles.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-label="Seleccionar imagen del proyecto"
        className="grid grid-cols-2 gap-sm tablet:grid-cols-4"
      >
        {images.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Mostrar imagen ${index + 1}`}
              aria-pressed={isSelected}
              className={`relative aspect-[4/3] overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}