"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthProvider";

export default function ProfileMenu() {
  const { accountType, logout } = useAuth();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      
      {accountType === "restaurant" && (
        <Link
          href="/products/newProduct"
          className="block px-4 py-2 text-sm hover:bg-gray-100"
        >
          ➕ Add Dish
        </Link>
      )}

      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        🚪 Logout
      </button>
    </div>
  );
}
