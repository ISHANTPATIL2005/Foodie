import AuthForm from "@/app/services/auth";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm mode="signup" />
    </div>
  );
}