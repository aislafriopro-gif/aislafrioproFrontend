import type { AnchorHTMLAttributes, ReactNode } from "react";
import { WHATSAPP_NUMBER } from "@/constants/contact";

export interface IWhatsAppButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  message: string;
  children?: ReactNode;
  floating?: boolean;
}

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} shrink-0`}
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.23-1.57A9.95 9.95 0 1 0 12.04 2Zm0 17.91a8.02 8.02 0 0 1-4.09-1.12l-.29-.17-3.1.93.96-3.02-.19-.31a7.93 7.93 0 1 1 6.71 3.69Zm4.4-5.94c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.25-.62.79-.76.95-.14.17-.28.19-.52.07-.24-.12-1.02-.37-1.94-1.2a7.3 7.3 0 0 1-1.34-1.66c-.14-.25-.02-.38.1-.5.11-.11.24-.29.36-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.13-.54-1.31-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.31-.22.25-.84.83-.84 2.01 0 1.19.86 2.33.98 2.5.12.16 1.7 2.58 4.11 3.62.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function WhatsAppButton({
  message,
  children = "WhatsApp",
  floating = false,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  "aria-label": ariaLabel,
  ...props
}: IWhatsAppButtonProps) {
  const normalizedPhone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const baseClasses = floating
    ? "fixed bottom-lg right-md z-40 size-[4.2rem] rounded-full shadow-lg tablet:right-lg desktop:right-xl"
    : "rounded-md px-md py-sm";
  const layoutClasses = `inline-flex items-center justify-center gap-sm bg-secondary-strong font-medium text-white ${baseClasses} ${className}`;
  const interactiveClasses =
    "transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-xs hover:bg-secondary-strong/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none";
  const content = (
    <>
      <WhatsAppIcon className={floating ? "size-12" : "size-6"} />
      {!floating && <span>{children}</span>}
    </>
  );

  if (!normalizedPhone) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        title="Número de WhatsApp pendiente de confirmación"
        className={`${layoutClasses} cursor-not-allowed opacity-50`}
      >
        {content}
      </span>
    );
  }

  const href = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`${layoutClasses} ${interactiveClasses}`}
    >
      {content}
    </a>
  );
}
