import { getRestaurantById } from "@/app/lib/restaurants";

interface Props {
  restaurantId: string;
}

export default async function RestaurantDetails({
  restaurantId,
}: Props) {
  const restaurant = await getRestaurantById(restaurantId);

  return (
    <div className="p-6">
      <img
        src={restaurant.image}
        alt={restaurant.restaurantName}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">
        {restaurant.restaurantName}
      </h1>

      <p className="text-gray-600">{restaurant.city}</p>
      <p className="mt-2">{restaurant.address}</p>
      <p className="mt-2">📞 {restaurant.phone}</p>
    </div>
  );
}
