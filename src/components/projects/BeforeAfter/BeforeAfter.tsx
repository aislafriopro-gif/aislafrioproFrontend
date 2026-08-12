"use client";

import { useId, useState } from "react";
import Image from "next/image";

export interface IBeforeAfterImages {
  before: {
    src: string;
    alt: string;
  };
  after: {
    src: string;
    alt: string;
  };
}

export interface IBeforeAfterProps {
  images: IBeforeAfterImages;
}

export function BeforeAfter({
  images,
}: IBeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const inputId = useId();

  return (
    <figure className="flex flex-col gap-md">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images.after.src}
          alt={images.after.alt}
          fill
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <Image
            src={images.before.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="object-cover"
          />
        </div>

        <span className="absolute left-sm top-sm rounded-sm bg-gray-900/80 px-sm py-xs text-small font-semibold text-white">
          Antes
        </span>

        <span className="absolute right-sm top-sm rounded-sm bg-gray-900/80 px-sm py-xs text-small font-semibold text-white">
          Después
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-y-0 border-l-2 border-white shadow-md"
          style={{
            left: `${position}%`,
          }}
        />
      </div>

      <div>
        <label
          htmlFor={inputId}
          className="text-small font-semibold text-gray-700"
        >
          Desliza para comparar las imágenes
        </label>

        <input
          id={inputId}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${position}% de la imagen anterior visible`}
          className="mt-sm w-full accent-primary"
        />
      </div>
    </figure>
  );
}