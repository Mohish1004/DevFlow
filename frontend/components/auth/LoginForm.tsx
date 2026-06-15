"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authMode, getAuthSetupMessage } from "@/lib/runtime-config";
import { useAuthStore } from "@/stores/auth-store";

const loginSchema = z.object({
  displayName: z.string().min(2, "Display name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { loginWithDemo } = useAuthStore();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (authMode === "setup-required") {
      toast.error("Firebase setup is required for production auth.");
      return;
    }

    if (authMode === "demo") {
      loginWithDemo({ displayName: values.displayName, email: values.email });
      toast.success("Signed into DevFlow demo workspace");
      router.push("/app/dashboard");
    }
  };

  return (
    <div className="liquid-glass rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">Login</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
        Re-enter the workspace.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/70">{getAuthSetupMessage()}</p>
      <form className="mt-8 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Display Name</span>
          <input
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
            placeholder="Ava"
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
        <button
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-105"
          disabled={isSubmitting}
          type="submit"
        >
          {authMode === "demo" ? "Enter Demo Workspace" : "Login"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/72">
        <Link className="hover:text-white" href="/register">
          Create account
        </Link>
        <Link className="hover:text-white" href="/join/DEV-DEMO">
          Join with team code
        </Link>
      </div>
    </div>
  );
}
