"use client";

import { useState } from "react";
import { createReating, Review } from "@/app/lib/reating";
import { useAuth } from "@/app/context/AuthProvider";
import { Button } from "@/app/components/ui/Button";

interface Props {
  productId: string;
  onSuccess: (review: Review) => void;
}

export default function CreateReatingForm({
  productId,
  onSuccess,
}: Props) {
  const { token } = useAuth();

  const [reating, setReating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const newReview = await createReating(
        {
          productId,
          reating,
          review,
        },
        token
      );

      onSuccess(newReview);
      setReview("");
      setReating(5);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded p-4 space-y-3"
    >
      <h2 className="font-semibold">Write a Review</h2>

      <select
        value={reating}
        onChange={(e) => setReating(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <Button
        type="submit"
        isLoading={loading}
        className="w-full"
      >
        Submit Review
      </Button>
    </form>
  );
}
