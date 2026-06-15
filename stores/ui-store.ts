"use client";

import { create } from "zustand";

type ContextPanelState = {
  body?: string;
  links?: Array<{ href: string; label: string }>;
  meta?: string[];
  title: string;
};

type UiState = {
  closeCommandPalette: () => void;
  closeContextPanel: () => void;
  commandPaletteOpen: boolean;
  contextPanel: ContextPanelState | null;
  contextPanelOpen: boolean;
  openCommandPalette: () => void;
  openContextPanel: (panel: ContextPanelState) => void;
  setCommandPaletteOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  closeContextPanel: () => set({ contextPanel: null, contextPanelOpen: false }),
  commandPaletteOpen: false,
  contextPanel: null,
  contextPanelOpen: false,
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  openContextPanel: (panel) => set({ contextPanel: panel, contextPanelOpen: true }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
