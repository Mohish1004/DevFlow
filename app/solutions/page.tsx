import { MarketingPageFrame } from "@/components/layout/MarketingPageFrame";
import { BenefitsStats } from "@/components/sections/BenefitsStats";
import { RouteHero } from "@/components/sections/RouteHero";
import { Solutions } from "@/components/sections/Solutions";

export default function SolutionsPage() {
  return (
    <MarketingPageFrame
      hero={
        <RouteHero
          description="DevFlow caters to various team sizes and structures, enhancing collaboration and productivity for all."
          eyebrow="SOLUTIONS"
          secondaryHref="/pricing"
          secondaryLabel="View Pricing"
          title="Designed for agile and growing teams."
        />
      }
    >
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#14092f_0%,#241257_55%,#14092f_100%)] text-white">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <Solutions />
        <BenefitsStats />
      </div>
    </MarketingPageFrame>
  );
}
