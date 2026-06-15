type MiniDashboardGraphicVariant = "velocity" | "workflow" | "insights";

const variantStyles: Record<
  MiniDashboardGraphicVariant,
  { accent: string; title: string; chip: string }
> = {
  velocity: {
    accent: "from-cyan-400 via-indigo-400 to-violet-500",
    chip: "72% focus time",
    title: "Velocity board",
  },
  workflow: {
    accent: "from-violet-400 via-fuchsia-400 to-pink-400",
    chip: "14 linked releases",
    title: "Connected flow",
  },
  insights: {
    accent: "from-amber-300 via-orange-400 to-pink-500",
    chip: "3 risk alerts",
    title: "AI insight panel",
  },
};

export function MiniDashboardGraphic({ variant }: { variant: MiniDashboardGraphicVariant }) {
  const style = variantStyles[variant];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D0D11] p-5 shadow-panel">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_38%)]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Snapshot</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{style.title}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {style.chip}
          </span>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((dot) => (
                <span className="h-2 w-2 rounded-full bg-white/20" key={dot} />
              ))}
            </div>
            <div className="mt-6 flex h-32 items-end gap-3">
              {[42, 70, 58, 84, 62, 98].map((height, index) => (
                <div className="flex-1" key={height}>
                  <div
                    className={`w-full rounded-t-2xl bg-gradient-to-t ${style.accent}`}
                    style={{ height: `${height}%`, opacity: index === 5 ? 1 : 0.76 }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["PRs", "Deploys", "Blockers"].map((label, index) => (
                <div className="rounded-2xl bg-black/25 p-3" key={label}>
                  <div className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${style.accent}`} />
                  <div className="mt-3 text-2xl font-semibold text-white">{[18, 9, 3][index]}</div>
                  <div className="text-xs text-white/45">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4" key={index}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/72">Priority cluster {index + 1}</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                    Active
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10" />
                <div className={`mt-3 h-2 rounded-full bg-gradient-to-r ${style.accent}`} style={{ width: `${88 - index * 17}%` }} />
                <div className="mt-6 flex gap-2">
                  {[0, 1, 2].map((dot) => (
                    <span className="h-7 w-7 rounded-full border border-white/10 bg-white/6" key={dot} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
