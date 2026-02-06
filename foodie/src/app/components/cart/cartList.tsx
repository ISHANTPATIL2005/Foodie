"use client";

import { Button } from "@/app/components/ui/Button";
import { useCart } from "@/app/context/CartContext";
import type { CartItemType } from "@/app/lib/cart";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateItem, removeItem } = useCart();

  return (
    <div className="
      flex flex-col sm:flex-row
      justify-between items-start sm:items-center
      gap-4
      bg-white
      rounded-2xl
      p-5
      shadow-sm
      hover:shadow-md
      transition
      border
    ">
      {/* Product info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          ₹{item.product.price}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="
          flex items-center
          border rounded-full
          px-3 py-1
          bg-gray-50
        ">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() =>
              updateItem(item.product._id, item.quantity - 1)
            }
            disabled={item.quantity <= 1}
          >
            −
          </Button>

          <span className="mx-3 font-medium text-black">
            {item.quantity}
          </span>

          <Button 
            variant="outline"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() =>
              updateItem(item.product._id, item.quantity + 1)
            }
          >
            +
          </Button>
        </div>

        <Button
          variant="danger"
          className="rounded-full px-4"
          onClick={() => removeItem(item.product._id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
