import ProductList from "@/app/components/products/ProductList";
import { getAllProducts } from "@/app/lib/product";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Products
      </h1>

      <ProductList products={products} />
    </div>
  );
}
