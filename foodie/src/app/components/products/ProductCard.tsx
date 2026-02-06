import { Product } from "@/app/lib/product";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product._id}`} className="group">
      <div
        className="
          bg-white
          border border-[#EADBC8]
          rounded-2xl
          overflow-hidden
          transition-all duration-200
          hover:shadow-xl hover:-translate-y-1
        "
      >
        {/* Image */}
        <div className="relative h-44 bg-[#FFF7ED]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-[#7C2D12] group-hover:text-[#92400E] transition">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-[#F59E0B]">
              ₹ {product.price}
            </span>

            {!product.available && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-600">
                Out of stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
