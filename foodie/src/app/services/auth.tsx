"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import {
  loginApi,
  signupApi,
  LoginPayload,
  SignupPayload,
  AuthData,
} from "@/app/lib/auth";

type AuthMode = "login" | "signup";

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm extends LoginForm {
  name: string;
}

type AuthFormData = LoginForm | SignupForm;

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [form, setForm] = useState<AuthFormData>({
    email: "",
    password: "",
    ...(mode === "signup" ? { name: "" } : {}),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let data: AuthData;

      if (mode === "signup") {
        data = await signupApi(form as SignupPayload);
        console.log("Signup successful");
      } else {
        data = await loginApi(form as LoginPayload);
        console.log("Login successful");
      }

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("accountType", data.accountType);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 border p-6 rounded"
    >
      <h1 className="text-2xl font-bold text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h1>

      {mode === "signup" && (
        <Input
          label="Name"
          name="name"
          onChange={handleChange}
          required
        />
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        required
      />

      {error && (
        <p className="text-sm text-red-600 text-center">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : mode === "login"
          ? "Login"
          : "Create Account"}
      </Button>
    </form>
  );
}
