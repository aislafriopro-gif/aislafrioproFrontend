import { Button } from "@/components/ui/Button/Button";

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
  return (
    <form
      action="/contacto"
      method="get"
      className={className}
    >
      <input
        type="hidden"
        name="producto"
        value={productSlug}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        animated
      >
        {label}
      </Button>
    </form>
  );
}