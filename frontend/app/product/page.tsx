import { MarketingPageFrame } from "@/components/layout/MarketingPageFrame";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { FeaturesOverview } from "@/components/sections/FeaturesOverview";
import { RouteHero } from "@/components/sections/RouteHero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ZigZagFeatures } from "@/components/sections/ZigZagFeatures";

export default function ProductPage() {
  return (
    <MarketingPageFrame
      hero={
        <RouteHero
          description="DevFlow is a developer collaboration and workflow platform built to help software teams plan, build, review, and ship projects from one place."
          eyebrow="PRODUCT"
          secondaryHref="/features"
          secondaryLabel="Watch Demo"
          title="Unify your dev workflow."
        />
      }
    >
      <div className="bg-white pt-6">
        <DashboardPreview />
        <TrustedBy />
        <FeaturesOverview />
        <ZigZagFeatures />
      </div>
    </MarketingPageFrame>
  );
}
