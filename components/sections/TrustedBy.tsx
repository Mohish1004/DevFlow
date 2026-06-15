import Image from "next/image";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const partners = [
  { image: "/assets/div-framer-1lv732o-4.svg", label: "Nike" },
  { image: "/assets/div-framer-1lv732o-.svg", label: "Google" },
  { image: "/assets/prada-logo-1.svg", label: "Prada" },
  { image: "/assets/div-framer-1lv732o-2.svg", label: "Sony" },
  { image: "/assets/disney-wordmark-1.svg", label: "Disney" },
  { image: "/assets/div-framer-1lv732o-3.svg", label: "Apple Music" },
  { image: "/assets/div-framer-1lv732o-5.svg", label: "AMG" },
];

export function TrustedBy() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="section-shell">
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-xl sm:px-8">
          <p className="text-center text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl">
            Trusted by leading software teams.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-7">
            {partners.map((partner) => (
              <div
                className="flex min-h-14 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] px-4 text-white/55 transition hover:text-white hover:opacity-100"
                key={partner.label}
              >
                <Image
                  alt={partner.label}
                  className="h-auto w-auto max-h-7 max-w-[120px] opacity-80 transition hover:opacity-100"
                  height={28}
                  src={partner.image}
                  width={120}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
