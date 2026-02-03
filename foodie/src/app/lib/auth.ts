const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export type AccountType = "USER" | "ADMIN" | "RESTAURANT";

export interface AuthData {
  token: string;
  accountType: AccountType;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}



async function handleResponse<T>(
  res: Response
): Promise<T> {
  const result: ApiResponse<T> = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result.data;
}



export async function signupApi(
  data: SignupPayload
): Promise<AuthData> {
  const res = await fetch(
    `${API_BASE_URL}/auth/Signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  return handleResponse<AuthData>(res);
}

export async function loginApi(
  data: LoginPayload
): Promise<AuthData> {
  const res = await fetch(
    `${API_BASE_URL}/auth/Login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  return handleResponse<AuthData>(res);
}
