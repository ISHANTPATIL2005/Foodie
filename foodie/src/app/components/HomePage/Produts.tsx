import { Product } from "@/app/lib/product";
import ProductCard from "../products/ProductCard";

interface Props {
  products: Product[];
}

export default function Products({ products }: Props) {
  const firstFive = products.slice(0, 5);

  return (
    <section className="py-6">
           <h1 className="text-2xl font-bold text-center text-[#7C2D12]">Popular Dishes</h1>
    <h3 className="text-center text-gray-600 mb-6"> our most Most loved dishes just one clicked away.</h3>
  
      <div
        className="
          flex
          gap-6
          overflow-x-auto
          no-scrollbar
          pb-2
        "
      >
        {firstFive.map((product) => (
          <div
            key={product._id}
            className="min-w-[260px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
