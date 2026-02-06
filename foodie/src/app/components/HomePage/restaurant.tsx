import {Restaurant} from "@/app/lib/restaurants";
import RestaurantCard from "../restaurant/RestaurantCard";

interface Props {
  restaurants: Restaurant[];
}
export default async function RestaurantSection({ restaurants }: Props) {
  const firstFive = restaurants.slice(0, 5);
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-center text-[#7C2D12]">Featured Restaurants</h1>
      <h3 className="text-center text-gray-600 mb-6">Discover top-rated restaurants loved by our community</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {firstFive.map((restaurant) => (
          <RestaurantCard  restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}