import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { footerSocials, navLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative z-10 pb-10 pt-6">
      <div className="section-shell rounded-[2rem] border border-white/12 bg-white/5 px-6 py-8 backdrop-blur-xl sm:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="max-w-sm">
            <Logo light />
            <a
              className="mt-4 inline-block text-sm text-white/80 hover:text-white"
              href="mailto:contact@devflow.com"
            >
              contact@devflow.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Menu</p>
            <div className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link className="text-sm text-white/75 transition hover:text-white" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Socials</p>
            <div className="mt-4 flex flex-col gap-3">
              {footerSocials.map((link) => (
                <Link
                  className="text-sm text-white/75 transition hover:text-white"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
