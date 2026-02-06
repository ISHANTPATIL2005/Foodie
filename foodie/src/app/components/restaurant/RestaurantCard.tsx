import Link from "next/link";
import { Restaurant } from "@/app/lib/restaurants";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link href={`/restaurants/${restaurant._id}`} className="group">
      <div
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          border
          shadow-sm
          hover:shadow-lg
          transition
          duration-300
          cursor-pointer
        "
      >
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.restaurantName}
            className="
              h-44
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {restaurant.restaurantName}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {restaurant.city}
          </p>
        </div>
      </div>
    </Link>
  );
}
