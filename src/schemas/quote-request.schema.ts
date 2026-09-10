import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(150, "El nombre no puede superar 150 caracteres."),

  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo válido.")
    .max(255, "El correo no puede superar 255 caracteres."),

  phone: z
    .string()
    .trim()
    .min(7, "El teléfono debe tener al menos 7 caracteres.")
    .max(50, "El teléfono no puede superar 50 caracteres."),

  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(1000, "La descripción no puede superar 1000 caracteres."),

  materials: z
    .string()
    .trim()
    .max(
      1000,
      "Los materiales u observaciones no pueden superar 1000 caracteres.",
    )
    .optional(),
});

export type QuoteRequestFormValues = z.infer<
  typeof quoteRequestSchema
>;