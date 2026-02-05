import { Product } from "@/app/lib/product";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded p-4 hover:shadow cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded"
        />

        <h3 className="text-lg font-semibold mt-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex justify-between mt-2">
          <span className="font-bold">
            ₹ {product.price}
          </span>

          {!product.available && (
            <span className="text-red-500 text-sm">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
