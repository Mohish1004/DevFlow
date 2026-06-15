"use client";

import { ArrowUpRight, FolderKanban, GitBranch, TimerReset } from "lucide-react";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { useUiStore } from "@/stores/ui-store";

const projects = [
  {
    name: "Authentication System",
    repo: "github.com/example/devflow-auth",
    summary: "Token handoff, backend verification, and RBAC prep.",
  },
  {
    name: "Review Zone",
    repo: "github.com/example/devflow-review-zone",
    summary: "PR link validation, reviewer states, and history visibility.",
  },
  {
    name: "Team-Code Onboarding",
    repo: "github.com/example/devflow-team-code",
    summary: "Join-link flow, approval states, and admin management.",
  },
] as const;

export function ProjectsWorkspace() {
  const { openContextPanel } = useUiStore();

  return (
    <div className="space-y-6">
      <PageHeader
        description="Projects should group tasks, reviews, GitHub links, docs, and meetings so feature work stays coherent."
        eyebrow="Projects"
        showDemoBadge
        title="Projects stay anchored to real work context"
      />
      <div className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <button
            className="workspace-card rounded-[1.75rem] p-6 text-left transition hover:-translate-y-0.5"
            key={project.name}
            onClick={() =>
              openContextPanel({
                body: project.summary,
                links: [
                  { href: "/app/tasks", label: "View related tasks" },
                  { href: "/app/review", label: "View review flow" },
                  { href: `https://${project.repo}`, label: "Open repository" },
                ],
                meta: ["Docs linked", "Meetings attached", "Activity timeline available"],
                title: project.name,
              })
            }
            type="button"
          >
            <FolderKanban className="h-5 w-5 text-white/70" />
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{project.name}</h2>
            <p className="workspace-muted mt-3 text-sm leading-7">{project.summary}</p>
            <div className="mt-5 flex items-center justify-between text-sm text-white/75">
              <span>{project.repo}</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-white/70" />
            <p className="text-xl font-semibold tracking-[-0.04em]">Linked repo context</p>
          </div>
          <p className="workspace-muted mt-3 text-sm leading-7">
            GitHub integration must be honest. Until backend sync exists, route outward clearly and
            label repository state as demo or requires backend.
          </p>
        </div>
        <EmptyState
          description="Archived projects should appear here once project history and soft-delete rules are wired into the backend."
          title="No archived projects yet"
        />
      </div>
    </div>
  );
}
