const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export interface ReviewUser {
  _id: string;
  name: string;
  email: string;
}

export interface ReviewProduct {
  _id: string;
  name: string;
  price: number;
}

export interface Review {
  _id: string;
  user: ReviewUser;
  product: ReviewProduct | null;
  reating: number; // backend spelling
  review: string;
  createdAt?: string;
}



export interface CreateReviewPayload {
  productId: string;
  reating: number;
  review: string;
}



async function authFetch(
  url: string,
  options: RequestInit,
  token: string | null
) {
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Review API error");
  }

  return res.json();
}


export async function getReatingsByProduct(
  productId: string
): Promise<Review[]> {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const res = await fetch(
    `${API_BASE_URL}/product/reating/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product reviews");
  }

  const data = await res.json();
  return Array.isArray(data.reviews) ? data.reviews : [];
}




export async function createReating(
  payload: CreateReviewPayload,
  token: string | null
): Promise<Review> {
  return authFetch(
    `${API_BASE_URL}/product/reating`, // ✅ FIXED
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}



export async function deleteReating(
  reviewId: string,
  token: string | null
): Promise<void> {
  if (!reviewId) {
    throw new Error("Review ID is required");
  }

  await authFetch(
    `${API_BASE_URL}/product/deleteReating/${reviewId}`, // ✅ FIXED
    {
      method: "DELETE",
    },
    token
  );
}
