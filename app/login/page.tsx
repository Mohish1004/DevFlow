import { LoginForm } from "@/components/auth/LoginForm";
import { PublicAuthFrame } from "@/components/auth/PublicAuthFrame";

export default function LoginPage() {
  return (
    <PublicAuthFrame
      description="Use email/password sign-in today, with Firebase-backed production auth expected before deployment."
      eyebrow="LOGIN"
      title="Sign back into DevFlow."
    >
      <LoginForm />
    </PublicAuthFrame>
  );
}
