import ProductDetails from "@/app/components/products/ProductDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  if (!productId) {
    return <p>Invalid product ID</p>;
  }

  return <ProductDetails productId={productId} />;
}
