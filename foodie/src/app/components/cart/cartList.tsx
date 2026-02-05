"use client";

import { Button } from "@/app/components/ui/Button";
import { useCart } from "@/app/context/CartContext";
import type { CartItemType } from "@/app/lib/cart";


export default function CartItem({ item }: { item: CartItemType }) {
  const { updateItem, removeItem } = useCart();

  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <div>
        <h3 className="font-semibold">{item.product.name}</h3>
        <p>₹{item.product.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            updateItem(item.product._id, item.quantity - 1)
          }
          disabled={item.quantity <= 1}
        >
          −
        </Button>

        <span>{item.quantity}</span>

        <Button
          variant="outline"
          onClick={() =>
            updateItem(item.product._id, item.quantity + 1)
          }
        >
          +
        </Button>

        <Button
          variant="danger"
          onClick={() => removeItem(item.product._id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
