import Link from "next/link";

type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <Link className="inline-flex items-center gap-3" href="/">
      <span
        className={[
          "text-lg font-medium tracking-[-0.05em]",
          light ? "text-white" : "text-zinc-950",
        ].join(" ")}
      >
        DevFlow
      </span>
    </Link>
  );
}
