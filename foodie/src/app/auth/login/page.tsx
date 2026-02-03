import AuthForm from "@/app/services/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm mode="login" />
    </div>
  );
}
