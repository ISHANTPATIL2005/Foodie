"use client";

import type { Review } from "@/app/lib/reating";

interface Props {
  reatings?: Review[]; 
}

export default function ReatingList({ reatings = [] }: Props) {
  if (reatings.length === 0) {
    return (
      <p className="text-gray-500 italic">
        No reviews yet. Be the first!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reatings.map((r) => (
        <div key={r._id}>
          {r.review}
        </div>
      ))}
    </div>
  );
}
