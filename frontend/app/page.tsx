import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BenefitsStats } from "@/components/sections/BenefitsStats";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { FeaturesOverview } from "@/components/sections/FeaturesOverview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Solutions } from "@/components/sections/Solutions";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ZigZagFeatures } from "@/components/sections/ZigZagFeatures";

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-white text-zinc-950">
      <div className="relative overflow-hidden purple-noise text-white">
        <div className="absolute inset-0 purple-grid opacity-30" />
        <Navbar />
        <main className="relative">
          <Hero />
          <DashboardPreview />
          <TrustedBy />
        </main>
      </div>
      <FeaturesOverview />
      <ZigZagFeatures />
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#14092f_0%,#241257_55%,#14092f_100%)] text-white">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <Solutions />
        <BenefitsStats />
      </div>
      <Testimonials />
      <Pricing />
      <div className="relative overflow-hidden purple-noise text-white">
        <div className="absolute inset-0 purple-grid opacity-25" />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
