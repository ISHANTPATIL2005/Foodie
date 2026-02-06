export const dynamic = "force-dynamic";

import ProductDetails from "@/app/components/products/ProductDetails";
import { getProductById, getAllProducts } from "@/app/lib/product";
import type { Product } from "@/app/lib/product";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  if (!productId) {
    return <p>Invalid product ID</p>;
  }

  // 1️⃣ Get current product
  const product = await getProductById(productId);

  // 2️⃣ Get all products
  const allProducts: Product[] = await getAllProducts();

  // 3️⃣ Remove current product from list
  const relatedProducts = allProducts.filter(
    (p) => p._id !== product._id
  );

  return (
    <ProductDetails
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
