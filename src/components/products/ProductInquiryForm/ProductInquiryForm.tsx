"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";

export interface IProductInquiryFormProps {
  productSlug: string;
}

export function ProductInquiryForm({
  productSlug,
}: IProductInquiryFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-md"
    >
      <input
        type="hidden"
        name="productSlug"
        value={productSlug}
      />

      <Input
        id="product-inquiry-name"
        name="name"
        label="Nombre"
        placeholder="Ingresa tu nombre"
        autoComplete="name"
        required
      />

      <div className="grid gap-md tablet:grid-cols-2">
        <Input
          id="product-inquiry-email"
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          required
        />

        <Input
          id="product-inquiry-phone"
          name="phone"
          type="tel"
          label="Teléfono"
          placeholder="Número de contacto"
          autoComplete="tel"
          required
        />
      </div>

      <Textarea
        id="product-inquiry-message"
        name="message"
        label="Mensaje"
        placeholder="Cuéntanos qué necesitas sobre este producto"
        rows={5}
        required
      />

      <p className="text-small text-gray-500">
        El envío de consultas se habilitará cuando esté disponible la integración.
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        animated
        className="self-start"
      >
        Enviar consulta
      </Button>
    </form>
  );
}