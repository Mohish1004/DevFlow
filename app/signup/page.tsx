import { MarketingPageFrame } from "@/components/layout/MarketingPageFrame";
import { RouteHero } from "@/components/sections/RouteHero";
import { SignupForm } from "@/components/sections/SignupForm";

export default function SignupPage() {
  return (
    <MarketingPageFrame
      hero={
        <RouteHero
          description="Tell us about your team and workflow. We will use that to shape the right DevFlow setup and rollout path."
          eyebrow="GET STARTED"
          primaryHref="#signup-form"
          primaryLabel="Request Access"
          title="Start building with DevFlow."
        />
      }
      showFinalCta={false}
    >
      <section className="bg-white py-20 md:py-28" id="signup-form">
        <div className="section-shell">
          <SignupForm />
        </div>
      </section>
    </MarketingPageFrame>
  );
}
