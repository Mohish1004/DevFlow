import { PublicAuthFrame } from "@/components/auth/PublicAuthFrame";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <PublicAuthFrame
      description="Choose whether you are creating a team, joining a team, running solo, or managing an organization."
      eyebrow="REGISTER"
      title="Create a DevFlow workspace."
    >
      <RegisterForm />
    </PublicAuthFrame>
  );
}
