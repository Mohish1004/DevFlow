"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authMode, getAuthSetupMessage } from "@/lib/runtime-config";
import type { AccountType } from "@/lib/workspace-types";
import { useAuthStore } from "@/stores/auth-store";

const accountTypeOptions: Array<{ label: string; value: AccountType }> = [
  { label: "Team Leader", value: "team_leader" },
  { label: "Team Member", value: "team_member" },
  { label: "Solo User", value: "solo_user" },
  { label: "Organization Admin", value: "organization_admin" },
];

const registerSchema = z
  .object({
    accountType: z.enum(["team_leader", "team_member", "solo_user", "organization_admin"]),
    displayName: z.string().min(2, "Display name is required"),
    email: z.string().email("Enter a valid email address"),
    organizationName: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    teamCode: z.string().optional(),
    teamName: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.accountType === "team_member" && !values.teamCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Team code is required for team members",
        path: ["teamCode"],
      });
    }

    if (values.accountType === "team_leader" && !values.teamName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Team name is required for team leaders",
        path: ["teamName"],
      });
    }

    if (values.accountType === "organization_admin" && !values.organizationName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Organization name is required for organization admins",
        path: ["organizationName"],
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  fixedTeamCode?: string;
};

export function RegisterForm({ fixedTeamCode }: RegisterFormProps) {
  const router = useRouter();
  const { registerWithDemo } = useAuthStore();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      accountType: fixedTeamCode ? "team_member" : "team_leader",
      teamCode: fixedTeamCode,
    },
    resolver: zodResolver(registerSchema),
  });

  const accountType = watch("accountType");

  const onSubmit = async (values: RegisterFormValues) => {
    if (authMode === "setup-required") {
      toast.error("Firebase setup is required for production auth.");
      return;
    }

    const user = registerWithDemo(values);
    toast.success(
      user.mode === "demo"
        ? "Created demo workspace account"
        : "Account created",
    );
    router.push("/app/dashboard");
  };

  const teamCodeLabel = useMemo(
    () => (fixedTeamCode ? "Team code from join link" : "Team code"),
    [fixedTeamCode],
  );

  return (
    <div className="liquid-glass rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">Register</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
        Set up how you work.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/70">{getAuthSetupMessage()}</p>
      <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Account type</span>
          <select
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
            disabled={Boolean(fixedTeamCode)}
            {...register("accountType")}
          >
            {accountTypeOptions.map((option) => (
              <option className="bg-zinc-950" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Display Name</span>
          <input
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
            placeholder="Mira"
            {...register("displayName")}
          />
          {errors.displayName ? (
            <span className="text-xs text-rose-300">{errors.displayName.message}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Email</span>
          <input
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
            placeholder="mira@team.dev"
            {...register("email")}
          />
          {errors.email ? <span className="text-xs text-rose-300">{errors.email.message}</span> : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Password</span>
          <input
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
            placeholder="••••••••"
            type="password"
            {...register("password")}
          />
          {errors.password ? (
            <span className="text-xs text-rose-300">{errors.password.message}</span>
          ) : null}
        </label>
        {accountType === "team_leader" ? (
          <label className="grid gap-2">
            <span className="text-sm text-white/80">Team name</span>
            <input
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
              placeholder="Platform Crew"
              {...register("teamName")}
            />
            {errors.teamName ? (
              <span className="text-xs text-rose-300">{errors.teamName.message}</span>
            ) : null}
          </label>
        ) : null}
        {accountType === "organization_admin" ? (
          <label className="grid gap-2">
            <span className="text-sm text-white/80">Organization name</span>
            <input
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
              placeholder="DevFlow Labs"
              {...register("organizationName")}
            />
            {errors.organizationName ? (
              <span className="text-xs text-rose-300">{errors.organizationName.message}</span>
            ) : null}
          </label>
        ) : null}
        {accountType === "team_member" ? (
          <label className="grid gap-2">
            <span className="text-sm text-white/80">{teamCodeLabel}</span>
            <input
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
              placeholder="DEV-AB12"
              readOnly={Boolean(fixedTeamCode)}
              {...register("teamCode")}
            />
            {errors.teamCode ? (
              <span className="text-xs text-rose-300">{errors.teamCode.message}</span>
            ) : null}
          </label>
        ) : null}
        <button
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-105"
          disabled={isSubmitting}
          type="submit"
        >
          {fixedTeamCode ? "Join Team" : "Create Workspace"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/72">
        <Link className="hover:text-white" href="/login">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
