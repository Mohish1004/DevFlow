"use client";

import { Activity, ArrowUpRight, FileText, GitPullRequest, Users } from "lucide-react";

import { DemoBadge } from "@/components/workspace/DemoBadge";
import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { useUiStore } from "@/stores/ui-store";

const cards = [
  {
    label: "Active projects",
    meta: "3 in motion",
    title: "Projects",
    value: "03",
  },
  {
    label: "Reviews waiting",
    meta: "2 require action",
    title: "Review Queue",
    value: "02",
  },
  {
    label: "Docs touched",
    meta: "5 updated this week",
    title: "Documentation",
    value: "05",
  },
  {
    label: "Live team members",
    meta: "8 in workspace",
    title: "Presence",
    value: "08",
  },
] as const;

export function DashboardOverview() {
  const { openContextPanel } = useUiStore();

  return (
    <div className="space-y-6">
      <PageHeader
        description="One overview for project context, review flow, docs, and team momentum. This is demo-mode data until the Java backend and PostgreSQL are connected."
        eyebrow="Dashboard"
        showDemoBadge
        title="Context-first developer workspace"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <button
            className="workspace-card rounded-[1.5rem] p-5 text-left transition hover:-translate-y-0.5"
            key={card.title}
            onClick={() =>
              openContextPanel({
                body: `${card.title} ties related tasks, reviews, docs, and activity together so the workspace reduces context switching.`,
                meta: [card.label, card.meta],
                title: card.title,
              })
            }
            type="button"
          >
            <p className="workspace-muted text-xs uppercase tracking-[0.24em]">{card.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{card.value}</p>
            <p className="workspace-muted mt-3 text-sm">{card.meta}</p>
          </button>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xl font-semibold tracking-[-0.04em]">Today’s flow</p>
              <p className="workspace-muted mt-2 text-sm leading-7">
                Tasks, reviews, docs, and people are grouped by the work itself, not by scattered
                tools.
              </p>
            </div>
            <DemoBadge label="Demo Context" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              { icon: GitPullRequest, text: "2 reviews changed state in the last 4 hours" },
              { icon: FileText, text: "Release notes draft updated after auth review" },
              { icon: Users, text: "Team code DEV-DEMO shared with 4 pending members" },
              { icon: Activity, text: "Velocity is trending up without extra tool switching" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4" key={item.text}>
                  <Icon className="h-4 w-4 text-white/70" />
                  <p className="mt-3 text-sm leading-7 text-white/80">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <div className="workspace-card rounded-[1.75rem] p-6">
            <p className="text-xl font-semibold tracking-[-0.04em]">Open context panel</p>
            <p className="workspace-muted mt-3 text-sm leading-7">
              Small actions should not force full page jumps. Use the panel to inspect related work,
              links, and activity side-by-side.
            </p>
            <button
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white"
              onClick={() =>
                openContextPanel({
                  body: "Authentication System shows related tasks, reviews, GitHub links, docs, and team activity in one place.",
                  links: [
                    { href: "/app/tasks", label: "Related tasks" },
                    { href: "/app/review", label: "Related reviews" },
                    { href: "https://github.com/example/devflow/pull/184", label: "GitHub PR link" },
                  ],
                  meta: ["Activity timeline", "Docs context", "Owner: Platform Team"],
                  title: "Authentication System",
                })
              }
              type="button"
            >
              Inspect context
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <EmptyState
            description="No backend incidents are wired yet. When the Java backend is connected, health and notification states should surface here."
            title="No live backend incidents"
          />
        </div>
      </div>
    </div>
  );
}
