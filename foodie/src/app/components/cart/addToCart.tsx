"use client";
import {Button} from "@/app/components/ui/Button";
import { useCart } from "@/app/context/CartContext";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { addItem } = useCart();

  return (
    <Button
      onClick={() => addItem(productId)}
      variant="primary"
    >
      Add to Cart
    </Button>
  );
}
