// app/lib/order.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= TYPES ================= */

export interface OrderProduct {
  _id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  _id: string;
  product: OrderProduct;
  quantity: number;
  price: number;
}

export interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  address: Address;
  paymentMode: string;
  totalPrice: number;
  status: string;
  isTrackingEnabled: boolean;
  createdAt: string;
}

export interface GetOrdersResponse {
  success: boolean;
  message: string;
  orders: Order[];
}

/* ================= API ================= */

// ✅ CREATE ORDER
export const createOrder = async (
  token: string,
  payload: {
    items: { product: string; quantity: number }[];
    address: string;
    paymentMode: string;
  }
) => {
  const res = await axios.post(
    `${API_BASE_URL}/product/createOrder`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// ✅ GET USER ORDERS
export const getUserOrders = async (
  token: string
): Promise<GetOrdersResponse> => {
  const res = await axios.get(`${API_BASE_URL}/product/userOrder`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ ADMIN: GET ALL ORDERS
export const getAllOrders = async (token: string) => {
  const res = await axios.get(`${API_BASE_URL}/product/allOrder`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ UPDATE ORDER STATUS
export const updateOrderStatus = async (
  token: string,
  orderId: string,
  status: string
) => {
  const res = await axios.patch(
    `${API_BASE_URL}/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
