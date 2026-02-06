"use client";

import type { Review } from "@/app/lib/reating";

interface Props {
  review: Review;
}

export default function ReatingCard({ review }: Props) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <p className="font-semibold">{review.user.name}</p>
        <span className="text-yellow-500">
          {"★".repeat(review.reating)}
          {"☆".repeat(5 - review.reating)}
        </span>
      </div>

      <p className="text-gray-700">{review.review}</p>
    </div>
  );
}
