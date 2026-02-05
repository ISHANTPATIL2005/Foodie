import Link from "next/link";
import { Restaurant } from "@/app/lib/restaurants";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
   <Link href={`/restaurants/${restaurant._id}`}>
      <div className="border rounded p-4 hover:shadow cursor-pointer">
        <img
          src={restaurant.image}
          alt={restaurant.restaurantName}
          className="h-40 w-full object-cover rounded"
        />

        <h2 className="text-lg font-semibold mt-2">
          {restaurant.restaurantName}
        </h2>

        <p className="text-sm text-gray-500">
          {restaurant.city}
        </p>
      </div>
    </Link>
  );
}
