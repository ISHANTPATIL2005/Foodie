"use client";

import { useEffect, useState } from "react";
import { getAddresses, Address } from "@/app/lib/address";
import { useAuth } from "@/app/context/AuthProvider";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";

export default function AddressPage() {
  const { token } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchAddresses() {
    if (!token) {
      setAddresses([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await getAddresses(token);
    setAddresses(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT – ADDRESS LIST */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-extrabold text-gray-900">
            📦 My Addresses
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : addresses.length === 0 ? (
            <p className="text-gray-600">No addresses found.</p>
          ) : (
           addresses
  .filter(Boolean) // 👈 THIS IS KEY
  .map((addr) => (
    <AddressCard
      key={addr._id}
      address={addr}
      onEdit={() => handleEdit(addr)}
    />
  ))

          )}
        </div>

        {/* RIGHT – FORM */}
        <div>
          {showForm && (
            <AddressForm
              address={selectedAddress}
              onSuccess={() => {
                setShowForm(false);
                setSelectedAddress(null);
                fetchAddresses();
              }}
              onCancel={() => {
                setShowForm(false);
                setSelectedAddress(null);
              }}
            />
          ) || (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-2xl bg-indigo-600 py-4 text-white font-bold shadow-lg hover:bg-indigo-700 transition"
            >
              ➕ Add New Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
