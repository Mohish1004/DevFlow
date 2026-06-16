"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/services/api-client";
import { defaultAppearance } from "@/lib/workspace-data";
import type { AppearanceSettings } from "@/lib/workspace-types";

type AppearanceState = AppearanceSettings & {
  fetchPreferences: () => Promise<void>;
  resetAppearance: () => void;
  savePreferences: () => Promise<void>;
  setAppearance: <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K],
  ) => void;
};

export const useAppearanceStore = create<AppearanceState>()(
  persist(
    (set, get) => ({
      ...defaultAppearance,

      fetchPreferences: async () => {
        try {
          const prefs = await api.get<AppearanceSettings>("/api/preferences");
          set({
            themeMode: prefs.themeMode as AppearanceSettings["themeMode"],
            fontStyle: prefs.fontStyle as AppearanceSettings["fontStyle"],
            accentColor: prefs.accentColor,
            borderGlow: prefs.borderGlow,
            cardColor: prefs.cardColor,
            glassIntensity: prefs.glassIntensity,
            graphColor: prefs.graphColor,
            textColor: prefs.textColor,
          });
        } catch {
          /* keep local defaults */
        }
      },

      savePreferences: async () => {
        const state = get();
        try {
          await api.post("/api/preferences", {
            themeMode: state.themeMode,
            fontStyle: state.fontStyle,
            accentColor: state.accentColor,
            borderGlow: state.borderGlow,
            cardColor: state.cardColor,
            glassIntensity: state.glassIntensity,
            graphColor: state.graphColor,
            textColor: state.textColor,
          });
        } catch {
          /* silently fail */
        }
      },

      resetAppearance: () => set(defaultAppearance),

      setAppearance: (key, value) => {
        set({ [key]: value } as Pick<AppearanceState, typeof key>);
      },
    }),
    {
      name: "devflow-appearance",
    },
  ),
);
