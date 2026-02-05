import { Button } from "@/app/components/ui/Button";

export default function CartSummary({ cart }: { cart: any }) {
  const total = cart.items.reduce(
    (sum: number, item: any) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-bold">
        Total: ₹{total}
      </h2>

      <Button
        variant="primary"
        className="mt-4 w-full"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
