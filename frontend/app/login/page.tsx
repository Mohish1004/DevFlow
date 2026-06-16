import { LoginForm } from "@/components/auth/LoginForm";
import { PublicAuthFrame } from "@/components/auth/PublicAuthFrame";

export default function LoginPage() {
  return (
    <PublicAuthFrame
      description="Sign in with Google, GitHub, or email to access your workspace."
      eyebrow="WELCOME BACK"
      title="Sign back into DevFlow."
    >
      <LoginForm />
    </PublicAuthFrame>
  );
}
