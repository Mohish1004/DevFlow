import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FinalCTA } from "@/components/sections/FinalCTA";

type MarketingPageFrameProps = {
  children: ReactNode;
  hero: ReactNode;
  showFinalCta?: boolean;
};

export function MarketingPageFrame({
  children,
  hero,
  showFinalCta = true,
}: MarketingPageFrameProps) {
  return (
    <div className="overflow-x-hidden bg-white text-zinc-950">
      <div className="relative overflow-hidden purple-noise text-white">
        <div className="absolute inset-0 purple-grid opacity-30" />
        <Navbar />
        <main className="relative">{hero}</main>
      </div>
      {children}
      <div className="relative overflow-hidden purple-noise text-white">
        <div className="absolute inset-0 purple-grid opacity-25" />
        {showFinalCta ? <FinalCTA /> : null}
        <Footer />
      </div>
    </div>
  );
}
