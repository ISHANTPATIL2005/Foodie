// Signup payload
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

// Login payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Auth API response (example)
export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}
