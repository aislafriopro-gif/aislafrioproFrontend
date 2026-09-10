"use client";

import { ProductInquiryForm } from "@/components/products/ProductInquiryForm/ProductInquiryForm";
import { Button } from "@/components/ui/Button/Button";
import { Modal } from "@/components/ui/Modal/Modal";
import { useModal } from "@/hooks/useModal";

export interface IProductInterestActionProps {
  productSlug: string;
  label?: string;
  className?: string;
}

export function ProductInterestAction({
  productSlug,
  label = "Me interesa",
  className = "",
}: IProductInterestActionProps) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className={className}>
      <Button
        type="button"
        variant="primary"
        size="lg"
        animated
        onClick={openModal}
      >
        {label}
      </Button>

      <Modal
        open={isOpen}
        onClose={closeModal}
        title="Consultar sobre este producto"
      >
        <ProductInquiryForm productSlug={productSlug} />
      </Modal>
    </div>
  );
}
