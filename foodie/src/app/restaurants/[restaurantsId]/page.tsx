import RestaurantDetails from "@/app/components/restaurant/RestaurantDetails";

export default function Page({
  params,
}: {
  params: { restaurantId: string };
}) {
  return (
    <RestaurantDetails
      restaurantId={params.restaurantId}
    />
  );
}
