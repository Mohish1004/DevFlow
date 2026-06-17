"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authMode, firebaseConfigured } from "@/lib/runtime-config";
import { useAuthStore } from "@/stores/auth-store";
import { auth, sendPasswordResetEmail } from "@/services/firebase";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, loginWithGithub } = useAuthStore();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (authMode === "setup-required") {
      toast.error("Firebase setup is required for production auth.");
      return;
    }

    if (authMode === "demo") {
      const { loginWithDemo } = useAuthStore.getState();
      loginWithDemo({ displayName: values.email, email: values.email });
      toast.success("Signed into DevFlow demo workspace");
      router.push("/app/dashboard");
      return;
    }

    try {
      await loginWithEmail(values.email, values.password);
      toast.success("Signed in successfully");
      router.push("/app/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg.includes("auth/user-not-found") || msg.includes("auth/invalid-credential")) {
        setError("root", { message: "Invalid email or password." });
      } else if (msg.includes("auth/email-already-in-use")) {
        setError("root", { message: "An account with this email already exists." });
      } else if (msg.includes("auth/weak-password")) {
        setError("password", { message: "Password should be at least 6 characters." });
      } else {
        setError("root", { message: msg });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google");
      router.push("/app/dashboard");
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      toast.success("Signed in with GitHub");
      router.push("/app/dashboard");
    } catch {
      toast.error("GitHub sign-in failed.");
    }
  };

  const handleForgotPassword = async () => {
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    if (!email || !z.string().email().safeParse(email).success) {
      toast.error("Enter a valid email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth!, email);
      toast.success("Password reset email sent.");
    } catch {
      toast.error("Failed to send reset email.");
    }
  };

  return (
    <div className="liquid-glass rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">Login</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
        Re-enter the workspace.
      </h2>

      {firebaseConfigured ? (
        <div className="mt-6 grid gap-3">
          <button
            className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            onClick={handleGoogleLogin}
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button
            className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            onClick={handleGithubLogin}
            type="button"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#101017] px-3 text-white/40">or sign in with email</span>
            </div>
          </div>
        </div>
      ) : null}

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="grid gap-2">
          <span className="text-sm text-white/80">Email</span>
          <input
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35"
            id="email"
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
        {errors.root ? (
          <p className="text-xs text-rose-300">{errors.root.message}</p>
        ) : null}
        <button
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-105"
          disabled={isSubmitting}
          type="submit"
        >
          {authMode === "demo" ? "Enter Demo Workspace" : "Sign In"}
        </button>
      </form>
      <div className="mt-5 flex flex-col gap-2 text-sm text-white/72">
        {firebaseConfigured ? (
          <button
            className="self-start text-white/72 hover:text-white"
            onClick={handleForgotPassword}
            type="button"
          >
            Forgot password?
          </button>
        ) : null}
        <Link className="hover:text-white" href="/signup">
          New here? Create or join a workspace
        </Link>
      </div>
    </div>
  );
}
