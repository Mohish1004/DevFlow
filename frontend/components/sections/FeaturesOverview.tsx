import Image from "next/image";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featureCards } from "@/lib/site-data";

export function FeaturesOverview() {
  return (
    <section className="bg-white py-20 md:py-28" id="features">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeader
            align="center"
            description="DevFlow brings important workflow pieces into one unified workspace, connecting tasks, reviews, docs, and discussions contextually."
            eyebrow="FEATURES"
            title="The future of developer collaboration is here."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <ScrollReveal className="h-full" delay={0.08 * index} key={feature.title}>
              <div className="flex h-full flex-col rounded-[1.8rem] border border-zinc-200 bg-zinc-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(24,24,27,0.08)]">
                <div className="overflow-hidden rounded-[1.3rem]">
                  <Image
                    alt={feature.title}
                    className="h-auto w-full"
                    height={280}
                    src={feature.imageSrc}
                    width={420}
                  />
                </div>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-zinc-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-zinc-600">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
