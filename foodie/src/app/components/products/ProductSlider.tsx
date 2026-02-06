import { Product } from "@/app/lib/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function VerticalProductSlider({ products }: Props) {
  if (products.length === 0) {
    return (
      <p className="text-center text-[#78350F] py-10">
        No products available.
      </p>
    );
  }

  return (
    <section className="py-5">
      <div
        className="
          h-[100vh]
          overflow-y-auto
          flex
          flex-col
          gap-6
          snap-y
          snap-mandatory
          scrollbar-thin
          scrollbar-thumb-[#78350F]
        "
      >
        {products.map((product) => (
          <div key={product._id} className="snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
 