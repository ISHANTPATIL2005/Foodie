import RestaurantDetails from "@/app/components/restaurant/RestaurantDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;

  if (!restaurantId) {
    return <p>Invalid restaurant ID</p>;
  }

  return (
    <RestaurantDetails restaurantId={restaurantId} />
  );
}
