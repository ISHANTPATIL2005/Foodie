// src/app/lib/createProduct.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";



export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant: string;
  category: string;
  available: boolean;
  createdAt: string;
}

interface CreateProductResponse {
  success: boolean;
  message: string;
  product: Product;
}

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number | string;
  image: File | string | null;
  restaurant?: string;
  category: string;
  available: boolean;
};



export async function createProduct(
  data: CreateProductPayload,
  token: string | null
): Promise<CreateProductResponse> {
  if (!token) {
    throw new Error("Unauthorized");
  }

  let res: Response;

 
  if (data.image instanceof File) {
    const form = new FormData();

    form.append("name", String(data.name));
    form.append("description", String(data.description));
    form.append("price", String(data.price));
    form.append("category", String(data.category));
    form.append("available", String(data.available));

    if (data.restaurant) {
      form.append("restaurant", data.restaurant);
    }

    form.append("image", data.image);

    res = await fetch(`${API_BASE_URL}/product/createProduct`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
      body: form,
    });
  }
 
  else {
    res = await fetch(`${API_BASE_URL}/product/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        available: data.available,
        ...(typeof data.image === "string" && { image: data.image }),
        ...(data.restaurant && { restaurant: data.restaurant }),
      }),
    });
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.message || "Failed to create product");
  }

  return json as CreateProductResponse;
}
