"use client";

import { useEffect, useState } from "react";
import Input from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { createRestaurant } from "@/app/lib/CreateRestaurant";
import {useAuth} from "@/app/context/AuthProvider"


export default function CreateRestaurantPage() {
  const {token}=useAuth();
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
    const token = localStorage.getItem("token");
    const accountType = localStorage.getItem("accountType");

    if (!token) {
      setError("Please login first");
      return;
    }

    if (accountType !== "restaurant") {
      setError("You are not authorized to create restaurants");
      return;
    }

    setAuthorized(true);
  }, []);

  
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "restaurantName",
        form.restaurantName
      );
      formData.append("address", form.address);
      formData.append("city", form.city);
      formData.append("phone", form.phone);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);

      if (form.image) {
        formData.append("image", form.image);
      }

      await createRestaurant(formData, token);

      alert("Restaurant created successfully");

     
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
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Create Restaurant
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          label="Restaurant Name"
          name="restaurantName"
          onChange={handleChange}
          required
        />

        <Input
          label="Address"
          name="address"
          onChange={handleChange}
          required
        />

        <Input
          label="City"
          name="city"
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          name="phone"
          type="number"
          onChange={handleChange}
          required
        />

        <Input
          label="Latitude"
          name="latitude"
          onChange={handleChange}
          required
        />

        <Input
          label="Longitude"
          name="longitude"
          onChange={handleChange}
          required
        />

        {/* IMAGE UPLOAD */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Restaurant Image
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) =>
              setForm({
                ...form,
                image:
                  e.target.files?.[0] || null,
              })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Creating..."
            : "Create Restaurant"}
        </Button>
      </form>
    </div>
  );
}
