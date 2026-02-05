const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";



export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  createdAt: string;
}



interface GetAllProductsResponse {
  success: boolean;
  products: Product[];
}

interface GetProductByIdResponse {
  success: boolean;
  product: Product;
}



// ✅ GET ALL PRODUCTS
export async function getAllProducts(): Promise<Product[]> {
  const url = `${API_BASE_URL}/product/getAllProduct`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText} - ${body}`);
  }

  const result: GetAllProductsResponse = await res.json();
  return result.products;
}

// ✅ GET PRODUCT BY ID
export async function getProductById(
  productId: string
): Promise<Product> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const url = `${API_BASE_URL}/product/getProduct/${productId}`;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText} - ${body}`);
  }

  const result: GetProductByIdResponse = await res.json();
  return result.product;
}
