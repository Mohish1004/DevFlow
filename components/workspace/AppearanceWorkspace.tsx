"use client";

import { RotateCcw } from "lucide-react";

import { PageHeader } from "@/components/workspace/PageHeader";
import { defaultAppearance } from "@/lib/workspace-data";
import type { FontStyle, ThemeMode } from "@/lib/workspace-types";
import { useAppearanceStore } from "@/stores/appearance-store";

const themeModes: ThemeMode[] = ["light", "minimalist", "dark", "darker"];
const fonts: FontStyle[] = ["dm-sans", "mono", "system"];

export function AppearanceWorkspace() {
  const {
    accentColor,
    borderGlow,
    cardColor,
    fontStyle,
    glassIntensity,
    graphColor,
    resetAppearance,
    setAppearance,
    textColor,
    themeMode,
  } = useAppearanceStore();

  const lowContrast = themeMode === "light" && textColor.toLowerCase() === "#f5f5f6";

  return (
    <div className="space-y-6">
      <PageHeader
        description="Appearance controls persist locally and apply to the workspace shell, cards, graph accents, and font stack."
        eyebrow="Appearance"
        showDemoBadge
        title="Tune theme, glass, and contrast"
      />
      <div className="grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm">Theme mode</span>
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none"
                onChange={(event) => setAppearance("themeMode", event.target.value as ThemeMode)}
                value={themeMode}
              >
                {themeModes.map((mode) => (
                  <option className="bg-zinc-950" key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Accent color</span>
              <input onChange={(event) => setAppearance("accentColor", event.target.value)} type="color" value={accentColor} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Card color</span>
              <input onChange={(event) => setAppearance("cardColor", event.target.value)} type="text" value={cardColor} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Text color</span>
              <input onChange={(event) => setAppearance("textColor", event.target.value)} type="color" value={textColor} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Graph color</span>
              <input onChange={(event) => setAppearance("graphColor", event.target.value)} type="color" value={graphColor} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Font style</span>
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none"
                onChange={(event) => setAppearance("fontStyle", event.target.value as FontStyle)}
                value={fontStyle}
              >
                {fonts.map((font) => (
                  <option className="bg-zinc-950" key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm">Glass intensity: {glassIntensity}px</span>
              <input
                max={36}
                min={8}
                onChange={(event) => setAppearance("glassIntensity", Number(event.target.value))}
                type="range"
                value={glassIntensity}
              />
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                checked={borderGlow}
                onChange={(event) => setAppearance("borderGlow", event.target.checked)}
                type="checkbox"
              />
              Border glow
            </label>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold"
              onClick={resetAppearance}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              Reset defaults
            </button>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="workspace-card rounded-[1.75rem] p-6">
            <p className="text-xl font-semibold tracking-[-0.04em]">Live preview</p>
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <div className="liquid-glass rounded-[1.25rem] p-4">
                <p className="text-sm">Preview card</p>
                <p className="workspace-muted mt-2 text-sm leading-7">
                  Theme, text, glow, card color, and font changes should all be visible here.
                </p>
              </div>
            </div>
          </div>
          {lowContrast ? (
            <div className="rounded-[1.5rem] border border-amber-300/30 bg-amber-300/10 p-5 text-sm text-amber-100">
              Contrast warning: the current text color may become hard to read in light mode.
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-emerald-300/25 bg-emerald-300/10 p-5 text-sm text-emerald-100">
              Contrast looks acceptable for the current combination.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
