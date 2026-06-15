import Image from "next/image";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="TESTIMONIALS"
            title="What developers say."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal delay={0.08 * index} key={testimonial.name}>
              <div className="h-full rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image alt={testimonial.name} fill sizes="48px" src={testimonial.imageSrc} />
                  </div>
                  <div>
                    <p className="text-lg font-medium tracking-[-0.03em] text-zinc-950">
                      {testimonial.name}
                    </p>
                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-base leading-8 text-zinc-600">“{testimonial.quote}”</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
