export const WHATSAPP_NUMBER = "573104028805";

export const WHATSAPP_MESSAGES = {
  general:
    "Hola, quiero recibir información sobre los servicios de AislaFrioPro.",
  product: (productName: string) =>
    `Hola, estoy interesado en el producto ${productName}. Quisiera recibir más información.`,
} as const;
