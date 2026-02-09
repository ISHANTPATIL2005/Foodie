"use client";

import { useEffect, useState } from "react";
import Input from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { createRestaurant } from "@/app/lib/CreateRestaurant";
import { useAuth } from "@/app/context/AuthProvider";

export default function CreateRestaurantPage() {
  const { token } = useAuth();

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    city: "",
    phone: "",
    latitude: "",
    longitude: "",
    image: null as File | null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const accountType = localStorage.getItem("accountType");

    if (!storedToken) {
      setError("Please login first");
      return;
    }

    if (accountType !== "restaurant") {
      setError("You are not authorized to create restaurants");
      return;
    }

    setAuthorized(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "image" && value) {
          formData.append(key, value);
        }
      });

      if (form.image) {
        formData.append("image", form.image);
      }

      await createRestaurant(formData, token);

      setForm({
        restaurantName: "",
        address: "",
        city: "",
        phone: "",
        latitude: "",
        longitude: "",
        image: null,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            🏪 Create Restaurant
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Register your restaurant on the platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Input
            label="Restaurant Name"
            name="restaurantName"
            value={form.restaurantName}
            onChange={handleChange}
            placeholder="Restaurant Name"
            required
          />

          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="number"
              value={form.phone}
              onChange={handleChange}
              placeholder="0000000000"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Latitude"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              required
            />

            <Input
              label="Longitude"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Restaurant Image
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
              className="
                w-full rounded-xl border border-dashed border-gray-400 px-4 py-3
                text-gray-600
                file:mr-4 file:rounded-lg file:border-0
                file:bg-indigo-50 file:px-4 file:py-2
                file:text-indigo-700 file:font-semibold
                hover:file:bg-indigo-100 transition
              "
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full h-12 text-lg font-bold"
          >
            {loading ? "Creating Restaurant..." : "Create Restaurant"}
          </Button>
        </form>
      </div>
    </div>
  );
}
