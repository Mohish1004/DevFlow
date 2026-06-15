"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { authMode } from "@/lib/runtime-config";
import { useAuthStore } from "@/stores/auth-store";

export function SettingsWorkspace() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <PageHeader
        description="Settings covers auth state, appearance access, and environment honesty. Production should never hide missing configuration."
        eyebrow="Settings"
        showDemoBadge={user?.mode === "demo"}
        title="Workspace settings and environment state"
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="flex items-center gap-3">
            <Settings2 className="h-5 w-5 text-white/70" />
            <p className="text-xl font-semibold tracking-[-0.04em]">Current auth mode</p>
          </div>
          <p className="workspace-muted mt-4 text-sm leading-7">
            {authMode === "demo"
              ? "Demo auth is enabled in development only. Production must use Firebase."
              : authMode === "firebase"
                ? "Firebase configuration detected."
                : "Firebase configuration is missing for production auth."}
          </p>
          <Link
            className="mt-5 inline-flex rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white"
            href="/app/appearance"
          >
            Open appearance controls
          </Link>
        </div>
        <EmptyState
          description="No backend-only settings have been exposed here yet. Secrets, service credentials, and provider wiring must remain server-side."
          title="No server settings exposed"
        />
      </div>
    </div>
  );
}
