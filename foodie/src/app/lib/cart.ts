const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItemType {
  product: CartProduct;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItemType[];
}


async function cartFetch(
  url: string,
  options: RequestInit,
  token: string | null
) {
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Cart API error");
  }

  return res.json();
}

export const getCart = (token: string | null) =>
  cartFetch(`${API_BASE_URL}/product/getCart`, { method: "GET" }, token);

export const addToCart = (
  productId: string,
  quantity: number,
  token: string | null
) =>
  cartFetch(
    `${API_BASE_URL}/product/addToCart`,
    {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    },
    token
  );

export const updateCartItem = (
  productId: string,
  quantity: number,
  token: string | null
) =>
  cartFetch(
    `${API_BASE_URL}/product/updateCart`,
    {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    },
    token
  );

export const removeCartItem = (
  productId: string,
  token: string | null
) =>
  cartFetch(
    `${API_BASE_URL}/product/removeCart`,
    {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    },
    token
  );

export const clearCart = (token: string | null) =>
  cartFetch(`${API_BASE_URL}/cart/clear`, { method: "DELETE" }, token);
