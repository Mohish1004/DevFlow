import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";

type PublicAuthFrameProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function PublicAuthFrame({
  children,
  description,
  eyebrow,
  title,
}: PublicAuthFrameProps) {
  return (
    <div className="relative min-h-screen overflow-hidden purple-noise text-white">
      <div className="absolute inset-0 purple-grid opacity-30" />
      <Navbar />
      <div className="section-shell relative grid min-h-screen items-center gap-10 py-28 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-5xl font-medium tracking-[-0.07em] text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/76 sm:text-lg">{description}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
