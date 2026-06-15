import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { keyFeatures } from "@/lib/site-data";

export function ZigZagFeatures() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="section-shell space-y-16">
        {keyFeatures.map((row, index) => (
          <ScrollReveal delay={0.08 * index} key={row.title}>
            <div className="grid gap-8 rounded-[2rem] bg-[#ebe9e5] p-6 lg:grid-cols-[1fr,0.92fr] lg:items-center lg:p-8">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-[1.6rem] bg-zinc-950/5">
                  <Image alt={row.title} className="h-auto w-full" height={460} src={row.imageSrc} width={620} />
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="eyebrow border-zinc-300 bg-white/70 text-zinc-500">{row.kicker}</span>
                <h3 className="mt-5 text-balance text-3xl font-medium tracking-[-0.05em] text-zinc-950 sm:text-4xl">
                  {row.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">{row.description}</p>
                <div className="mt-7">
                  <Button href="/signup" showArrow variant="primary">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
