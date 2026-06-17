"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

import { authMode, firebaseConfigured } from "@/lib/runtime-config";
import { useAuthStore } from "@/stores/auth-store";

const signUpSchema = z
  .object({
    displayName: z.string().min(2, "Display name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    teamCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { registerWithEmail } = useAuthStore();
  const [teamMode, setTeamMode] = useState<"create" | "join">("create");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const teamCode = watch("teamCode");

  const onSubmit = async (values: SignUpFormValues) => {
    if (authMode === "setup-required") {
      toast.error("Firebase setup is required for production auth.");
      return;
    }

    if (!firebaseConfigured) {
      toast.error("Firebase is not configured.");
      return;
    }

    try {
      await registerWithEmail(values.email, values.password, values.displayName);
      if (teamMode === "join" && values.teamCode) {
        toast.success("Joined team successfully");
      } else {
        toast.success("Workspace created successfully");
      }
      router.push("/app/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg.includes("auth/email-already-in-use")) {
        setError("email", { message: "An account with this email already exists." });
      } else if (msg.includes("auth/weak-password")) {
        setError("password", { message: "Password should be at least 6 characters." });
      } else {
        setError("root", { message: msg });
      }
    }
  };

  return (
    <div className="liquid-glass rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">Get Started</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
        {teamMode === "create" ? "Create a workspace." : "Join a team."}
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/70">
        {teamMode === "create"
          ? "Set up a new workspace for your team and start collaborating."
          : "Enter your team code to join an existing workspace."}
      </p>

      {firebaseConfigured ? null : (
        <p className="mt-4 text-sm leading-7 text-white/70">
          Firebase environment variables are missing. Configure them to enable sign-up.
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            teamMode === "create"
              ? "bg-white text-zinc-950"
              : "border border-white/10 text-white/70 hover:text-white"
          }`}
          onClick={() => setTeamMode("create")}
          type="button"
        >
          Create workspace
        </button>
        <button
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            teamMode === "join"
              ? "bg-white text-zinc-950"
              : "border border-white/10 text-white/70 hover:text-white"
          }`}
          onClick={() => setTeamMode("join")}
          type="button"
        >
          Join a team
        </button>
      </div>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="you@team.dev"
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
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Confirm Password</span>
          <input
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
            placeholder="••••••••"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <span className="text-xs text-rose-300">{errors.confirmPassword.message}</span>
          ) : null}
        </label>
        {teamMode === "join" ? (
          <label className="grid gap-2">
            <span className="text-sm text-white/80">Team Code</span>
            <input
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
              placeholder="DEV-AB12"
              {...register("teamCode")}
            />
            {errors.teamCode ? (
              <span className="text-xs text-rose-300">{errors.teamCode.message}</span>
            ) : null}
          </label>
        ) : null}
        {errors.root ? (
          <p className="text-xs text-rose-300">{errors.root.message}</p>
        ) : null}
        <button
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-105"
          disabled={isSubmitting}
          type="submit"
        >
          {teamMode === "create" ? "Create Account" : "Join Team"}
        </button>
      </form>
      <div className="mt-6 text-sm text-white/72">
        <Link className="hover:text-white" href="/login">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
