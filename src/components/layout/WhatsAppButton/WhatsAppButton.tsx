import type { AnchorHTMLAttributes } from "react";

export interface IWhatsAppButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  phoneNumber: string;
  message?: string;
  label?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = "",
  label = "Contactar por WhatsApp",
  className = "",
  ...props
}: IWhatsAppButtonProps) {
  const normalizedPhone = phoneNumber.replace(/\D/g, "");

  const href = message
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${normalizedPhone}`;

  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`fixed bottom-lg right-md z-40 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-secondary px-md py-sm font-medium text-white shadow-lg transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:bg-secondary/80 tablet:right-lg desktop:right-xl ${className}`}
    >
      WhatsApp
    </a>
  );
}