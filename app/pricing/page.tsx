import { MarketingPageFrame } from "@/components/layout/MarketingPageFrame";
import { Pricing } from "@/components/sections/Pricing";
import { RouteHero } from "@/components/sections/RouteHero";
import { Testimonials } from "@/components/sections/Testimonials";

export default function PricingPage() {
  return (
    <MarketingPageFrame
      hero={
        <RouteHero
          description="Straightforward plans for individual builders, growing software teams, and larger organizations rolling DevFlow out across functions."
          eyebrow="PRICING"
          secondaryHref="/contact-sales"
          secondaryLabel="Contact Sales"
          title="Pricing for dev teams."
        />
      }
    >
      <Pricing />
      <Testimonials />
    </MarketingPageFrame>
  );
}
