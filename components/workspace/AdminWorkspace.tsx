"use client";

import { Copy, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { useAuthStore } from "@/stores/auth-store";

export function AdminWorkspace() {
  const { user } = useAuthStore();
  const joinLink = user?.joinLink ?? "http://localhost:3000/join/DEV-DEMO";
  const teamCode = user?.teamCode ?? "DEV-DEMO";

  return (
    <div className="space-y-6">
      <PageHeader
        description="Admin needs honest team-code handling, join-link sharing, and access visibility. Until backend generation exists, this must remain visibly demo/local."
        eyebrow="Admin"
        showDemoBadge
        title="Team onboarding and access"
      />
      <div className="grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-white/70" />
            <p className="text-xl font-semibold tracking-[-0.04em]">Team code</p>
          </div>
          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <p className="workspace-muted text-xs uppercase tracking-[0.24em]">Demo-generated</p>
            <p className="mt-3 text-4xl font-semibold tracking-[0.14em]">{teamCode}</p>
            <p className="workspace-muted mt-3 text-sm leading-7">
              Backend-generated permanent team identity is still required for production.
            </p>
          </div>
          <button
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950"
            onClick={async () => {
              await navigator.clipboard.writeText(joinLink);
              toast.success("Join link copied");
            }}
            type="button"
          >
            <Copy className="h-4 w-4" />
            Copy join link
          </button>
        </div>
        <div className="grid gap-4">
          <div className="workspace-card rounded-[1.75rem] p-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-white/70" />
              <p className="text-xl font-semibold tracking-[-0.04em]">Access roles</p>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                "Organization Admin",
                "Team Leader",
                "Team Member",
                "Reviewer",
                "Viewer",
              ].map((role) => (
                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-3 text-sm" key={role}>
                  {role}
                </div>
              ))}
            </div>
          </div>
          <EmptyState
            description="Pending member approvals should surface here once backend membership rules are connected."
            title="No pending approvals yet"
          />
        </div>
      </div>
    </div>
  );
}
