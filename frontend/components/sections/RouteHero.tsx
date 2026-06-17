import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type RouteHeroProps = {
  description: string;
  eyebrow: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
};

export function RouteHero({
  description,
  eyebrow,
  primaryHref = "/signup",
  primaryLabel = "Get Started",
  secondaryHref,
  secondaryLabel,
  title,
}: RouteHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pt-40">
      <div className="absolute inset-0 purple-grid opacity-30" />
      <div className="absolute right-[-8rem] top-[-6rem] h-[34rem] w-[34rem] rounded-full bg-black/40 blur-3xl" />
      <div className="section-shell relative">
        <ScrollReveal className="max-w-4xl">
          <span className="eyebrow border-white/15 bg-white/8 text-white/70">{eyebrow}</span>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-medium tracking-[-0.07em] text-white sm:text-6xl lg:text-[5.1rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} showArrow variant="primary">
              {primaryLabel}
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
