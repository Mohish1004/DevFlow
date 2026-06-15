import { Check } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pricingPlans } from "@/lib/site-data";

export function Pricing() {
  return (
    <section className="bg-white pb-24 md:pb-28 pt-4" id="pricing">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="PRICING"
            title="Pricing for dev teams."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <ScrollReveal delay={0.08 * index} key={plan.title}>
              <div
                className={[
                  "flex h-full flex-col rounded-[2rem] border p-6 transition duration-300 hover:-translate-y-1",
                  plan.highlighted
                    ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_30px_80px_rgba(9,9,11,0.2)] lg:-translate-y-2 hover:-translate-y-3"
                    : "border-zinc-200 bg-zinc-50 text-zinc-950",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-medium tracking-[-0.04em]">{plan.title}</h3>
                </div>
                <p className={["mt-4 text-sm leading-7", plan.highlighted ? "text-white/70" : "text-zinc-600"].join(" ")}>
                  {plan.description}
                </p>
                <div className="mt-6 text-4xl font-semibold tracking-[-0.05em]">
                  {plan.price}
                  <span className="ml-1 text-lg font-medium tracking-[-0.03em]">{plan.priceSuffix}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li className="flex items-center gap-3 text-sm leading-7" key={feature}>
                      <span
                        className={[
                          "inline-flex h-7 w-7 items-center justify-center rounded-full",
                          plan.highlighted ? "bg-white/10 text-white" : "bg-zinc-950 text-white",
                        ].join(" ")}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span className={plan.highlighted ? "text-white/75" : "text-zinc-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-4">
                  <Button
                    className="w-full"
                    href={plan.cta === "Contact Sales" ? "/contact-sales" : "/signup"}
                    variant={plan.highlighted ? "inverse" : "primary"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
