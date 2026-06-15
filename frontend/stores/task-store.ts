"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialTasks } from "@/lib/workspace-data";
import type { TaskCheckpoint, TaskItem, TaskStatus } from "@/lib/workspace-types";

type CreateTaskPayload = {
  assignee: string;
  deadline: string;
  description: string;
  githubLink: string;
  priority: TaskItem["priority"];
  title: string;
};

type TaskState = {
  addCheckpoint: (taskId: string, title: string) => void;
  archiveTask: (taskId: string) => void;
  createTask: (payload: CreateTaskPayload) => void;
  tasks: TaskItem[];
  toggleCheckpoint: (taskId: string, checkpointId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
};

function nowIso() {
  return new Date().toISOString();
}

function buildCheckpoint(title: string): TaskCheckpoint {
  return {
    completed: false,
    id: `cp-${crypto.randomUUID()}`,
    title,
  };
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      addCheckpoint: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  checkpoints: [...task.checkpoints, buildCheckpoint(title)],
                  updatedAt: nowIso(),
                }
              : task,
          ),
        })),
      archiveTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      createTask: (payload) =>
        set((state) => ({
          tasks: [
            {
              assignee: payload.assignee,
              comments: 0,
              createdAt: nowIso(),
              deadline: payload.deadline,
              description: payload.description,
              githubLink: payload.githubLink,
              id: `task-${crypto.randomUUID()}`,
              priority: payload.priority,
              status: "Not Started",
              title: payload.title,
              updatedAt: nowIso(),
              checkpoints: [],
            },
            ...state.tasks,
          ],
        })),
      tasks: initialTasks,
      toggleCheckpoint: (taskId, checkpointId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  checkpoints: task.checkpoints.map((checkpoint) =>
                    checkpoint.id === checkpointId
                      ? { ...checkpoint, completed: !checkpoint.completed }
                      : checkpoint,
                  ),
                  updatedAt: nowIso(),
                }
              : task,
          ),
        })),
      updateTaskStatus: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status, updatedAt: nowIso() } : task,
          ),
        })),
    }),
    {
      name: "devflow-tasks",
    },
  ),
);
