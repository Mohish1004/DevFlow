import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { benefits } from "@/lib/site-data";

export function BenefitsStats() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
        <ScrollReveal>
          <span className="eyebrow border-white/15 bg-white/6 text-white/70">Benefits</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Efficient. Integrated. Intelligent. Welcome to DevFlow.
          </h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((stat, index) => (
            <ScrollReveal delay={0.08 * index} key={stat.title}>
              <div
                className={[
                  "rounded-[2rem] p-6",
                  index % 4 === 0
                    ? "bg-white text-zinc-950 shadow-[0_20px_50px_rgba(255,255,255,0.16)]"
                    : "glass text-white",
                ].join(" ")}
              >
                <div className="text-4xl font-semibold tracking-[-0.05em]">{stat.title}</div>
                <p
                  className={[
                    "mt-3 text-base leading-7",
                    index % 4 === 0 ? "text-zinc-600" : "text-white/72",
                  ].join(" ")}
                >
                  {stat.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
