"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/lib/product";
import AddToCartButton from "@/app/components/cart/addToCart";
import { getReatingsByProduct, Review } from "@/app/lib/reating";
import ReatingList from "@/app/components/reating/ReatingList";
import CreateReatingForm from "@/app/components/reating/createReating";
import VerticalProductSlider from "./ProductSlider";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetails({
  product,
  relatedProducts,
}: Props) {
  const [reatings, setReatings] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product?._id) return;

    getReatingsByProduct(product._id)
      .then(setReatings)
      .finally(() => setLoading(false));
  }, [product._id]);

  return (
    <section className="bg-[#FEF3E2] min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Product Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl">
            
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl"
            />

            {/* Info */}
            <div className="mt-5 space-y-4">
              <h1 className="text-2xl font-semibold text-[#7C2D12]">
                {product.name}
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xl font-bold text-[#F59E0B]">
                  ₹ {product.price}
                </span>

                <AddToCartButton productId={product._id} />
              </div>

              {!product.available && (
                <p className="text-sm text-red-600">
                  Out of stock
                </p>
              )}
            </div>

            <hr className="my-6 border-[#EADBC8]" />

            {/* Reviews */}
            <h2 className="text-lg font-semibold text-[#7C2D12] mb-3">
              Reviews
            </h2>

            <CreateReatingForm
              productId={product._id}
              onSuccess={(newReview) =>
                setReatings((prev) => [newReview, ...prev])
              }
            />

            {loading ? (
              <p className="text-sm text-gray-500 mt-3">
                Loading reviews...
              </p>
            ) : (
              <ReatingList reatings={reatings} />
            )}
          </div>
        </div>

        {/* RIGHT: Related Products */}
        <aside className="space-y-4">
          <h3 className="text-lg font-semibold text-[#7C2D12]">
            You may also like
          </h3>

          <VerticalProductSlider products={relatedProducts} />

        </aside>
        

      </div>
    </section>
  );
}
