"use client";

import { BookOpen, ExternalLink } from "lucide-react";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { docsCards } from "@/lib/workspace-data";
import { useUiStore } from "@/stores/ui-store";

export function DocsWorkspace() {
  const { openContextPanel } = useUiStore();

  return (
    <div className="space-y-6">
      <PageHeader
        description="Docs should stay attached to the same work context as projects, tasks, reviews, and meetings."
        eyebrow="Docs"
        showDemoBadge
        title="Documentation that lives beside the work"
      />
      <div className="grid gap-4 xl:grid-cols-3">
        {docsCards.map((card) => (
          <button
            className="workspace-card rounded-[1.75rem] p-6 text-left"
            key={card.label}
            onClick={() =>
              openContextPanel({
                body: card.description,
                links: [{ href: "/app/tasks", label: "Related task context" }],
                meta: ["Markdown-ready", "Review-linked", "Activity aware"],
                title: card.label,
              })
            }
            type="button"
          >
            <BookOpen className="h-5 w-5 text-white/70" />
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{card.label}</h2>
            <p className="workspace-muted mt-3 text-sm leading-7">{card.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/80">
              Open context
              <ExternalLink className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>
      <EmptyState
        description="No empty doc stubs have been created yet. When the Java backend is added, drafts and published docs should separate cleanly."
        title="No draft documents waiting"
      />
    </div>
  );
}
