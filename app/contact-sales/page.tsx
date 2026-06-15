import { MarketingPageFrame } from "@/components/layout/MarketingPageFrame";
import { RouteHero } from "@/components/sections/RouteHero";
import { SignupForm } from "@/components/sections/SignupForm";

export default function ContactSalesPage() {
  return (
    <MarketingPageFrame
      hero={
        <RouteHero
          description="Share your team size, process complexity, and rollout needs. We will shape a DevFlow plan around pricing, adoption, and integrations."
          eyebrow="CONTACT SALES"
          primaryHref="#contact-sales-form"
          primaryLabel="Contact Sales"
          title="Scale DevFlow with the right team setup."
        />
      }
      showFinalCta={false}
    >
      <section className="bg-white py-20 md:py-28" id="contact-sales-form">
        <div className="section-shell">
          <SignupForm mode="sales" />
        </div>
      </section>
    </MarketingPageFrame>
  );
}
