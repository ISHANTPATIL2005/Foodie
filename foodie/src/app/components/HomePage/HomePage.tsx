import Image from "next/image";
import Link from "next/link";
import Banner from "@/app/public/images/banner.jpg";
import{ Button }from "@/app/components/ui/Button";
import ProductList from "../products/ProductList";
import Products from "./Produts";
import { getAllProducts } from "@/app/lib/product";
import RestaurantCard from "../restaurant/RestaurantCard";
import RestaurantSection from "./restaurant"
import { get } from "http";
import { getRestaurants } from "@/app/lib/restaurants";



export default async function HomePage() {
     const products = await getAllProducts();
     const restaurants = await getRestaurants()
  return (
 <div>
       <section className="relative w-full h-[70vh] rounded-xl overflow-hidden">
      
     
      <Image
        src={Banner}
        alt="Home Banner"
        fill
        priority
        className="object-cover"
      />

     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-black/10" />


    
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-2xl px-4 text-white-300">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Cravings, Delivered.
          </h1>

          <p className="text-yellow-400 mb-6 font-semibold">
            Get your favorite meals delivered right to your doorstep with
            Foodie. Explore a wide range of cuisines and enjoy fast, reliable
            service.
          </p>

          {/* Search */}
         <div className="mb-8 flex justify-center">
  <div className="w-full max-w-xl">
    <input
      type="text"
      placeholder="Search for restaurants or dishes..."
      className="
        w-full px-6 py-4
        rounded-xl
        bg-white/95
        text-gray-900 placeholder-gray-400
        shadow-lg
        outline-none
        focus:ring-2 focus:ring-black/20
        transition
      "
    />
  </div>
</div>



          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/products"><Button variant="primary">Order Now</Button></Link>
           <Link href="/restaurants"> <Button variant="secondary">View Restaurants</Button></Link>
          </div>

        </div>
      </div>


    </section>

<div className="py-10">
   <Products products={products}/>
</div>
<RestaurantSection restaurants={restaurants}/>
 </div>
  );
}
