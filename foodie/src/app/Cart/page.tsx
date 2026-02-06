"use client";

import { useCart } from "@/app/context/CartContext";
import CartItem from "@/app/components/cart/cartList";
import CartSummary from "@/app/components/cart/cartSummery";
import { CartItemType } from "@/app/lib/cart";

export default function CartPage() {
  const { cart, loading } = useCart();

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      

      <div className="space-y-4">
        {cart.items.map((item: CartItemType) => (
          <CartItem key={item.product._id} item={item} />
        ))}
      </div>

      <CartSummary cart={cart} />
    </div>
  );
}
