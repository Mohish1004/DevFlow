import { PublicAuthFrame } from "@/components/auth/PublicAuthFrame";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <PublicAuthFrame
      description="Create your account with email or a social login to get started."
      eyebrow="GET STARTED"
      title="Create a DevFlow workspace."
    >
      <SignUpForm />
    </PublicAuthFrame>
  );
}
