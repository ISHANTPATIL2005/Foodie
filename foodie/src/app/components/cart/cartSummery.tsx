import { Button } from "@/app/components/ui/Button";

export default function CartSummary({ cart }: { cart: any }) {
  const total = cart.items.reduce(
    (sum: number, item: any) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="
      mt-8
      bg-white
      rounded-2xl
      p-6
      shadow-md
      border
    ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Total Amount
        </h2>
        <span className="text-2xl font-bold text-[#F59E0B]">
          ₹{total}
        </span>
      </div>

      <Button
        variant="primary"
        className="
          mt-6
          w-full
          py-3
          rounded-xl
          text-lg
          shadow-md
          hover:shadow-lg
          transition
        "
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
