import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { solutions } from "@/lib/site-data";

function SolutionGraphic(index: number) {
  const widths = ["w-20", "w-28", "w-14"];

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
      <div className="flex gap-2">
        {widths.map((width, innerIndex) => (
          <span
            className={`h-2 rounded-full bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 ${width}`}
            key={`${index}-${width}-${innerIndex}`}
            style={{ opacity: 1 - innerIndex * 0.18 }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((box) => (
          <div className="rounded-2xl border border-white/8 bg-white/6 p-3" key={box}>
            <div className="h-1.5 w-8 rounded-full bg-white/35" />
            <div className="mt-3 h-2 rounded-full bg-white/12" />
            <div className="mt-2 h-2 rounded-full bg-white/12" style={{ width: `${74 - box * 7}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Solutions() {
  return (
    <section className="py-20 md:py-28" id="solutions">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr,1.08fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <ScrollReveal>
            <SectionHeader
              description="DevFlow caters to various team sizes and structures, enhancing collaboration and productivity for all."
              eyebrow="SOLUTIONS"
              theme="dark"
              title="Designed for agile and growing teams."
            />
          </ScrollReveal>
        </div>
        <div className="space-y-5">
          {solutions.map((solution, index) => (
            <ScrollReveal delay={0.08 * index} key={solution.title}>
              <div className="glass rounded-[2rem] p-6 text-white">
                <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.04em]">{solution.title}</h3>
                    <p className="mt-3 text-base leading-7 text-white/70">{solution.description}</p>
                  </div>
                  {SolutionGraphic(index)}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
