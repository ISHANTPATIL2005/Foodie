"use client";

export default function OrderItems({ items }: { items: any[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const qty = item.qty ?? item.quantity ?? 1;
        return (
          <div
            key={item.product._id}
            className="flex justify-between"
          >
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">Qty: {qty}</p>
            </div>
            <p className="font-medium">
              ₹{item.product.price * qty}
            </p>
          </div>
        );
      })}
    </div>
  );
}
