"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthProvider";
import { createOrder } from "@/app/lib/order";
import { Button } from "@/app/components/ui/Button";

import AddressSelector from "@/app/components/order/AddressSelector";
import PaymentSelector from "@/app/components/order/PaymentSelector";
import OrderItems from "@/app/components/order/OrderItems";

export default function CheckoutPage() {
  const { cart, loading } = useCart();
  const { token } = useAuth();

  const [selectedAddressId, setSelectedAddressId] =
    useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState("COD");

  if (loading) return <p className="p-6">Loading cart...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="p-6">Your cart is empty</p>;

  const subtotal = cart.items.reduce((sum: number, item: any) => {
    const qty = item.qty ?? item.quantity ?? 1;
    return sum + item.product.price * qty;
  }, 0);

  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select an address");
      return;
    }

    const items = cart.items.map((item: any) => ({
      product: item.product._id,
      quantity: item.qty ?? item.quantity ?? 1,
    }));

    await createOrder(token!, {
      items,
      address: selectedAddressId,
      paymentMode,
    });

    alert("Order placed successfully ✅");
  };

  return (
    <div className="min-h-screen bg-[#FFF6EA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">
          Order Summary
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="font-semibold mb-4">Your Items</h2>
              <OrderItems items={cart.items} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <p className="font-semibold mb-3">
                  Delivery Address
                </p>
                <AddressSelector
                  selectedAddressId={selectedAddressId}
                  onSelect={setSelectedAddressId}
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5">
                <p className="font-semibold mb-3">
                  Payment Method
                </p>
                <PaymentSelector
                  paymentMode={paymentMode}
                  onChange={setPaymentMode}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-orange-500 text-white rounded-xl p-6 h-fit">
            <h2 className="font-semibold mb-4">
              Price Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="border-t border-orange-300 pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              onClick={placeOrder}
              className="mt-6 w-full bg-white text-orange-500 font-semibold py-3 rounded-lg"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
