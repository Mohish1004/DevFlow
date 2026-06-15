import { MarketingPageFrame } from "@/components/layout/MarketingPageFrame";
import { FeaturesOverview } from "@/components/sections/FeaturesOverview";
import { RouteHero } from "@/components/sections/RouteHero";
import { ZigZagFeatures } from "@/components/sections/ZigZagFeatures";

export default function FeaturesPage() {
  return (
    <MarketingPageFrame
      hero={
        <RouteHero
          description="DevFlow brings important workflow pieces into one unified workspace, connecting tasks, reviews, docs, and discussions contextually."
          eyebrow="FEATURES"
          secondaryHref="/signup"
          secondaryLabel="Get Started"
          title="The future of developer collaboration is here."
        />
      }
    >
      <FeaturesOverview />
      <ZigZagFeatures />
    </MarketingPageFrame>
  );
}
