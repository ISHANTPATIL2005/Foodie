"use client";

interface Props {
  paymentMode: string;
  onChange: (mode: string) => void;
}

export default function PaymentSelector({
  paymentMode,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      {["COD", "ONLINE"].map((mode) => (
        <div
          key={mode}
          onClick={() => onChange(mode)}
          className={`border rounded-lg p-3 cursor-pointer ${
            paymentMode === mode
              ? "border-orange-500 bg-orange-50"
              : ""
          }`}
        >
          <p className="font-medium">
            {mode === "COD"
              ? "Cash on Delivery"
              : "Online Payment"}
          </p>
        </div>
      ))}
    </div>
  );
}
