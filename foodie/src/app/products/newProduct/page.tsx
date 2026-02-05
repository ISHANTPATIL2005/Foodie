// src/app/products/newProduct/CreateProductForm.tsx
"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { createProduct } from "@/app/lib/createProduct";
import { useRouter } from "next/navigation";
import {useAuth} from "@/app/context/AuthProvider"

export default function CreateProductForm({ restaurantId }: { restaurantId: string }) {

  const {token}=useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | null,
    category: "",
    available: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createProduct(
  {
    name: form.name,
    description: form.description,
    price: Number(form.price),
    category: form.category,
    available: form.available,
    image: form.image,
    restaurant: restaurantId,
  },
  token
);


      alert("Product created successfully");
      router.refresh();

      setForm({
        name: "",
        description: "",
        price: "",
        image: null,
        category: "",
        available: true,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Product Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Description" name="description" value={form.description} onChange={handleChange} required />
        <Input label="Price" name="price" type="number" value={form.price} onChange={handleChange} required />

        <div className="space-y-1">
          <label className="text-sm font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <Input label="Category" name="category" value={form.category} onChange={handleChange} required />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}