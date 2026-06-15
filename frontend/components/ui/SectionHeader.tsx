type SectionHeaderProps = {
  align?: "left" | "center";
  description?: string;
  eyebrow: string;
  title: string;
  theme?: "light" | "dark";
};

export function SectionHeader({
  align = "left",
  description,
  eyebrow,
  title,
  theme = "light",
}: SectionHeaderProps) {
  const centered = align === "center";
  const dark = theme === "dark";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span
        className={[
          "eyebrow",
          dark ? "border-white/15 bg-white/5 text-white/70" : "border-zinc-200 bg-zinc-50 text-zinc-500",
        ].join(" ")}
      >
        {eyebrow}
      </span>
      <h2
        className={[
          "mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-zinc-950",
        ].join(" ")}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={[
            "mt-4 text-base leading-7 sm:text-lg",
            dark ? "text-white/70" : "text-zinc-600",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
