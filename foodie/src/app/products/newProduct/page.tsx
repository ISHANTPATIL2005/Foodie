"use client";

import { useState } from "react";
import { createProduct } from "@/app/lib/createProduct";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthProvider";

export default function CreateProductForm({ restaurantId }: { restaurantId: string }) {
  const { token } = useAuth();
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProduct(
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          image: form.image,
          restaurant: restaurantId,
          available: form.available,
        },
        token
      );

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            🍔 Add New Product
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new menu item for your restaurant
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Chicken Biryani"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Spicy dum biryani with raita"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="199"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Main Course"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
              className="w-full rounded-xl border border-dashed border-gray-400 px-4 py-3
              text-gray-600 file:mr-4 file:rounded-lg file:border-0
              file:bg-indigo-50 file:px-4 file:py-2
              file:text-indigo-700 file:font-semibold
              hover:file:bg-indigo-100 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
            py-3 text-lg font-bold text-white shadow-lg
            hover:from-indigo-700 hover:to-purple-700
            disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
