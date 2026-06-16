"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DemoBadge } from "@/components/workspace/DemoBadge";
import { appNavItems } from "@/lib/workspace-data";
import { authMode, getAuthSetupMessage } from "@/lib/runtime-config";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";

type ProtectedAppShellProps = {
  children: React.ReactNode;
};

export function ProtectedAppShell({ children }: ProtectedAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { openCommandPalette } = useUiStore();
  const { hydrated, loading, logout, user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!hydrated || loading) {
      return;
    }

    if (authMode === "setup-required") {
      return;
    }

    if (!user) {
      router.replace("/login");
    }
  }, [hydrated, loading, router, user]);

  if (loading || (!hydrated && !user)) {
    return (
      <div className="workspace-shell workspace-pattern flex min-h-screen items-center justify-center">
        <div className="liquid-glass rounded-[1.75rem] px-8 py-6 text-sm text-white/80">
          Loading DevFlow workspace…
        </div>
      </div>
    );
  }

  if (authMode === "setup-required") {
    return (
      <div className="workspace-shell workspace-pattern flex min-h-screen items-center justify-center p-6">
        <div className="liquid-glass max-w-2xl rounded-[2rem] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">
            Auth Setup Required
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
            Protected app routes need real auth wiring.
          </h1>
          <p className="workspace-muted mt-4 text-sm leading-7">
            {getAuthSetupMessage()}
          </p>
          <div className="mt-6">
            <Link
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950"
              href="/login"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user?.displayName ?? "Workspace User";
  const roleLabel = user?.accountType?.replaceAll("_", " ") ?? "demo session";
  const showDemoBadge = user?.mode === "demo";

  return (
    <div className="workspace-shell workspace-pattern min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-black/10 px-3 py-3 backdrop-blur-md md:px-5">
        <div className="liquid-glass mx-auto flex max-w-[1440px] items-center justify-between rounded-[1.5rem] px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              className="rounded-full border border-white/10 p-2 text-white/70 md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              <Menu className="h-4 w-4" />
            </button>
            <Link className="text-lg font-semibold tracking-[-0.05em] text-white" href="/app/dashboard">
              DevFlow
            </Link>
            {showDemoBadge ? <DemoBadge /> : null}
          </div>
          <nav className="hidden flex-wrap items-center gap-2 lg:flex">
            {appNavItems.map((item) => (
              <Link
                className={[
                  "rounded-full px-3 py-2 text-sm transition",
                  pathname === item.href
                    ? "bg-white/12 text-white"
                    : "text-white/70 hover:bg-white/8 hover:text-white",
                ].join(" ")}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/8 hover:text-white md:inline-flex"
              onClick={openCommandPalette}
              type="button"
            >
              <Search className="h-4 w-4" />
              Search
              <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                Ctrl+K
              </span>
            </button>
            <div className="relative">
              <button
                aria-label="Open user menu"
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-white"
                onClick={() => setUserMenuOpen((value) => !value)}
                type="button"
              >
                {displayName}
              </button>
              {userMenuOpen ? (
                <div className="liquid-glass absolute right-0 mt-2 w-56 rounded-[1.25rem] p-2">
                  <div className="px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/55">{roleLabel}</div>
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                    onClick={() => {
                      logout();
                      toast.success("Logged out successfully");
                      router.replace("/login");
                    }}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {menuOpen ? (
          <div className="liquid-glass mx-auto mt-3 max-w-[1440px] rounded-[1.5rem] p-3 lg:hidden">
            <div className="grid gap-2">
              {appNavItems.map((item) => (
                <Link
                  className="rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <main className="mx-auto max-w-[1440px] px-3 py-6 md:px-5 md:py-8">{children}</main>
    </div>
  );
}
