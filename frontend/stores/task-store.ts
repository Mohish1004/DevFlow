"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/services/api-client";
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
  fetchTasks: () => Promise<void>;
  tasks: TaskItem[];
  toggleCheckpoint: (taskId: string, checkpointId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  syncing: boolean;
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
    (set, get) => ({
      tasks: initialTasks,
      syncing: false,

      fetchTasks: async () => {
        try {
          const serverTasks = await api.get<TaskItem[]>("/api/tasks");
          set({ tasks: serverTasks, syncing: false });
        } catch {
          set({ syncing: false });
        }
      },

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

      createTask: (payload) => {
        const newTask: TaskItem = {
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
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));

        api.post("/api/tasks", newTask).catch(() => {});
      },

      toggleCheckpoint: (taskId, checkpointId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  checkpoints: task.checkpoints.map((cp) =>
                    cp.id === checkpointId ? { ...cp, completed: !cp.completed } : cp,
                  ),
                  updatedAt: nowIso(),
                }
              : task,
          ),
        })),

      updateTaskStatus: (taskId, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status, updatedAt: nowIso() } : task,
          ),
        }));
        api.patch(`/api/tasks/${taskId}/status?status=${status}`).catch(() => {});
      },
    }),
    {
      name: "devflow-tasks",
      onRehydrateStorage: () => (state) => {
        state?.fetchTasks();
      },
    },
  ),
);
