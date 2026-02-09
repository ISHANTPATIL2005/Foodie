import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export interface Address {
  _id: string;
  user: string;
  house: string;
  area: string;
  landmark: string;
}

export interface GetAddressResponse {
  success: boolean;
  addresses: Address[];
  message: string;
}

export interface AddressResponse {
  success: boolean;
  address: Address;
  message: string;
}



export async function addAddress(
  data: {
    house: string;
    area: string;
    landmark?: string;
  },
  token: string
): Promise<Address> {
  const res = await axios.post<AddressResponse>(
    `${API_BASE_URL}address/addAddress`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.address;
}



export async function getAddresses(
  token: string
): Promise<Address[]> {
  const res = await axios.get<GetAddressResponse>(
    `${API_BASE_URL}address/getAddress`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.addresses;
}



export async function updateAddress(
  addressId: string,
  data: {
    house?: string;
    area?: string;
    landmark?: string;
  },
  token: string
): Promise<Address> {
  const res = await axios.put<AddressResponse>(
    `${API_BASE_URL}address/updateAddress/${addressId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.address;
}
