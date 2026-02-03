const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export interface Restaurant {
  _id: string;
  restaurantName: string;
  address: string;
  city: string;
  image: string;
  phone: number;
  owner: string;
  createdAt: string;
}



interface GetAllRestaurantsResponse {
  success: boolean;
  restaurants: Restaurant[];
}

interface GetRestaurantByIdResponse {
  success: boolean;
  restaurant: Restaurant;
}


// 1️⃣ GET ALL restaurants
export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${API_BASE_URL}/restro/getAll`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  const result: GetAllRestaurantsResponse = await res.json();
  return result.restaurants;
}


export async function getRestaurantById(
  restaurantId: string
): Promise<Restaurant> {
  const res = await fetch(
    `${API_BASE_URL}/restro/getMyRestaurant/${restaurantId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  const result: GetRestaurantByIdResponse = await res.json();
  return result.restaurant;
}

