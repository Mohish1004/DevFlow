"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckSquare, Columns3, List, Milestone } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import type { TaskStatus } from "@/lib/workspace-types";
import { useTaskStore } from "@/stores/task-store";
import { useUiStore } from "@/stores/ui-store";

const statuses: TaskStatus[] = [
  "Not Started",
  "Pending",
  "Started",
  "In Progress",
  "Yet To Complete",
  "Submitted",
  "Under Review",
  "Changes Required",
  "Completed",
  "Approved",
];

const taskSchema = z.object({
  assignee: z.string().min(2),
  deadline: z.string().min(4),
  description: z.string().min(10),
  githubLink: z.string().url(),
  priority: z.enum(["Low", "Medium", "High"]),
  title: z.string().min(3),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export function TasksWorkspace() {
  const [view, setView] = useState<"list" | "board" | "timeline">("list");
  const { createTask, tasks, updateTaskStatus } = useTaskStore();
  const { openContextPanel } = useUiStore();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TaskFormValues>({
    defaultValues: { priority: "Medium" },
    resolver: zodResolver(taskSchema),
  });

  const groupedTasks = useMemo(
    () => ({
      backlog: tasks.filter((task) => ["Not Started", "Pending"].includes(task.status)),
      active: tasks.filter((task) =>
        ["Started", "In Progress", "Yet To Complete", "Submitted"].includes(task.status),
      ),
      review: tasks.filter((task) =>
        ["Under Review", "Changes Required", "Completed", "Approved"].includes(task.status),
      ),
    }),
    [tasks],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        description="Task state is persisted locally in demo mode so list, board, and timeline stay in sync until the Java backend takes over."
        eyebrow="Tasks"
        showDemoBadge
        title="Tasks, checkpoints, and status flow"
      />
      <div className="grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
        <form
          className="workspace-card rounded-[1.75rem] p-6"
          onSubmit={handleSubmit((values) => {
            createTask(values);
            reset();
          })}
        >
          <p className="text-xl font-semibold tracking-[-0.04em]">Create task</p>
          <div className="mt-5 grid gap-4">
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Task title" {...register("title")} />
            {errors.title ? <span className="text-xs text-rose-300">{errors.title.message}</span> : null}
            <textarea className="min-h-28 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Task description" {...register("description")} />
            {errors.description ? <span className="text-xs text-rose-300">{errors.description.message}</span> : null}
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Assignee" {...register("assignee")} />
              <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" type="date" {...register("deadline")} />
              <select className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" {...register("priority")}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="https://github.com/..." {...register("githubLink")} />
            {errors.githubLink ? <span className="text-xs text-rose-300">{errors.githubLink.message}</span> : null}
            <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950" type="submit">
              Add task
            </button>
          </div>
        </form>
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xl font-semibold tracking-[-0.04em]">Task views</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "List", value: "list", icon: List },
                { label: "Board", value: "board", icon: Columns3 },
                { label: "Timeline", value: "timeline", icon: CalendarDays },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition",
                      view === item.value ? "bg-white text-zinc-950" : "border border-white/10 text-white/75",
                    ].join(" ")}
                    key={item.value}
                    onClick={() => setView(item.value as typeof view)}
                    type="button"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          {view === "list" ? (
            <div className="mt-5 grid gap-3">
              {tasks.map((task) => (
                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4" key={task.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{task.title}</p>
                      <p className="workspace-muted mt-2 text-sm leading-7">{task.description}</p>
                    </div>
                    <select
                      className="rounded-full border border-white/10 bg-transparent px-3 py-2 text-sm"
                      onChange={(event) => updateTaskStatus(task.id, event.target.value as TaskStatus)}
                      value={task.status}
                    >
                      {statuses.map((status) => (
                        <option className="bg-zinc-950" key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/65">
                    <span>{task.assignee}</span>
                    <span>•</span>
                    <span>{task.priority}</span>
                    <span>•</span>
                    <span>Due {task.deadline}</span>
                  </div>
                  <button
                    className="mt-4 inline-flex items-center gap-2 text-sm text-white/80"
                    onClick={() =>
                      openContextPanel({
                        body: task.description,
                        links: [{ href: task.githubLink, label: "Open GitHub link" }],
                        meta: task.checkpoints.map((checkpoint) =>
                          `${checkpoint.completed ? "Done" : "Open"} · ${checkpoint.title}`,
                        ),
                        title: task.title,
                      })
                    }
                    type="button"
                  >
                    <Milestone className="h-4 w-4" />
                    View context
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          {view === "board" ? (
            <div className="mt-5 grid gap-4 xl:grid-cols-3">
              {[
                { label: "Backlog", items: groupedTasks.backlog },
                { label: "Active", items: groupedTasks.active },
                { label: "Review", items: groupedTasks.review },
              ].map((column) => (
                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4" key={column.label}>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                    {column.label}
                  </p>
                  <div className="mt-4 grid gap-3">
                    {column.items.length ? (
                      column.items.map((task) => (
                        <div className="workspace-card rounded-[1rem] p-4" key={task.id}>
                          <p className="text-sm font-semibold">{task.title}</p>
                          <p className="workspace-muted mt-2 text-xs leading-6">{task.status}</p>
                        </div>
                      ))
                    ) : (
                      <EmptyState
                        description="No tasks in this stage yet."
                        title={`${column.label} is clear`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {view === "timeline" ? (
            <div className="mt-5 grid gap-3">
              {[...tasks]
                .sort((a, b) => a.deadline.localeCompare(b.deadline))
                .map((task) => (
                  <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4" key={task.id}>
                    <div className="flex items-center gap-3">
                      <CheckSquare className="h-4 w-4 text-white/70" />
                      <p className="text-sm font-semibold">{task.title}</p>
                    </div>
                    <p className="workspace-muted mt-2 text-xs">Due {task.deadline}</p>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
