"use client";

import { Address } from "@/app/lib/address";

interface Props {
  address?: Address; // 👈 optional
  onEdit: () => void;
}

export default function AddressCard({ address, onEdit }: Props) {
  // ✅ HARD GUARD
  if (!address) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="font-semibold text-gray-900">
        {address.house}
      </p>

      <p className="text-sm text-gray-600 mt-1">
        {address.area}
      </p>

      {address.landmark && (
        <p className="text-sm text-gray-500 mt-1">
          Landmark: {address.landmark}
        </p>
      )}

      <button
        type="button"
        onClick={onEdit}
        className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
      >
        Edit
      </button>
    </div>
  );
}
