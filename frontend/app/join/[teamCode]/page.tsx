import { PublicAuthFrame } from "@/components/auth/PublicAuthFrame";
import { RegisterForm } from "@/components/auth/RegisterForm";

type JoinTeamPageProps = {
  params: {
    teamCode: string;
  };
};

export default function JoinTeamPage({ params }: JoinTeamPageProps) {
  return (
    <PublicAuthFrame
      description="This route prefills the team code so a member can join the right workspace without manual re-entry."
      eyebrow="JOIN TEAM"
      title={`Join team ${params.teamCode}.`}
    >
      <RegisterForm fixedTeamCode={params.teamCode} />
    </PublicAuthFrame>
  );
}
