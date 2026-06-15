"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { defaultAppearance } from "@/lib/workspace-data";
import type { AppearanceSettings } from "@/lib/workspace-types";

type AppearanceState = AppearanceSettings & {
  resetAppearance: () => void;
  setAppearance: <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K],
  ) => void;
};

export const useAppearanceStore = create<AppearanceState>()(
  persist(
    (set) => ({
      ...defaultAppearance,
      resetAppearance: () => set(defaultAppearance),
      setAppearance: (key, value) => set({ [key]: value } as Pick<AppearanceState, typeof key>),
    }),
    {
      name: "devflow-appearance",
    },
  ),
);
