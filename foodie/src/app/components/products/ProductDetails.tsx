import { getProductById } from "@/app/lib/product";
import  AddToCartButton  from "@/app/components/cart/addToCart";
export default async function ProductDetails({
  productId,
}: {
  productId: string;
}) {
  const product = await getProductById(productId);

  return (
    <div className="p-6 max-w-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">
        {product.name}
      </h1>

      <p className="text-gray-600 mt-2">
        {product.description}
      </p>

      <p className="text-xl font-bold mt-4">
        ₹ {product.price}
      </p>
      <AddToCartButton productId={product._id} />
    


      {!product.available && (
        <p className="text-red-500 mt-2">
          Out of stock
        </p>
      )}
    </div>
  );
}
