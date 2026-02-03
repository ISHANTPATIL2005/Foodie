import { getRestaurants } from "@/app/lib/restaurants";
import RestaurantCard from "./RestaurantCard";

export default async function RestaurantsList() {
  const restaurants = await getRestaurants();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
}
