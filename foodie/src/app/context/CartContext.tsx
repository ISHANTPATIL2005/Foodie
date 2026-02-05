"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as cartApi from "@/app/lib/cart";
import { useAuth } from "./AuthProvider";
import { Cart } from "@/app/lib/cart";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (productId: string, qty?: number) => Promise<void>;
  updateItem: (productId: string, qty: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load cart after login
  useEffect(() => {
    if (!token) {
      setCart(null);
      setLoading(false);
      return;
    }

    cartApi
      .getCart(token)
      .then((res) => setCart(res.cart))
      .finally(() => setLoading(false));
  }, [token]);

  const value: CartContextType = {
    cart,
    loading,

    addItem: async (id, qty = 1) => {
      const res = await cartApi.addToCart(id, qty, token);
      setCart(res.cart);
    },

    updateItem: async (id, qty) => {
      const res = await cartApi.updateCartItem(id, qty, token);
      setCart(res.cart);
    },

    removeItem: async (id) => {
      const res = await cartApi.removeCartItem(id, token);
      setCart(res.cart);
    },

    clear: async () => {
      const res = await cartApi.clearCart(token);
      setCart(res.cart);
    },
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
