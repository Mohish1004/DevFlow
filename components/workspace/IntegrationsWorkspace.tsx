"use client";

import { PlugZap } from "lucide-react";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { integrationCards } from "@/lib/workspace-data";

export function IntegrationsWorkspace() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Integration states must be honest: connected, not connected, requires backend, error, or UI preview. GitHub is prioritized because Review Zone depends on it."
        eyebrow="Integrations"
        showDemoBadge
        title="Integration surface with honest states"
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {integrationCards.map((card) => (
          <div className="workspace-card rounded-[1.75rem] p-6" key={card.label}>
            <div className="flex items-center gap-3">
              <PlugZap className="h-5 w-5 text-white/70" />
              <p className="text-2xl font-semibold tracking-[-0.04em]">{card.label}</p>
            </div>
            <p className="workspace-muted mt-3 text-sm leading-7">{card.description}</p>
            <div className="mt-5 inline-flex rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              {card.state}
            </div>
          </div>
        ))}
      </div>
      <EmptyState
        description="No integrations are truly connected in demo mode. Backend OAuth and token storage are still required."
        title="No live integrations connected"
      />
    </div>
  );
}
