"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/site-data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);

    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-5">
      <div
        className={[
          "section-shell rounded-full transition duration-300",
          isScrolled
            ? "glass bg-white/18 shadow-[0_24px_50px_rgba(13,10,26,0.28)]"
            : "glass bg-white/10",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Logo light />
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                className={[
                  "text-sm font-medium transition",
                  pathname === link.href ? "text-white" : "text-white/75 hover:text-white",
                ].join(" ")}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button href="/signup" showArrow size="sm" variant="primary">
              Get Started
            </Button>
          </div>
          <button
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/16 md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="section-shell glass mt-3 overflow-hidden rounded-[2rem] bg-white/14 text-white md:hidden"
          initial={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                className={[
                  "rounded-2xl px-4 py-3 text-sm font-medium transition",
                  pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                ].join(" ")}
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="mt-2 w-full" href="/signup" showArrow variant="primary">
              Get Started
            </Button>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
