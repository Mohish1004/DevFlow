import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const avatars = ["/content/4.png", "/content/1.png", "/content/3.png", "/content/2.png"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-32 sm:pt-36 lg:pt-40">
      <div className="absolute inset-0 purple-grid opacity-30" />
      <div className="absolute right-[-8rem] top-[-6rem] h-[34rem] w-[34rem] rounded-full bg-black/40 blur-3xl" />
      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
          <ScrollReveal className="max-w-4xl">
            <h1 className="max-w-5xl text-balance text-5xl font-medium tracking-[-0.07em] text-white sm:text-6xl lg:text-[5.3rem]">
              Stay in flow. Build without switching tabs.
            </h1>
            <div className="mt-8 flex flex-col gap-4">
              <p className="text-base text-white/85 sm:text-lg">Trusted by 10k+ developers</p>
              <div className="flex items-center">
                {avatars.map((avatar, index) => (
                  <div
                    className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/10"
                    key={avatar}
                    style={{ marginLeft: index === 0 ? 0 : -10 }}
                  >
                    <Image alt="" fill sizes="40px" src={avatar} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="max-w-xl lg:justify-self-end" delay={0.12}>
            <p className="text-lg leading-8 text-white/78">
              DevFlow unifies project management, task tracking, and communication, eliminating
              the need for multiple tools and constant context switching.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/signup" showArrow variant="primary">
                Sign Up
              </Button>
              <Button href="/login" variant="secondary">
                Sign In
              </Button>
              <Button href="/product" variant="ghost">
                Learn More
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
