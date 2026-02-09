"use client";
import Link from "next/link";
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
import { useAuth } from "@/app/context/AuthProvider";

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
  const { login } = useAuth();

  const [form, setForm] = useState<AuthFormData>({
    email: "",
    password: "",
    ...(mode === "signup" ? { name: "" } : {}),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let data: AuthData;

      if (mode === "signup") {
        data = await signupApi(form as SignupPayload);
      } else {
        data = await loginApi(form as LoginPayload);
      }

      // ✅ STORE AUTH IN CONTEXT (single source of truth)
      login(data);

      console.log("Authenticated user:", data.user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
     <form
    onSubmit={handleSubmit}
    className="
      w-full
      max-w-sm
      bg-white
      p-8
      rounded-2xl
      shadow-lg
      space-y-5
    "
  >
    {/* Heading */}
    <h1 className="text-2xl font-bold text-center text-[#7C2D12]">
      {mode === "login" ? "Welcome Back" : "Create Account"}
    </h1>

    <p className="text-sm text-gray-500 text-center">
      {mode === "login"
        ? "Login to continue ordering your favorite food"
        : "Sign up to start ordering delicious food"}
    </p>

    {/* Name (signup only) */}
    {mode === "signup" && (
      <Input
        label="Name"
        name="name"
        value={"name" in form ? form.name : ""}
        onChange={handleChange}
        required
      />
    )}

    <Input
      label="Email"
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      required
    />

    <Input
      label="Password"
      name="password"
      type="password"
      value={form.password}
      onChange={handleChange}
      required
    />

    {/* Error */}
    {error && (
      <p className="text-sm text-red-600 text-center">
        {error}
      </p>
    )}

    {/* Submit */}
    <Button
      type="submit"
      className="w-full py-2.5 rounded-xl"
      disabled={loading}
    >
      {loading
        ? "Please wait..."
        : mode === "login"
        ? "Login"
        : "Create Account"}
    </Button>

    {/* Switch link */}
    <p className="text-sm text-center text-gray-600">
      {mode === "login" ? (
        <>
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#F59E0B] font-medium hover:underline"
          >
            Sign up
          </Link>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#F59E0B] font-medium hover:underline"
          >
            Login
          </Link>
        </>
      )}
    </p>
  </form>
  );
}
