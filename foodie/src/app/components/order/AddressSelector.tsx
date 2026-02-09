"use client";

import { useEffect, useState } from "react";
import { getAddresses, Address } from "@/app/lib/address";
import { useAuth } from "@/app/context/AuthProvider";

interface Props {
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
}

export default function AddressSelector({
  selectedAddressId,
  onSelect,
}: Props) {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    getAddresses(token)
      .then((res) => {
        setAddresses(res);
        if (res.length > 0 && !selectedAddressId) {
          onSelect(res[0]._id);
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading addresses...</p>;
  if (addresses.length === 0)
    return <p className="text-sm text-gray-500">No address found</p>;

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <div
          key={address._id}
          onClick={() => onSelect(address._id)}
          className={`border rounded-lg p-3 cursor-pointer ${
            selectedAddressId === address._id
              ? "border-orange-500 bg-orange-50"
              : ""
          }`}
        >
          <p className="font-medium">
            {address.house}, {address.area}
          </p>
          <p className="text-sm text-gray-500">
            {address.landmark}
          </p>
        </div>
      ))}
    </div>
  );
}
