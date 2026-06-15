"use client";

import { useEffect } from "react";

import { useAppearanceStore } from "@/stores/appearance-store";

export function AppearanceController() {
  const {
    accentColor,
    borderGlow,
    cardColor,
    fontStyle,
    glassIntensity,
    graphColor,
    textColor,
    themeMode,
  } = useAppearanceStore();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.devflowTheme = themeMode;
    root.style.setProperty("--workspace-accent", accentColor);
    root.style.setProperty("--workspace-card", cardColor);
    root.style.setProperty("--workspace-ink", textColor);
    root.style.setProperty("--workspace-graph", graphColor);
    root.style.setProperty("--workspace-glass-blur", `${glassIntensity}px`);
    root.style.setProperty(
      "--workspace-glow",
      borderGlow ? `0 0 40px color-mix(in srgb, ${accentColor} 18%, transparent)` : "0 0 0 transparent",
    );
    root.style.setProperty(
      "--workspace-font",
      fontStyle === "mono"
        ? '"JetBrains Mono", "Fira Code", monospace'
        : fontStyle === "system"
          ? "system-ui, sans-serif"
          : "var(--font-dm-sans), sans-serif",
    );
  }, [accentColor, borderGlow, cardColor, fontStyle, glassIntensity, graphColor, textColor, themeMode]);

  return null;
}
