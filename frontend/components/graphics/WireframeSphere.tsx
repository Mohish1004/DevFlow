export function WireframeSphere() {
  return (
    <div aria-hidden className="relative h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.25),rgba(255,255,255,0.02)_45%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-6 animate-[spin_18s_linear_infinite] rounded-full border border-white/30">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/25" />
      </div>
      <div className="absolute inset-0 animate-[spin_26s_linear_infinite_reverse]">
        <div className="absolute inset-x-10 top-1/2 h-[34%] -translate-y-1/2 rounded-[100%] border border-white/20" />
        <div className="absolute inset-y-8 left-1/2 w-[34%] -translate-x-1/2 rounded-[100%] border border-white/20" />
        <div className="absolute inset-8 rotate-45 rounded-full border border-white/16" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.6)]" />
      <div className="absolute right-12 top-16 h-2.5 w-2.5 rounded-full bg-violet-200 shadow-[0_0_28px_rgba(221,214,254,0.85)]" />
      <div className="absolute bottom-14 left-12 h-3 w-3 rounded-full bg-fuchsia-200 shadow-[0_0_30px_rgba(245,208,254,0.9)]" />
    </div>
  );
}
