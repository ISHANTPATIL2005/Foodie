"use client";

import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

interface CartItem {
  product: {
    price: number;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

export default function CartSummary({
  cart,
}: {
  cart?: Cart; // 👈 OPTIONAL
}) {
  // ✅ SAFE DEFAULT
  const items = cart?.items ?? [];

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className="
        mt-8
        bg-white
        rounded-2xl
        p-6
        shadow-md
        border
      "
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Total Amount
        </h2>
        <span className="text-2xl font-bold text-[#F59E0B]">
          ₹{total}
        </span>
      </div>

      <Link href="/order">
        <Button
          variant="primary"
          className="
            mt-6
            w-full
            py-3
            rounded-xl
            text-lg
            shadow-md
            hover:shadow-lg
            transition
          "
        >
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}
