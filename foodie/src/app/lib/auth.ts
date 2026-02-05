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

export type AccountType = "restaurant" | "user" | "admin";

export interface AuthData {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    accountType: AccountType;
  };
}

interface AuthApiResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthData["user"];
}



async function handleAuthResponse(
  res: Response
): Promise<AuthData> {
  const result: AuthApiResponse = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Authentication failed");
  }

  return {
    token: result.token,
    user: result.user,
  };
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

  return handleAuthResponse(res);
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

  return handleAuthResponse(res);
}
