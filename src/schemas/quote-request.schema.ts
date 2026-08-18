import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio."),

  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo válido."),

  phone: z
    .string()
    .trim()
    .min(7, "El teléfono debe tener al menos 7 caracteres."),

  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria."),

  materials: z
    .string()
    .trim()
    .optional(),
});

export type QuoteRequestFormValues = z.infer<typeof quoteRequestSchema>;