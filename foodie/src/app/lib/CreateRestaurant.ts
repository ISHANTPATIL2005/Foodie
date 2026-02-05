const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api/v1";



export interface Restaurant {
  _id?: string;
  restaurantName: string;
  address: string;
  city: string;
  image: string;
  phone: number;
  latitude: number;
  longitude: number;
}

interface CreateRestaurantResponse {
  success: boolean;
  message: string;
  restaurant: Restaurant;
}



export async function createRestaurant(
  formData: FormData,
  token: string | null
): Promise<CreateRestaurantResponse> {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${API_BASE_URL}/restro/register`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
       
      },
      body: formData,
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to create restaurant"
    );
  }

  return result;
}
