import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FinalCTA() {
  return (
    <section className="relative z-10 py-20 md:py-24" id="final-cta">
      <div className="section-shell">
        <ScrollReveal>
          <div className="rounded-[2.25rem] border border-white/12 bg-white/8 px-6 py-12 text-center backdrop-blur-xl sm:px-10">
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Scale with DevFlow. Start building today.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/signup" showArrow variant="primary">
                Sign Up
              </Button>
              <Button href="/product" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
