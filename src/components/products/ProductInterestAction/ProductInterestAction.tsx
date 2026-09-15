import { WhatsAppButton } from "@/components/common/WhatsAppButton/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/constants/contact";

export interface IProductInterestActionProps {
  productSlug: string;
  productName: string;
  label?: string;
  className?: string;
}

export function ProductInterestAction({
  productSlug,
  productName,
  label = "Consultar por WhatsApp",
  className = "",
}: IProductInterestActionProps) {
  return (
    <div className={className}>
      <WhatsAppButton
        message={WHATSAPP_MESSAGES.product(productName)}
        aria-label={`Consultar por WhatsApp sobre ${productName}`}
        data-product-slug={productSlug}
        className="px-lg py-md text-h6"
      >
        {label}
      </WhatsAppButton>
    </div>
  );
}
