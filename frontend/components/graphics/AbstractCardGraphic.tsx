import Image from "next/image";

type AbstractCardGraphicProps = {
  accentClassName: string;
  imageSrc: string;
  title: string;
};

export function AbstractCardGraphic({
  accentClassName,
  imageSrc,
  title,
}: AbstractCardGraphicProps) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-950/95 p-4 shadow-[0_18px_40px_rgba(24,24,27,0.14)]">
      <div className="absolute inset-0">
        <Image alt={title} className="h-full w-full object-cover opacity-70" fill sizes="(min-width: 768px) 380px, 100vw" src={imageSrc} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.25),rgba(9,9,11,0.7)_65%,rgba(9,9,11,0.92))]" />
      <div className="relative h-44">
        <div className="flex items-start justify-between">
          <div>
            <div className={["h-2 w-24 rounded-full", accentClassName].join(" ")} />
            <div className="mt-3 h-2 w-16 rounded-full bg-white/20" />
          </div>
          <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
            Live
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid gap-3 sm:grid-cols-3">
          {["Focus", "Context", "Signals"].map((label, index) => (
            <div className="rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-xl" key={label}>
              <div className={`h-1.5 w-10 rounded-full ${accentClassName}`} />
              <div className="mt-4 h-2 w-14 rounded-full bg-white/25" />
              <div className="mt-2 h-2 w-full rounded-full bg-white/10" />
              <div className="mt-2 h-2 rounded-full bg-white/10" style={{ width: `${74 - index * 11}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
